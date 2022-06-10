function Enemy(x = 0, y = 0, radius = 50, xVel = 1, yVel = 1, lifes = 1) {
    this.color = 'rgb(' + (Math.random() * 155 + 50) + ',' + (Math.random() * 155 + 50) + ',' + (Math.random() * 155 + 50) + ')';
    this.lifes = lifes;
    this.xPos = x;
    this.yPos = y;
    this.Update = () => {
        if (radius > 0) {
            this.Move();
            this.Draw();
            this.FindCollisions();
        } else {
            Enemys.RemoveCheck();
        }
    }
    this.Move = () => {
        this.xPos += xVel;
        this.yPos += yVel;
        radius = this.lifes * Enemys.liveRadius;
    }
    this.FindCollisions = () => {
        this.FindCollisionWithPlayer();
        this.FindCollisionWithBullet();
        this.FindCollisionWithBorder();
    }
    this.FindCollisionWithBullet = () => {
        for (let index = 0; index < Bullets.bullets.length; index++) {
            if (this.xPos > (Bullets.bullets[index].xPos) - Bullets.bullets[index].radius - radius &&
                this.xPos < (Bullets.bullets[index].xPos) + Bullets.bullets[index].radius + radius &&
                this.yPos > (Bullets.bullets[index].yPos) - Bullets.bullets[index].radius - radius &&
                this.yPos < (Bullets.bullets[index].yPos) + Bullets.bullets[index].radius + radius) {
                let dist = Math.pow(this.xPos - Bullets.bullets[index].xPos, 2) + Math.pow(this.yPos - Bullets.bullets[index].yPos, 2);
                if (Math.pow(Bullets.bullets[index].radius + radius, 2) > Math.floor(dist)) {
                    this.FoundCollisionWithBullet(index);
                }
            }
        }
    }
    this.FoundCollisionWithBullet = (index) => {
        let x = (upgrades.damage > this.lifes ? this.lifes : upgrades.damage);
        for (let index = 0; index < x; index++) {
            if (index != 0) {
                setTimeout(() => {
                    Particles.AddParticles(this.xPos, this.yPos, this.color);
                }, index * 100);
            } else {
                Particles.AddParticles(this.xPos, this.yPos, this.color);
            }
        }
        this.lifes -= upgrades.damage;
        Bullets.bullets[index].lifes--;
        Bullets.RemoveCheck();
        scores.score += 15;
        if (this.lifes <= 0) {
            scores.score += 10;
            Shop.money += Math.ceil((Math.random() * 2 + 1) * lifes) * upgrades.multiplier;
            Shop.Write();
            Enemys.RemoveCheck();
        }
        radius = this.lifes * Enemys.liveRadius;
    }
    this.FindCollisionWithPlayer = () => {
        if (this.xPos > (player.xPos) - player.radius - radius &&
            this.xPos < (player.xPos) + player.radius + radius &&
            this.yPos > (player.yPos) - player.radius - radius &&
            this.yPos < (player.yPos) + player.radius + radius) {
            let dist = Math.pow(this.xPos - player.xPos, 2) + Math.pow(this.yPos - player.yPos, 2);
            if (Math.pow(player.radius + radius, 2) > Math.floor(dist)) {
                Kill();
                if (upgrades.lifes > 0) {
                    this.lifes = 0;
                    Enemys.RemoveCheck();
                }
            }
        }
    }
    this.FindCollisionWithBorder = () => {
        if (this.xPos < 0 - radius * 10 || this.xPos > canvas.width + radius * 10 ||
            this.yPos < 0 - radius * 10 || this.yPos > canvas.height + radius * 10) {
            this.lifes = 0;
            Enemys.RemoveCheck();
        }
    }
    this.Draw = () => {
        c.beginPath();
        c.arc(this.xPos, this.yPos, radius, 0.0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}