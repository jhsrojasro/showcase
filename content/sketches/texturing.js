/**
 * Application of Scene Tree using as input a Wacom stylus p5.js
 * @param {p5} p5 reference 
 */

 const sketch = (p5) => {
    const WIDTH = 960;
    const HEIGHT = 540;

    let brightnessShader;
    let img;
    let type;
    let selector;
    let grey_scale;

    p5.preload = () => {
        brightnessShader = p5.readShader('shaders/brightness.frag', { varyings: p5.Tree.texcoords2 });
        img = p5.loadImage('images/fire_breathing.jpg');
    }

    p5.setup = () => {
        // Canvas definition
        let canvas = p5.createCanvas(WIDTH, HEIGHT, p5.WEBGL);
        canvas.parent("vue-canvas-2");
        p5.noStroke();
        p5.shader(brightnessShader);
        p5.textureMode(p5.NORMAL);
        selector = p5.createSelect();
        selector.parent("vue-canvas-2");
        selector.position(100, 120);
        selector.option("Luma");
        selector.option("HSV");
        selector.option("HSL");
        selector.selected("RG");
        selector.changed(() => {
            let item = selector.value();
            if (item === "Luma") {
                type = 0;
            } else if (item === "HSV") {
                type = 1;
            } else if (item === "HSL") {
                type = 2;
            }
            brightnessShader.setUniform('type', type);
        });
        grey_scale = p5.createCheckbox('Grey scale', false);
        grey_scale.parent("vue-canvas-2")
        grey_scale.position(100, 80);
        grey_scale.style('color', 'white');
        grey_scale.input(() => brightnessShader.setUniform('grey_scale', grey_scale.checked()));
        brightnessShader.setUniform('texture', img);
    }

    p5.draw = () => {
        p5.background(0);
        p5.quad(-WIDTH / 2, -HEIGHT / 2, WIDTH / 2, -HEIGHT / 2, WIDTH / 2, HEIGHT / 2, -WIDTH / 2, HEIGHT / 2);
    }

}

export default sketch;