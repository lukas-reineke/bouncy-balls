var Obstacle = function() {

    this.start = {
        x: random(50, 400),
        y: random(50, 550)
    };

    var direction = Math.round(random(0, 1));

    if (direction) {
        // HORIZONTAL
        this.end = {
            x: random(this.start.x + 100, this.start.x + 500),
            y: this.start.y
        };

    } else {
        // VERTICAL
        this.end = {
            x: this.start.x,
            y: random(this.start.y + 100, this.start.y + 500)
        };
    }


    this.show = function() {

        fill(255);
        if (direction) {
            // HORIZONTAL
            rect(this.start.x - 10, this.start.y - 10, this.end.x - this.start.x + 10, 20);
        } else {
            // VERTICAL
            rect(this.start.x - 10, this.start.y - 10, 20, this.end.y - this.start.y + 10);
        }

    };

    this.hit = function(ball) {
        if (direction) {
            // HORIZONTAL
            if ( // HIT LEFT
                ball.pos.x + ball.radius > this.start.x - 10 &&
                ball.pos.x + ball.radius < this.start.x + 5 &&
                ball.pos.y + ball.radius > this.start.y - 10 &&
                ball.pos.y - ball.radius < this.start.y + 10
            ) {
                ball.pos.x -= ball.radius / 2;
                ball.vel.x = - ball.vel.x * .9;
            } else if ( // HIT RIGHT
                ball.pos.x - ball.radius > this.end.x - 5 &&
                ball.pos.x - ball.radius < this.end.x + 10 &&
                ball.pos.y + ball.radius > this.end.y - 10 &&
                ball.pos.y - ball.radius < this.end.y + 10
            ) {
                ball.pos.x += ball.radius / 2;
                ball.vel.x = - ball.vel.x * .9;
            } else if ( // HIT BOTTOM
                ball.pos.x + ball.radius > this.start.x - 10 &&
                ball.pos.x - ball.radius < this.end.x + 10 &&
                ball.pos.y - ball.radius > this.start.y - 5 &&
                ball.pos.y - ball.radius < this.start.y + 10
            ) {
                ball.pos.y += ball.radius / 2;
                ball.vel.y = - ball.vel.y * .9;
            } else if ( // HIT TOP
                ball.pos.x + ball.radius > this.start.x - 10 &&
                ball.pos.x - ball.radius < this.end.x + 10 &&
                ball.pos.y + ball.radius > this.start.y - 10 &&
                ball.pos.y + ball.radius < this.start.y + 5
            ) {
                ball.pos.y -= ball.radius / 2;
                ball.vel.y = - ball.vel.y * .9;
            }
        } else {
            // VERTICAL
            if ( // HIT LEFT
                ball.pos.x + ball.radius > this.start.x - 10 &&
                ball.pos.x + ball.radius < this.start.x + 5 &&
                ball.pos.y + ball.radius > this.start.y - 10 &&
                ball.pos.y - ball.radius < this.end.y + 10
            ) {
                ball.pos.x -= ball.radius / 2;
                ball.vel.x = - ball.vel.x * .9;
            } else if ( // HIT RIGHT
                ball.pos.x - ball.radius > this.end.x - 5 &&
                ball.pos.x - ball.radius < this.end.x + 10 &&
                ball.pos.y + ball.radius > this.start.y - 10 &&
                ball.pos.y - ball.radius < this.end.y + 10
            ) {
                ball.pos.x += ball.radius / 2;
                ball.vel.x = - ball.vel.x * .9;
            } else if ( // HIT BOTTOM
                ball.pos.x + ball.radius > this.start.x - 10 &&
                ball.pos.x - ball.radius < this.end.x + 10 &&
                ball.pos.y - ball.radius > this.start.y + 10 &&
                ball.pos.y - ball.radius < this.start.y - 5
            ) {
                ball.pos.y += ball.radius / 2;
                ball.vel.y = - ball.vel.y * .9;
            } else if ( // HIT TOP
                ball.pos.x + ball.radius > this.start.x - 10 &&
                ball.pos.x - ball.radius < this.start.x + 10 &&
                ball.pos.y + ball.radius > this.start.y - 10 &&
                ball.pos.y + ball.radius < this.start.y + 5
            ) {
                ball.pos.y -= ball.radius / 2;
                ball.vel.y = - ball.vel.y * .9;
            }
        }

    };

};
