var Obstacle = function() {

    this.width = 12;
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
            rect(this.start.x - this.width, this.start.y - this.width, this.end.x - this.start.x + (this.width * 2), (this.width * 2));
        } else {
            // VERTICAL
            rect(this.start.x - this.width, this.start.y - this.width, (this.width * 2), this.end.y - this.start.y + (this.width * 2));
        }

    };

    this.hit = function(ball) {
        if (direction) {
            // HORIZONTAL
            if ( // HIT LEFT
                ball.pos.x + ball.radius > this.start.x - this.width &&
                ball.pos.x + ball.radius < this.start.x + (this.width / 2) &&
                ball.pos.y + ball.radius > this.start.y - this.width &&
                ball.pos.y - ball.radius < this.start.y + this.width
            ) {
                ball.pos.x -= ball.radius / 2;
                ball.vel.x = - ball.vel.x * .9;
            } else if ( // HIT RIGHT
                ball.pos.x - ball.radius > this.end.x - (this.width / 2) &&
                ball.pos.x - ball.radius < this.end.x + this.width &&
                ball.pos.y + ball.radius > this.end.y - this.width &&
                ball.pos.y - ball.radius < this.end.y + this.width
            ) {
                ball.pos.x += ball.radius / 2;
                ball.vel.x = - ball.vel.x * .9;
            } else if ( // HIT BOTTOM
                ball.pos.x + ball.radius > this.start.x - this.width &&
                ball.pos.x - ball.radius < this.end.x + this.width &&
                ball.pos.y - ball.radius > this.start.y - (this.width / 2) &&
                ball.pos.y - ball.radius < this.start.y + this.width
            ) {
                ball.pos.y += ball.radius / 2;
                ball.vel.y = - ball.vel.y * .9;
            } else if ( // HIT TOP
                ball.pos.x + ball.radius > this.start.x - this.width &&
                ball.pos.x - ball.radius < this.end.x + this.width &&
                ball.pos.y + ball.radius > this.start.y - this.width &&
                ball.pos.y + ball.radius < this.start.y + (this.width / 2)
            ) {
                ball.pos.y -= ball.radius / 2;
                ball.vel.y = - ball.vel.y * .9;
            }
        } else {
            // VERTICAL
            if ( // HIT LEFT
                ball.pos.x + ball.radius > this.start.x - this.width &&
                ball.pos.x + ball.radius < this.start.x + (this.width / 2) &&
                ball.pos.y + ball.radius > this.start.y - this.width &&
                ball.pos.y - ball.radius < this.end.y + this.width
            ) {
                ball.pos.x -= ball.radius / 2;
                ball.vel.x = - ball.vel.x * .9;
            } else if ( // HIT RIGHT
                ball.pos.x - ball.radius > this.end.x - (this.width / 2) &&
                ball.pos.x - ball.radius < this.end.x + this.width &&
                ball.pos.y + ball.radius > this.start.y - this.width &&
                ball.pos.y - ball.radius < this.end.y + this.width
            ) {
                ball.pos.x += ball.radius / 2;
                ball.vel.x = - ball.vel.x * .9;
            } else if ( // HIT BOTTOM
                ball.pos.x + ball.radius > this.end.x - this.width &&
                ball.pos.x - ball.radius < this.end.x + this.width &&
                ball.pos.y - ball.radius > this.end.y - (this.width / 2) &&
                ball.pos.y - ball.radius < this.end.y + this.width
            ) {
                ball.pos.y += ball.radius / 2;
                ball.vel.y = - ball.vel.y * .9;
            } else if ( // HIT TOP
                ball.pos.x + ball.radius > this.start.x - this.width &&
                ball.pos.x - ball.radius < this.start.x + this.width &&
                ball.pos.y + ball.radius > this.start.y - this.width &&
                ball.pos.y + ball.radius < this.start.y + (this.width / 2)
            ) {
                ball.pos.y -= ball.radius / 2;
                ball.vel.y = - ball.vel.y * .9;
            }
        }

    };

};
