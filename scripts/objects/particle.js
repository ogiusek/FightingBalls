function Particle(xPos, yPos, xVel, yVel, color) {
    this.life = Math.ceil(Math.ceil(Math.random() * 10 + 5) * (Math.abs(xVel) + Math.abs(yVel)));
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = Math.random() * 2 + 1;
    this.color = color;
    this.Update = () => {
        this.Move();
        this.Draw();
    }
    this.Move = () => {
        this.xPos += xVel;
        this.yPos += yVel;
        xVel = xVel * 99 / 100;
        yVel = yVel * 99 / 100;
        // if (this.xPos < 0 || this.yPos < 0 || this.xPos > canvas.width || this.yPos > canvas.height ||
        //     xVel * xVel + yVel * yVel < 3) {
        //     this.life = 0;
        //     Particles.RemoveCheck();
        // }
        if (xVel * xVel + yVel * yVel < 3) {
            this.life = 0;
            Particles.RemoveCheck();
        }
    }
    this.Draw = () => {
        c.beginPath();
        c.arc(this.xPos, this.yPos, this.radius, 0.0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}