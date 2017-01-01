var population;
var lifespan = 500;
var obstacleCount = 3;
var percentHTML;
var count = 0;
var target = {};
var obstacles = [];


var setup = function() {

    createCanvas(800, 600);

    for (var i = 0; i < obstacleCount; i++) {
        obstacles[i] = new Obstacle();
    }

    target = {
        x: random(width / 3, width),
        y: random(height / 3, height - 30),
        r: 40
    };

    population = new Population();
    percentHTML = createP();

};

var draw = function() {

    background(0);
    noStroke();

    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].show();
    }

    fill(255, 0, 0);
    ellipse(
        target.x,
        target.y,
        target.r,
        target.r
    );

    population.run();

    percentHTML.html(parseInt(((count / lifespan) * 100)) + '%');

    var completed = true;
    for (let i = population.balls.length - 1; i >= 0; i--) {
        if (!population.balls[i].completed) {
            completed = false;
        }
    }

    count++;
    if (count == lifespan || completed) {
        population.evaluate();
        population.selection();
        count = 0;
    }

};
