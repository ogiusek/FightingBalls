class Enemys {
    static enemys = [];
    static liveRadius = 25;
    static Update = () => {
        for (let index = 0; index < this.enemys.length; index++) {
            this.enemys[index].Update();
        }
    }
    static Draw = () => {
        for (let index = 0; index < this.enemys.length; index++) {
            this.enemys[index].Draw();
        }
    }
    static AddEnemy() {
        if (!animate) {
            return null;
        }
        let x = 0;
        let y = Math.random() * window.innerHeight;
        const lifes = Math.floor(Math.random() * 4) + 1;
        const radius = lifes * this.liveRadius;
        const randomForRadius = Math.random() * 3 + 1;
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                x = 0 - radius * randomForRadius;
                y = Math.random() * canvas.height;
                break;
            case 1:
                x = window.innerWidth + radius * randomForRadius;
                y = Math.random() * canvas.height;
                break;
            case 2:
                x = Math.random() * canvas.width;
                y = 0 - radius * randomForRadius;
                break;
            case 3:
                x = Math.random() * canvas.width;
                y = window.innerHeight + radius * randomForRadius;
                break;
        }
        let xVel = player.xPos - x;
        let yVel = player.yPos - y;
        while (xVel > 4 / lifes || yVel > 4 / lifes || xVel < -4 / lifes || yVel < -4 / lifes) {
            xVel = xVel / 10 * 9
            yVel = yVel / 10 * 9
        }
        while (Math.pow(xVel, 2) + Math.pow(yVel, 2) < Math.pow(4 / lifes, 2)) {
            xVel = xVel * 10 / 9;
            yVel = yVel * 10 / 9;
        }
        this.enemys.push(new Enemy(x, y, radius, xVel, yVel, lifes));
    }
    static RemoveCheck() {
        for (let index = 0; index < this.enemys.length; index++) {
            if (this.enemys[index].lifes <= 0) {
                this.RemoveEnemy(index);
            }
        }
    }
    static RemoveEnemy(index) {
        let xPos = this.enemys[index].xPos;
        let yPos = this.enemys[index].yPos;
        let color = this.enemys[index].color;
        Particles.AddParticles(xPos, yPos, color);
        if (index > 0 && index < this.enemys.length - 1) {
            let array = [];
            for (let i = 0; i < this.enemys.length; i++) {
                if (i != index) {
                    array.push(this.enemys[i]);
                }
            }
            this.enemys = array;
        } else if (index == 0) {
            this.enemys.shift();
        } else if (index == this.enemys - 1) {
            this.enemys.pop();
        }
    }
    static Reset() {
        this.enemys = [];
        for (let index = 0; index < 15; index++) {
            this.AddEnemy();
        }
    }
}