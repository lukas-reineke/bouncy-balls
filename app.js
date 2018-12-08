const lifespan = 500;
const target = { r: 40 };

let population;
let obstacles;
let Gravity = 0.3;
let Speed = 1;
let skip = false;
let count = 0;

let gravityText;
let gravitySlider;
let speedText;
let speedSlider;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);

    const obstacleCount = Math.floor((width * height) / 200000);

    obstacles = new Array(obstacleCount).fill().map(_ => new Obstacle());

    target.x = random(width / 3, width - target.r);
    target.y = random(height / 3, height - target.r);

    population = new Population();

    const controlX = width - 160;
    const button = createButton('Skip');
    button.position(controlX, 30);
    button.mousePressed(() => (skip = true));

    gravityText = createElement('h4', 'Gravity');
    gravityText.position(controlX, 50);
    gravitySlider = createSlider(0, 100, 30);
    gravitySlider.position(controlX, 100);

    speedText = createElement('h4', 'Speed');
    speedText.position(controlX, 100);

    speedSlider = createSlider(1, 10, 1);
    speedSlider.position(controlX, 150);
}

function draw() {
    background(30);
    noStroke();

    Gravity = parseFloat(gravitySlider.value()) / 100;
    Speed = parseInt(speedSlider.value());

    obstacles.forEach(obstacle => obstacle.render());

    const iterations = lifespan / Speed;

    fill(237, 20, 61);
    ellipse(target.x, target.y, target.r, target.r);
    rect(0, 0, (count / iterations) * width, 5);

    new Array(Speed).fill().forEach(_ => population.run());
    const completed = population.balls.every(ball => ball.completedIn);

    count++;
    if (count >= iterations || completed || skip) {
        population.evaluate();
        population.selection();
        count = 0;
        skip = false;
    }
}
