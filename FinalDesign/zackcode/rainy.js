let particles = [];
// if rain Y value = mouse Y value, remove rain
let video;
let poseNet;
let poses = [];
let noseX, noseY;

let song;


function setup() {
    createCanvas(600, 750);
    video = createCapture(VIDEO);
    video.size(600, 750);

    song = loadSound('rain.mp3', modelReady);
    poseNet = ml5.poseNet(video,
        modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();



}


function modelReady() {
    console.log('model ready');
    song.play();

}

function draw() {
    image(video, 0, 0, 600, 750);
    background(211, 211, 211, 200);


    drawKeypoints();
    if (poses.length > 0) {
        const pose = poses[0].pose;


        const nose = pose.nose;
        let umb = new Umbrella(noseX, noseY);

        //generate objects
        for (i = 0; i < 5; i++) {
            particles.push(new Particle(random(0, 2000), 0));
        }

        //run the object
        for (i = 0; i < particles.length; i++) {
            let p = particles[i];
            // update, check & compare, then display last
            p.move();
            // p.checkEdges();
            p.display();
            umb.display();
            if ((noseX - 70 < particles[i].x) && (particles[i].x < noseX + 70) && (particles[i].y > umb.y)) {
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


}

function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < min(poses.length, 1); i++) {
        // For each pose detected, loop through all the keypoints
        for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = poses[i].pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2

            if (j == 0) {
                noseX = keypoint.position.x;
                noseY = keypoint.position.y;


            }
        }
    }
}




class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xspd = 0
        this.position = createVector(this.x, this.y);
        this.yspd = random(9, 10);
        this.size = 5;
        this.length = 10;
        this.clr = color(2, 119, 189, random(190));
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
        this.x = noseX;
        this.y = noseY - 200;

        //    this.size = 80;

    }
    display() {



        //    noStroke();
        //    fill(255, 20, 200);
        //    arc(this.x, this.y, 90, 30, PI, TWO_PI);
    }


}

function gotPoses(results) {
    poses = results;
}
