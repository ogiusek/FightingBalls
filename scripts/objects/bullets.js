class Bullets {
    static bullets = [];
    static bulletsRadius = 10;
    static bulletInfo = {
        bulletSpeed: Shop.upgrades.speed,
        bulletLife: Shop.upgrades.penetration,
        bulletDamage: Shop.upgrades.lifes
    };
    static Update = () => {
        for (let index = 0; index < this.bullets.length; index++) {
            this.bullets[index].Update();
        }
    }
    static AddBullet = (mouseX, mouseY) => {
        let xVel = mouseX - player.xPos;
        let yVel = mouseY - player.yPos;
        while (Math.pow(xVel, 2) + Math.pow(yVel, 2) > Math.pow(this.bulletInfo.bulletSpeed, 2)) {
            xVel = xVel / 10 * 9;
            yVel = yVel / 10 * 9;
        }
        while (Math.pow(xVel, 2) + Math.pow(yVel, 2) < Math.pow(this.bulletInfo.bulletSpeed, 2)) {
            xVel = xVel * 10 / 9;
            yVel = yVel * 10 / 9;
        }
        this.bullets.push(new Bullet(xVel, yVel, this.bulletsRadius, this.bulletInfo.bulletLife));
        for (let index = 0; index < Math.floor(player.radius / this.bulletInfo.bulletSpeed) - this.bulletsRadius; index++) {
            this.bullets[this.bullets.length - 1].Move();
        }
    }
    static RemoveCheck() {
        for (let index = 0; index < this.bullets.length; index++) {
            if (this.bullets[index].lifes <= 0) {
                this.RemoveBullet(index);
            }
        }
    }
    static RemoveBullet(index) {
        this.bullets[index].lifes--;
        if (this.bullets[index].lifes <= 0) {
            if (index > 0 && index < this.bullets.length - 1) {
                let array = [];
                for (let i = 0; i < this.bullets.length; i++) {
                    if (i != index) {
                        array.push(this.bullets[i]);
                    }
                }
                this.bullets = array;
            } else if (index == 0) {
                this.bullets.shift();
            } else if (index == this.bullets - 1) {
                this.bullets.pop();
            }
        }
    }
}