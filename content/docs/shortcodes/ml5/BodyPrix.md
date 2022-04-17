## BodyPrix with Webcam Demos  
Bodypix is an open-source machine learning model which allows for person and body-part segmentation in the browser with TensorFlow.js.  
https://learn.ml5js.org/#/reference/bodypix
{{< p5-div sketch="/showcase/sketches/bodyPrix.js" lib1="https://unpkg.com/ml5@latest/dist/ml5.min.js" >}}

{{< details title="Código del sketch" open=false >}}
```javascript
// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
BodyPix
=== */

let bodypix;
let video;
let segmentation;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
};

function preload() {
  bodypix = ml5.bodyPix(options);
}

function setup() {
  canvas = createCanvas(320, 240);
  canvas.parent('sketch-holder');
  // load up your video
  video = createCapture(VIDEO, videoReady);
  video.size(width, height);
  video.parent('sketch-holder');
  
}

function videoReady() {
  bodypix.segment(video, gotResults);
}

function draw() {
  background(0);
  if (segmentation) {
    image(segmentation.backgroundMask, 0, 0, width, height);
  }
}

function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  segmentation = result;
  bodypix.segment(video, gotResults);
}
```
{{< /details >}}