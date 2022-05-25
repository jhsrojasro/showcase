# Workshop 2: 3D Brush with Depth Estimation


## **Introducción**
### **Depth Estimation**
El problema de medir una distancia relativa a una cámara es clave en aplicaciones como vehiculos autónomos, reconstrucción de escenas 3D, creación de mapas 3D y realidad aumentada (AR). En robótica, la estimación de la profundidad es un prerequisito para realizar diferentes tareas como percepción, navegación y planeación [1].

<img width="345" alt="LIDAR" src="https://miro.medium.com/max/700/0*PuFkan_sqa1xUzmD.jpg">

El cálculo de la profundad, nos permite proyectar de vuelta imágenes capturadas desde distintos ángulos a una escena de tres dimensiones. Algunos de los problemas más arduos son los de **correspondence matching** (encontrar características correspondientes en dos vistas distintas) que puede ser dificil debido a oclusiones o cambios en las texturas de las vistas y **resolving ambiguous solution** ya que muchas escenas 3D pueden generar la misma imagen en el plano de proyección, es decir, la profundidad predecida no es única [2].

<img width="345" alt="LIDAR" src="https://miro.medium.com/max/700/1*IzEBZdx8r9eLW8G7dBd9Zg.png">

En la actualidad, para recuperar la profundidad la mejor alternativa es utilizar un dispositivo como LIDAR que permite determinar la distancia desde un emisor láser a un objeto o superficie utilizando un haz láser impulsado.

<img width="345" alt="LIDAR" src="https://www.todomecanica.com/images/blog/2021/diciembre/LIDAR-31122021.jpg">

En visión por computador, la profundidad es extraida de dos principales maneras metodológicas: Profundidad en imaganes monoculares estáticas o secuenciales y profundidad en imágenes estéreo utilizando geometría epipolar [3].

<img alt="Epipolar Geometry" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Aufnahme_mit_zwei_Kameras.svg/250px-Aufnahme_mit_zwei_Kameras.svg.png">

## **Contexto**
### **Estimación de la profundidad en visión por computador**
El objetivo de la estimación de la profundidad es obtener una representación de la estructura espacial de una escena, recuperando la forma tridimensional y es aspecto de los objetos. Se busca recuperar información perdida dada información insuficiente para especificar totalmente la solución. Es decir, el mapeo de 2D a 3D no es único.

El aprendizaje profundo tiene un desempeño sobresaliente en tareas perceptuales y cognitivas como reconocimiento, detección y comprensión de escenas. La percepción de la profundidad se encuentra dentro de estas categorías.

<img alt="Epipolar Geometry" src="[https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Aufnahme_mit_zwei_Kameras.svg/250px-Aufnahme_mit_zwei_Kameras.svg.png](https://ars.els-cdn.com/content/image/1-s2.0-S0925231220320014-gr6.jpg)">

Google tiene un modelo de reconocimiento de manos utilizando su plataforma MediaPipe [4] (una plataforma que permite hacer pipelines de datos perceptuales: video y audio) que consiste en un pipeline de dos modelos:

El primer modelo es un detector de palma llamado BlazePalm, con una arquitectura de **single shot detection**[5]:

<img alt="Epipolar Geometry" src="https://miro.medium.com/max/1400/1*51joMGlhxvftTxGtA4lA7Q.png">

La idea de entrenar un detector de palma en vez de uno de manos es debido a que es mucho más fácil estimar cuadros delimitadores en objetos rígidos como una palma en vez de manos con dedos articulados. Adicionalmente, como las palmas son objetos pequeños el algoritmos Non-Maximum Supression[6], utilizado para seleccionar el mejor cuadro delimitador funciona bien incluso en casos de oclusión.

<img alt="Hand Landmark Model" src="https://1.bp.blogspot.com/-8SxmsK5VoJ0/XVrTpMrJDFI/AAAAAAAAEiM/nAa3vuj8a2sjgEPAeMKXD4m09yKUgjVIQCLcBGAs/s640/Screenshot%2B2019-08-19%2Bat%2B9.51.25%2BAM.png">

El segundo modelo de detección que localiza 21 puntos clave de la mano usando regresión, lo cual genera la prediccipon de una coordenada directa. Para obtener datos verídicos se etiquetaron para el entrenamiento más de 30000 imágenes reales con coordenadas 3D de cada uno de los 21 puntos clave, tambien se renderizaron modelos de alta calidad en diferentes fondos y se etiquetaron las coordenadas correspondientes. Esta combinación de datos sintéticos y reales dio lugar al siguiente esquema de entrenamiento del modelo:

<img alt="Mixed Training Schema" src="https://1.bp.blogspot.com/-s_rfpl9S-sQ/XVrS_bzhcKI/AAAAAAAAEhc/_OrSe3VDLt8o1L6l2mA5HJsaqVZdaObpgCEwYBhgL/s1600/image5.png">

El proposito de este taller fue utilizar el modelo anteriormente descrito en su implementación en la librería ML5, para que el usuario de una aplicación de pintar en 3d pudiera manejar la profundidad a la que se pinta utilizando una de sus manos.

