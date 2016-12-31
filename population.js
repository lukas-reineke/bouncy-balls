
var Population = function() {
    this.balls = [];
    this.populationSize = 25;

    for (var i = 0; i < this.populationSize; i++) {
        this.balls[i] = new Ball();
    }

    this.evaluate = function() {
        var max = 1;
        for (let i = 0; i < this.populationSize; i++) {
            this.balls[i].calcFitness();
            if (this.balls[i].fitness > max) {
                max = this.balls[i].fitness;
            }
        }

        this.ballPool = [];
        for (let i = 0; i < this.populationSize; i++) {
            var n = this.balls[i].fitness * 100 / max;
            for (let j = 0; j < n; j++) {
                this.ballPool.push(this.balls[i]);
            }
        }
    };

    this.selection = function() {
        var newBalls = [];
        for (var i = 0; i < this.balls.length; i++) {
            var parentA = random(this.ballPool).startVel;
            var parentB = random(this.ballPool).startVel;
            var child = {
                x: (parentA.x + parentB.x) / 2,
                y: (parentA.y + parentB.y) / 2
            };
            if (random(1) < .03) {
                child.x += random(-4, 4);
                child.y += random(-4, 4);
            }
            newBalls[i] = new Ball(child);
        }
        this.balls = newBalls;
    };

    this.run = function() {
        for (var i = 0; i < this.populationSize; i++) {
            this.balls[i].update();
            this.balls[i].show();
        }
    };
};
