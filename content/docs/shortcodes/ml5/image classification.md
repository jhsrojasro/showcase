## Image classification using MobileNet and p5.js  
You can use neural networks to recognize the content of images. ml5.imageClassifier() is a method to create an object that classifies an image using a pre-trained model.  

It should be noted that the pre-trained model provided by the example below was trained on a database of approximately 15 million images (ImageNet). The ml5 library accesses this model from the cloud. What the algorithm labels an image is entirely dependent on that training data -- what is included, excluded, and how those images are labeled (or mislabeled).
https://learn.ml5js.org/#/reference/image-classifier  
{{< p5-div sketch="/showcase/sketches/imageClassifier.js" lib1="https://unpkg.com/ml5@latest/dist/ml5.min.js" >}}

{{< details title="Código del sketch" open=false >}}
```javascript
// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

let label = "";
let confidence = 0.0;
let labelDiv;
let confidenceDiv;
let input;
let left = 700;
let up = 600;
let pad = 30;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  img = loadImage('/showcase/img/bird.jpg');
}

function setup() {
  canvas = createCanvas(400,400);
  canvas.parent('sketch-holder');
  
  input = createFileInput(handleFile);
  input.parent('sketch-holder');

  classifier.classify(img, gotResult);
  labelDiv = createDiv(`<h4>Label: ${label}</h4>`)
  labelDiv.parent('sketch-holder');
  
  confidenceDiv = createDiv(`<h4>Confidence: ${confidence}</h4>`)
  confidenceDiv.parent('sketch-holder');
}

function draw() {
  if (img) {
    image(img, 0, 0, width, height);
  }
  if(label){
    labelDiv.hide();
    labelDiv = createDiv(`<h4>Label: ${label}</h4>`)
    labelDiv.parent('sketch-holder');
  }
  if(confidence){
    confidenceDiv.hide();
    confidenceDiv = createDiv(`<h4>Confidence: ${confidence}</h4>`)
    confidenceDiv.parent('sketch-holder');
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    classifier.classify(img, gotResult);
    img.hide();
    labelDiv.hide();
    confidenceDiv.hide();
  } else {
    img = null;
  }
}
// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
}
```
{{< /details >}}