## **Resultados**

{{< details title="Código del sketch" open=false >}}
```javascript
let handpose;
let video;
let hands = [];

function setup() {
  canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
    calculateDepth();
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < hands.length; i += 1) {
    const hand = hands[i];
    for (let j = 0; j < hand.landmarks.length; j += 1) {
      const keypoint = hand.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

function calculateDepth(){
  for (let i =0; i< hands.length; i += 1 ){
    const hand = hands[i];
    let mean = 0; 
    for (let j =0; j<hand.landmarks.length; j+=1) {
      const keypoint = hand.landmarks[j];
      mean += keypoint[2];
    }
    max_depth = 60;
    min_depth = -10;
    depth = mean / hand.landmarks.length * -1;
    depth -= min_depth;
    depth /= max_depth - min_depth;
    document.cookie = "depth="+depth.toString();
  }
}
```
{{< /details >}}

{{< p5-div sketch="/showcase/sketches/handPose.js" lib1="https://unpkg.com/ml5@latest/dist/ml5.min.js" width="6250" height="475">}}

{{< p5-iframe sketch="/showcase/sketches/3dbrush.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="475" >}}

{{< details title="Código del sketch" open=false >}}
```javascript
// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with something really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channel, gesture
// speed, etc.

// Brush controls
let color;
let depth;
let brush;

let easycam;
let state;

let escorzo;
let points;
let record;

function setup() {
  createCanvas(600, 450, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  escorzo = true;
  perspective();

  // brush stuff
  points = [];
  color = createColorPicker('#ed225d');
  color.position(width - 70, 40);
  // select initial brush
  brush = sphereBrush;
}

function draw() {
  update();
  background(120);
  push();
  strokeWeight(0.8);
  stroke('magenta');
  grid({ dotted: false });
  pop();
  axes();
  for (const point of points) {
    push();
    translate(point.worldPosition);
    brush(point);
    pop();
  }
}

function update() {
  let dx = abs(mouseX - pmouseX);
  let dy = abs(mouseY - pmouseY);
  speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
  if (record) {
    let depth = parseFloat(document.cookie.slice(6,document.cookie.length))
    console.log(depth)
    points.push({
      worldPosition: treeLocation([mouseX, mouseY, depth], { from: 'SCREEN', to: 'WORLD' }),
      color: color.color(),
      speed: speed
    });
  }
}

function sphereBrush(point) {
  push();
  noStroke();
  // TODO parameterize sphere radius and / or
  // alpha channel according to gesture speed
  fill(point.color);
  sphere(1);
  pop();
}

function keyPressed() {
  if (key === 'r') {
    record = !record;
  }
  if (key === 'p') {
    escorzo = !escorzo;
    escorzo ? perspective() : ortho();
  }
  if (key == 'c') {
    points = [];
  }
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

```
{{< /details >}}

### **Conclusiones**
<ul>
  <li>Las redes neuronales son ampliamente usadas en el problema de la estimación de profundidad, dejando de lado los algoritmos tradicionales. </li>
  <li>A pesar que el modelo de detección de manos no es un modelo específicamente diseñado para estimar profundidad, es posible utilizarlo para realizar una sencilla estimación para aplicaciones sencillas que requieran la manipulación de esta por medio de las manos.. </li>
</ul>

### **Trabajo Futuro**
Como trabajo futuro es muy recomendable utilizar alguno de los modelos de estimación dee profundidad que se encuentran en la literatura, probar diferentes alternativas dentro del aprendizaje supervizado, no supervizado y semi supervizado.

### **Referencias**
[1] Depth Estimation: Basics and Intuition,Daryl Tan. 2020. Towards Data Science.
https://towardsdatascience.com/depth-estimation-1-basics-and-intuition-86f2c9538cd1  
[2] Yue Ming, Xuyang Meng, Chunxiao Fan, Hui Yu,
Deep learning for monocular depth estimation: A review,
Neurocomputing,
Volume 438,2021,Pages 14-33,ISSN 0925-2312, https://doi.org/10.1016/j.neucom.2020.12.089.
(https://www.sciencedirect.com/science/article/pii/S0925231220320014)
[3] https://en.wikipedia.org/wiki/Epipolar_geometry  
[4] On-Device, Real-Time Hand Tracking with MediaPipe
Monday, August 19, 2019
by Valentin Bazarevsky and Fan Zhang, Research Engineers, Google Research
https://ai.googleblog.com/2019/08/on-device-real-time-hand-tracking-with.html
[5] SSD: Single Shot MultiBox Detector
Wei Liu, Dragomir Anguelov, Dumitru Erhan, Christian Szegedy, Scott Reed, Cheng-Yang Fu, Alexander C. Berg
https://arxiv.org/abs/1512.02325  
[6] Non Maximum Suppression: Theory and Implementation in PyTorch. Jatin Prakash. 2021.
https://learnopencv.com/non-maximum-suppression-theory-and-implementation-in-pytorch/
[7] https://learn.ml5js.org/#/reference/handpose
