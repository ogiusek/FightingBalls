function Animate() {
    requestAnimationFrame(Animate);
    if (animate) {
        if (upgrades.gun > 1 && shot) {
            minigunDelay--;
            if (minigunDelay <= 0) {
                Bullets.AddBullet(mousePos.x, mousePos.y);
                minigunDelay = defaultMinigunDelay;
            }
        }
        nextEnemy--;
        if (nextEnemy <= 0) {
            Enemys.AddEnemy();
            nextEnemy = defNextEnemy;
            if (defNextEnemy > 10) {
                defNextEnemy -= Math.random() * 3 - 1;
            } else {
                defNextEnemy += Math.random() * 10 - 1;
            }
        }
        if (Enemys.enemys.length < scores.score / 1000 && Enemys.enemys.length < 10) {
            Enemys.AddEnemy();
        }
        Clear();

        player.Update();
        Bullets.Update();
        Enemys.Update();
        Shop.UpdateScore();
        Particles.Update();
    }
}

function Clear() {
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, canvas.height);
    c.lineTo(canvas.width, canvas.height);
    c.lineTo(canvas.width, 0);
    c.lineTo(0, 0);
    c.fillStyle = 'rgba(0, 0, 0, 0.075)';
    c.fill();
    c.stroke();
}

function Reset() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    Shop.Write();
    Shop.UpdateScore();
    nextEnemy = 50;
    scores.score = 0;
    Bullets.bullets = [];
    Particles.particles = [];
    animate = true;
    player.Update();
    Enemys.Reset();
    Enemys.Draw();
    upgrades = Object.fromEntries(Object.entries(Shop.upgrades));
    if (upgrades.gun >= 3) {
        defaultMinigunDelay = 30 / (upgrades.gun - 2);
    }
}

function Kill() {
    upgrades.lifes--;
    if (upgrades.lifes <= 0) {
        animate = false;
    }
}