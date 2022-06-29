let cubos = [new Cubo(0, 0, 0, 200)]

    function setup() {
      createCanvas(400, 400, WEBGL) 
      siguienteGeneración()
           
    }

    function draw() {
      background("lightgray")
      fill("dodgerblue")
      noStroke()
      translate(0, -20, 0)
      rotateX(0)
      rotateY(frameCount * 0.01)
      lights()
      directionalLight(color("blue"),0,-1,0)
      for (const cubo of cubos) {
        cubo.dibujar()
      }
    }

    function siguienteGeneración() {
      let fracciones = []
      for (const cubo of cubos) {
        let cuboFraccionado = cubo.fraccionar()
        for (const fraccion of cuboFraccionado) {
          fracciones.push(fraccion)
        }
      }
      cubos = fracciones
    }

    function Cubo(x, y, z, lado) {
      this.x = x
      this.y = y
      this.z = z
      this.lado = lado
      this.dibujar = function() {
        push()
        translate(this.x, this.y, this.z)
        box(this.lado)
        pop()
      }
      this.fraccionar = function() {
        let fracciones = []
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              if (sqrt(x * x + y * y + z * z) <= 1) {
                continue
              }
              fracciones.push(
                new Cubo(
                  this.x + x * this.lado / 3,
                  this.y + y * this.lado / 3,
                  this.z + z * this.lado / 3,
                  this.lado / 3
                )
              )
            }
          }
        }
        return fracciones
      }
    }

/*
function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(250);

  translate(-240, -100, 0);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  plane(70);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cylinder(70, 70);
  pop();

  translate(-240 * 2, 200, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cone(70, 70);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(70, 20);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(70);
  pop();
}
*/