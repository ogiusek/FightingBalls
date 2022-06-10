function Player(x, y, radius) {
    this.radius = radius;
    this.color = 'white';
    this.xPos = x;
    this.yPos = y;
    this.Update = () => {
        this.Draw();
    };
    this.Draw = () => {
        c.beginPath();
        c.arc(this.xPos, this.yPos, radius, 0.0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}