
var Ball = function(dna) {

    if (dna) {
        this.vel = createVector(dna.x, dna.y);
    } else {
        this.vel = createVector(random(1, 20), random(-20, -1));
    }

    this.startVel = {
        x: this.vel.x,
        y: this.vel.y
    };

    this.pos = createVector(10, height);
    this.acc = createVector();
    this.completed;
    this.d;
    this.fitness = 0;
    this.radius = 10;

    this.applyGravity = function() {
        this.vel.y += .2;
    };

    this.calcFitness = function() {
        this.fitness = map(this.d, 0, width, width, 0);
        if (this.completed) {
            this.fitness *= (count - this.completed) / 20;
        }
    };

    this.update = function() {

        // SET DISTANCE TO TARGET
        if (!this.d || dist(this.pos.x, this.pos.y, target.x, target.y) < this.d) {
            this.d = dist(this.pos.x, this.pos.y, target.x, target.y);
        }

        // CHECK IF TARGET HIT
        if (this.d < (target.r / 2)) {
            if (!this.completed) {
                this.completed = count;
            }
            this.pos.x = target.x;
            this.pos.y = target.y;
        }

        //  CHECK IF OBSTACLE
        for (var i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].hit(this);
        }

        // CHECK IF SIDE HIT
        if (this.pos.x + this.radius > width) {
            this.vel.x = - this.vel.x * .9;
            this.pos.x = width - 1 - this.radius;
        } else if (this.pos.x - this.radius < 0) {
            this.vel.x = - this.vel.x * .9;
            this.pos.x = 1 + this.radius;
        }

        // CHECK IF TOP / BOTTOM HIT
        if (this.pos.y + this.radius > height) {
            this.vel.y = - this.vel.y * .9;
            this.pos.y = height - 1 - this.radius;
        } else if (this.pos.y - this.radius < 0) {
            this.vel.y = - this.vel.y * .9;
            this.pos.y = 1 + this.radius;
        }

        this.applyGravity();

        if (!this.completed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    };

    this.show = function() {
        push();
        noStroke();
        fill(255, 100);
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);
        ellipse(0, 0, this.radius * 2, this.radius * 2);
        pop();
    };

};
