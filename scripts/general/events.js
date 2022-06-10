window.addEventListener('resize', function() {
    player.xPos = innerWidth / 2 * 4 / 5;
    player.yPos = innerHeight / 2;
    canvas.width = window.innerWidth / 5 * 4;
    canvas.height = window.innerHeight;
    if (window.innerWidth < window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 5 * 4;
        player.xPos = innerWidth / 2;
        player.yPos = innerHeight / 2 * 4 / 5;
    }
    player.Draw();
}, false);

window.addEventListener('mousedown', ($event) => {
    if ($event.clientX <= canvas.width &&
        $event.clientY <= canvas.height) {
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
window.addEventListener('keydown', ($event) => {
    if ($event.code == 'Space') {
        if (mousePos.x <= canvas.width &&
            mousePos.y <= canvas.height) {
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
    }
}, false);

window.addEventListener('mouseup', () => {
    if (upgrades.gun == 2) {
        shot = false;
    }
}, false);
window.addEventListener('keyup', ($event) => {
    if ($event == 'Space') {
        if (upgrades.gun == 2) {
            shot = false;
        }
    }
}, false);
window.addEventListener('mousemove', ($event) => {
    mousePos.x = $event.clientX;
    mousePos.y = $event.clientY;
}, false);