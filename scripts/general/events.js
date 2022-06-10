window.addEventListener('resize', function() {
    player.xPos = innerWidth / 2 * 4 / 5;
    player.yPos = innerHeight / 2, 50;
    canvas.width = window.innerWidth / 5 * 4;
    canvas.height = window.innerHeight;
    player.Draw();
}, false);

window.addEventListener('mousedown', ($event) => {
    if ($event.clientX <= canvas.width) {
        if (animate == false) {
            Reset();
        } else {
            Bullets.AddBullet($event.clientX, $event.clientY);
        }
        if (upgrades.gun == 2) {
            shot = true;
        } else if (upgrades.gun > 2) {
            shot = true
        }
    }
}, false);
window.addEventListener('keydown', () => {
    if (mousePos.x <= canvas.width) {
        if (animate == false) {
            Reset();
        } else {
            Bullets.AddBullet(mousePos.x, mousePos.y);
        }
        if (upgrades.gun == 2) {
            shot = true;
        } else if (upgrades.gun > 2) {
            shot = true
        }
    }
}, false);

window.addEventListener('mouseup', () => {
    if (upgrades.gun == 2) {
        shot = false;
    }
}, false);
window.addEventListener('keyup', () => {
    if (upgrades.gun == 2) {
        shot = false;
    }
}, false);
window.addEventListener('mousemove', ($event) => {
    mousePos.x = $event.clientX;
    mousePos.y = $event.clientY;
}, false);