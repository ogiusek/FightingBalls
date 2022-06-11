function Bullet(xVel, yVel, radius, lifes = Bullets.bulletInfo.bulletLife) {
    this.xPos = player.xPos;
    this.color = 'white';
    this.lifes = lifes;
    this.yPos = player.yPos;
    this.radius = radius;
    this.xVel = xVel;
    this.yVel = yVel;
    this.Update = () => {
        this.Move();
        this.CheckCollision();
        this.Draw();
    }
    this.Move = () => {
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
    this.Draw = () => {
        c.beginPath();
        c.arc(this.xPos, this.yPos, this.radius, 0.0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.CheckCollision = () => {
        if (this.xPos < 0 || this.xPos > canvas.width ||
            this.yPos < 0 || this.yPos > canvas.height) {
            this.lifes = 0;
            Bullets.RemoveCheck();
        }
    }
}