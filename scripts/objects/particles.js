class Particles {
    static particles = [];
    static Update() {
        for (let index = 0; index < this.particles.length; index++) {
            this.particles[index].Update();

        }
    }
    static RemoveCheck() {
        for (let index = 0; index < this.particles.length; index++) {
            if (this.particles[index].life <= 0) {
                this.RemoveParticle(index);
            }
        }
    }
    static RemoveParticle(index) {
        if (index > 0 && index < this.particles.length - 1) {
            let array = [];
            for (let i = 0; i < this.particles.length; i++) {
                if (i != index) {
                    array.push(this.particles[i]);
                }
            }
            this.particles = array;
        } else if (index == 0) {
            this.particles.shift();
        } else if (index == this.particles - 1) {
            this.particles.pop();
        }
    }
    static AddParticles(xPos, yPos, color) {
        for (let index = 0; index < Math.ceil(Math.random() * 10 + 10); index++) {
            let xVel = Math.random() * 6 - 3;
            let yVel = Math.random() * 6 - 3;
            while (xVel < 0.5 && xVel > -0.5) {
                xVel = xVel * 2
            }
            while (yVel < 0.5 && yVel > -0.5) {
                yVel = yVel * 2
            }
            this.particles.push(new Particle(xPos, yPos, xVel, yVel, color));
        }
    }
}