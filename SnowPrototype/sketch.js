let particles = [];
// if rain Y value = mouse Y value, remove rain
let img;


const LAYER_COUNT = 4;

const SKY_COLOR = "skyblue";
const SKY_SPACE = 0.4;
const SKY_AMP = 150;
const SKY_ZOOM = 0.0025;
const SKY_LAYER_OFFSET = 3;




const RIDGE_STEP = 4;
const RIDGE_AMP = 20;
const RIDGE_ZOOM = 0.05;

function setup() {
    createCanvas(600, 750);
    img = loadImage("hat.png");
    noCursor();
}

function draw() {
    background("skyblue");

    let umb = new Umbrella(mouseX, mouseY);

    //generate objects
    for (i = 0; i < 6; i++) {
        particles.push(new Particle(random(0, 3000), 0));
    }

    //run the object
    for (i = 0; i < particles.length; i++) {
        let p = particles[i];
        // update, check & compare, then display last
        p.move();
        // p.checkEdges();
        p.display();
        umb.display();
        if ((mouseX - 50 < particles[i].x) && (particles[i].x < mouseX + 50) && (particles[i].y > umb.y)) {
            ;
            particles.splice(i, 1);
        }
    }

    //adjust number of particles
    if (particles.length > 60) {
        //taken from where in index, and then how many taken out
        particles.splice(0, 1);
    }
    if (particles.length > 60) {
        //taken from where in index, and then how many taken out
        particles.splice(0, 1);
    }
    const skyHeight = round(2300);

    for (let i = 1; i < LAYER_COUNT; i++) {
        drawRidge(
            i,
            (i * skyHeight) / LAYER_COUNT,
            SKY_AMP,
            SKY_ZOOM,

            SKY_LAYER_OFFSET
        );
    }

}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xspd = 0
        this.position = createVector(this.x, this.y);
        this.yspd = random(3, 5);
        this.size = 5;
        this.length = 5;
        this.clr = color(255, random(150));
    }
    display() {
        fill(this.clr);
        stroke(this.clr);
        ellipse(this.x, this.y, this.size, this.length);
        ellipse(this.x, this.y, this.size * 0.5, this.length) * 0.3;
    }
    move() {
        this.x = this.x + this.xspd + random(-0.3, 0.3);
        this.y = this.y + this.yspd;
    }
    // checkEdges() {
    //   if (this.y > height) {
    //     this.y = 0;
    //   }
    // }
    removeRain() {
        fill(0);
    }
}
class Umbrella {
    constructor(x, y) {
        this.x = mouseX;
        this.y = mouseY;
        //    this.size = 80;

    }
    display() {

        image(img, this.x - 50, this.y - 20, 100, 100);

        //    rect(this.x, this.y - 10, 10, 100);
        //    fill(0);
        //    noStroke();
        //    fill(255, 20, 200);
        //    arc(this.x, this.y, 90, 30, PI, TWO_PI);
    }


}

function drawRidge(l, y, amp, zoom) {
    // Choose a color for the ridge based on its height

    fill(FILL);

    beginShape();
    // Iterate through the width of the canvas
    for (let x = 0; x <= width; x += RIDGE_STEP) {
        const noisedY = noise(x * zoom, y);
        vertex(x, y - noisedY * amp);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

}
