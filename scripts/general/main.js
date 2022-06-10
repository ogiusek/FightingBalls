const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth / 5 * 4;
canvas.height = window.innerHeight;

const player = new Player(innerWidth / 2 * 4 / 5, innerHeight / 2, 50);

let animate = true;

let nextEnemy = 50;
let defNextEnemy = nextEnemy;
let upgrades = Shop.upgrades;
let enemysAmount = 10;
let mousePos = {
    x: 0,
    y: 0
}
let scores = {
    score: 0,
    bestScore: 0
}
let shot = false;
let defaultMinigunDelay = 30;
let minigunDelay = defaultMinigunDelay;




Reset();
animate = false;
Animate();