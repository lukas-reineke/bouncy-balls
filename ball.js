class Ball {
    constructor(dna) {
        if (dna) {
            this.vel = createVector(dna.x, dna.y);
        } else {
            this.vel = createVector(
                random(1, width / 60),
                random(height / 40, -1),
            );
        }

        this.startVel = {
            x: this.vel.x,
            y: this.vel.y,
        };

        this.pos = createVector(10, height);
        this.completedIn = null;
        this.distanceToTarget = null;
        this.fitness = 0;
        this.radius = 10;
    }

    calcFitness() {
        this.fitness = map(this.distanceToTarget, 0, width, width, 0);
        if (this.completedIn) {
            this.fitness *= (count * Speed - this.completedIn) / 20;
        }
        this.fitness = Math.max(this.fitness, 0)
    }

    update() {
        if (this.completedIn) {
            return;
        }

        // SET DISTANCE TO TARGET
        if (
            !this.distanceToTarget ||
            dist(this.pos.x, this.pos.y, target.x, target.y) <
                this.distanceToTarget
        ) {
            this.distanceToTarget = dist(
                this.pos.x,
                this.pos.y,
                target.x,
                target.y,
            );
        }

        // CHECK IF TARGET HIT
        if (this.distanceToTarget < target.r / 2) {
            this.completedIn = count * Speed;
            this.pos.x = target.x;
            this.pos.y = target.y;
            return;
        }

        //  CHECK IF OBSTACLE
        obstacles.forEach(obstacle => obstacle.hit(this));

        // CHECK IF SIDE HIT
        if (this.pos.x + this.radius > width) {
            this.vel.x = -this.vel.x * 0.9;
            this.pos.x = width - 1 - this.radius;
        } else if (this.pos.x - this.radius < 0) {
            this.vel.x = -this.vel.x * 0.9;
            this.pos.x = 1 + this.radius;
        }

        // CHECK IF TOP / BOTTOM HIT
        if (this.pos.y + this.radius > height) {
            this.vel.y = -this.vel.y * 0.9;
            this.pos.y = height - 1 - this.radius;
        } else if (this.pos.y - this.radius < 0) {
            this.vel.y = -this.vel.y * 0.9;
            this.pos.y = 1 + this.radius;
        }

        this.vel.y += Gravity;
        this.pos.add(this.vel);
    }

    render() {
        push();
        noStroke();
        fill(255, 100);
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);
        ellipse(0, 0, this.radius * 2, this.radius * 2);
        pop();
    }
}
