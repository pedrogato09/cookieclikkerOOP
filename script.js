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
const mine = new Unit("mine", 500, 20);
const factory = new Unit("factory", 3000, 20);



setInterval(() => {
    cream += cursor.prod() + grandma.prod() + mine.prod() + factory.prod();
    countUpdate();
}, 1000);

