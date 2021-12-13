let particles = [];
// if rain Y value = mouse Y value, remove rain
let img;

function setup() {
    createCanvas(600, 750);
    img = loadImage("umbrrr.png");
    //    noCursor();
}

function draw() {

    background("black");
    textSize(50);
    fill(0);
    stroke(225, 180, 77);
    strokeWeight(5);
    text('Happy New Year', 120, 400);




    let umb = new Umbrella(mouseX, mouseY);

    //generate objects
    for (i = 0; i < 5; i++) {
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
        if ((mouseX - 70 < particles[i].x) && (particles[i].x < mouseX + 70) && (particles[i].y > umb.y)) {
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

}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xspd = 0
        this.position = createVector(this.x, this.y);
        this.yspd = random(3, 6);
        this.size = 10;
        this.length = 10;
        this.clr = color(225, 180, 77, random(150));

    }
    display() {
        fill(this.clr);
        stroke(this.clr);
        rect(this.x, this.y, 10, 10);

        rect(this.x, this.y, 10, 10) * 0.3;
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



        //    rect(this.x, this.y - 10, 10, 100);
        //    fill(0);
        //    noStroke();
        //    fill(255, 20, 200);
        //    arc(this.x, this.y, 90, 30, PI, TWO_PI);
    }


}
