let cream = 0;

const click = document.getElementById("cream");
const count = document.getElementById("creamCount");

count.innerText = 0;
function countUpdate(){count.innerText = cream;};

click.addEventListener("click", function() {
    cream = cream + 1;
    countUpdate()
})

//units

class Unit {
    constructor(name, price, rate){
        this.name = name;
        this.count = 0;
        this.basePrice = price;
        this.price = price;
        this.rate = rate;

        this.units = document.getElementById(this.name + "Units");
        this.store = document.getElementById(this.name + "Store");
        this.cost = document.getElementById(this.name + "Cost");

        this.store.addEventListener("click", () => {
            this.buy();
        });
        this.unitUpdate()
        
    }

    unitUpdate(){
        this.units.innerText = this.count;
        this.cost.innerText = this.price;
    }

    buy(){
        if (cream >= this.price) {
            cream -= this.price;
            this.price = Math.round(this.basePrice*1.2**(this.count + 1));
            this.count += 1;
            countUpdate();
            this.unitUpdate();
        }
    }

    prod(){
        return Math.round(this.count*this.rate);
    }
}

const cursor = new Unit("cursor", 15, 1);
const grandma = new Unit("grandma", 100, 5);
const farm = new Unit("farm", 800, 25);
const mine = new Unit("mine", 6400, 120);
const factory = new Unit("factory", 51000, 600);
const laboratory = new Unit("laboratory", 408000, 3000);
const creamfall = new Unit("creamfall", 3310000, 14000);
const hydroplant = new Unit("hydroplant", 27400000, 72000);

setInterval(() => {
    cream += cursor.prod() + grandma.prod() + mine.prod() + factory.prod();
    countUpdate();
}, 1000);

class Upgrade {
    constructor(name, price, unit, rate){
        this.name = name;
        this.count = 0;
        this.unit = unit;
        this.price = price;
        this.rate = rate; 

        this.upgrade = document.getElementById(this.name + "Upgrade");
        this.cost = document.getElementById(this.name + "UpgradeCost");

        this.upgrade.addEventListener("click", () => {
            this.buy();
        });
        this.upgradeUpdate()
    }

    upgradeUpdate(){
        this.cost.innerText = this.price;
    }

    buy() {
    if (cream >= this.price) {
        cream -= this.price;
        this.unit.rate *= this.rate;
        this.price = Math.round(this.price * 5);
        countUpdate();
        this.unit.unitUpdate();
        this.upgradeUpdate();
    }
}
}

const cursorUpgrade = new Upgrade("cursor", 100, cursor, 2);
const grandmaUpgrade = new Upgrade("grandma", 500, grandma, 2);
const mineUpgrade = new Upgrade("mine", 2000, mine, 2);
const factoryUpgrade = new Upgrade("factory", 10000, factory, 2);

setInterval(() => {
    cursorUpgrade.upgradeUpdate();
    grandmaUpgrade.upgradeUpdate();
    mineUpgrade.upgradeUpdate();
    factoryUpgrade.upgradeUpdate();
}, 1000);