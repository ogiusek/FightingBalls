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

window.addEventListener('mousedown', () => {
    backgroundMusic.play();
}, false);
window.addEventListener('keydown', ($event) => {
    backgroundMusic.play();
    if ($event.code == 'Space') {
        Shot();
    }
}, false);

function Shot() {
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

function ChangeVoice(event = document.getElementById('voice')) {
    backgroundMusic.volume = event.value / 100;
    if (backgroundMusic.volume > 0) {
        document.getElementById('voiceIco').src = './materials/icons/volume.png';
    } else {
        document.getElementById('voiceIco').src = './materials/icons/mute.png';
    }
}