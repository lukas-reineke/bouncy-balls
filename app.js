var population;
var lifespan = 500;
var percentHTML;
var count = 0;
var target = {};
var horizontalObstacle = {};
var verticalObstacle = {};


var setup = function() {

    createCanvas(800, 600);

    horizontalObstacle = {
        x: random(50, 400),
        y: random(50, 550),
        w: random(50, 700),
        h: 20
    };

    verticalObstacle = {
        x: random(50, 400),
        y: random(50, 550),
        w: 20,
        h: random(50, 700)
    };

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

    fill(255);
    rect(
        horizontalObstacle.x,
        horizontalObstacle.y,
        horizontalObstacle.w,
        horizontalObstacle.h
    );

    rect(
        verticalObstacle.x,
        verticalObstacle.y,
        verticalObstacle.w,
        verticalObstacle.h
    );

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
