class Shop {
    static money = 0;
    static upgrades = {
        multiplier: 1,
        gun: 1,
        damage: 1,
        speed: 5,
        penetration: 1,
        lifes: 1
    };
    static items = [
        new Item(300, 'multiplier', 5),
        new Item(1000, 'gun', 10),
        new Item(500, 'damage', 10),
        new Item(100, 'speed', 3, 3),
        new Item(500, 'penetration', 5),
        new Item(500, 'lifes', 10)
    ];
    static Write() {
        let elements = document.getElementById('shop').getElementsByTagName("button");
        for (let index = 0; index < elements.length; index++) {
            const cost = elements[index].getElementsByClassName("cost")[0];
            const level = elements[index].getElementsByClassName("level")[0];
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].id == elements[index].id) {
                    if (this.items[i].level < this.items[i].maxLevel) {
                        cost.innerHTML = 'cost: ' + this.items[i].cost;
                    } else {
                        cost.innerHTML = 'cost: -';
                    }
                    if (this.items[i].maxLevel <= this.items[i].level) {
                        elements[index].classList.remove("cheap");
                        elements[index].classList.add("full");
                        elements[index].setAttribute("disabled", '');
                    } else if (this.money >= this.items[i].cost) {
                        elements[index].classList.add("cheap");
                        elements[index].removeAttribute("disabled");
                    } else {
                        elements[index].classList.remove("cheap");
                        elements[index].setAttribute("disabled", '');
                    }
                    level.innerHTML = 'level: ' + (this.items[i].level);
                    break;
                }
            }
        }
    };
    static Buy(id) {
        for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].id == id) {
                if (this.items[index].cost <= this.money) {
                    this.items[index].Buy();
                }
            }
        }
        Bullets.bulletInfo = {
            bulletSpeed: this.upgrades.speed,
            bulletLife: this.upgrades.penetration,
            bulletDamage: this.upgrades.lifes
        };
    };
    static UpdateScore() {
        scores.score += 0.05;
        if (scores.score > scores.bestScore) {
            scores.bestScore = scores.score;
        }
        document.getElementById('score').innerText = "Score:" + Math.floor(scores.score);
        document.getElementById('bestScore').innerText = "Best score:" + Math.floor(scores.bestScore);
        document.getElementById('money').innerText = "Money:" + Shop.money;
        document.getElementById('lifes').innerText = "Lifes:" + upgrades.lifes;
    }
}

function Item(cost, id, maxLevel, effect = 1) {
    this.cost = cost;
    this.level = 1;
    this.maxLevel = maxLevel;
    this.id = id;
    this.Buy = () => {
        if (this.cost <= Shop.money && this.level < this.maxLevel) {
            this.level++;
            Shop.money -= this.cost;
            if (this.cost / 3 >= cost) {
                if (this.cost / 5 >= cost) {
                    this.cost += cost * 3;
                } else {
                    this.cost += cost * 2;
                }
            } else {
                this.cost += cost;
            }
            this.Upgrade();
            Shop.Write();
            Shop.UpdateScore();
        }
    };
    this.Upgrade = () => {
        let upgrades = Object.entries(Shop.upgrades);
        for (let index = 0; index < upgrades.length; index++) {
            if (upgrades[index][0] == this.id) {
                upgrades[index][1] += effect;
                break;
            }
        }
        Shop.upgrades = Object.fromEntries(upgrades);
    };
}