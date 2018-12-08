class Population {
    constructor() {
        this.balls = [];
        this.ballPool = [];
        this.populationSize = 25;
        this.balls = new Array(this.populationSize).fill().map(_ => new Ball());
    }

    evaluate() {
        this.balls.forEach(ball => ball.calcFitness());
        const max = this.balls.reduce(
            (max, ball) => Math.max(ball.fitness, max),
            1,
        );

        this.ballPool = [];
        this.balls.forEach(ball => {
            new Array(Math.floor((ball.fitness * 100) / max))
                .fill()
                .map(_ => this.ballPool.push(ball));
        });
    }

    selection() {
        const newBalls = [];
        this.balls.forEach(ball => {
            const parentA = random(this.ballPool).startVel;
            const parentB = random(this.ballPool).startVel;
            const child = {
                x: (parentA.x + parentB.x) / 2,
                y: (parentA.y + parentB.y) / 2,
            };
            if (random(1) < 0.03) {
                child.x += random(-4, 4);
                child.y += random(-4, 4);
            }
            newBalls.push(new Ball(child));
        });
        this.balls = newBalls;
    }

    run() {
        this.balls.forEach(ball => ball.update());
        this.balls.forEach(ball => ball.render());
    }
}
