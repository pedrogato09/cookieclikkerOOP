//  ===============================================================
//      Set Variables
//  ===============================================================


let cream = 0;
let mouseClick = 1;
let earningMultiplier = 1;
let bonusCountdownInterval;

const click = document.getElementById("cream");
const flyingBonus = document.getElementById("flyingBonus");
const bonusTimer = document.getElementById("bonusTimer");
const count = document.getElementById("creamCount");
const clickCount = document.getElementById("clickCount");
const totalCreams = document.getElementById("totalCreams");
const totalCreamsSpent = document.getElementById("totalCreamsSpent");
const statsButton = document.getElementById("statsButton");
const statsContent = document.getElementById("statsContent");
const saveButton = document.getElementById("saveButton");

const stats = {
    clicks: 0,
    earned: 0,
    spent: 0
};

//  ===============================================================
//      Clicking and Updating
//  ===============================================================


click.addEventListener("click", function() {
    const earned = earningMultiplier;
    cream += earned;
    stats.clicks += 1;
    stats.earned += earned;
    shakeCream();
    statsUpdate();
});

function statsUpdate() {
    count.innerText = cream;
    clickCount.innerText = stats.clicks;
    totalCreams.innerText = stats.earned;
    totalCreamsSpent.innerText = stats.spent;
    ClickBonus.bonus = Unit.total * cursorBonus.count;
    mouseClick = DoubleClick.clicks + ClickBonus.bonus;
}


//  ===============================================================
//      Units 
//  ===============================================================

 
class Unit { 
    static total = 0; 
 
    constructor(name, price, rate) { 
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
        this.update(); 
    } 
 
    update() { 
        this.units.innerText = this.count; 
        this.cost.innerText = this.price; 
    } 
 
    buy() { 
        if (cream >= this.price) { 
            const cost = this.price; 
            cream -= cost; 
            stats.spent += cost; 
            this.price = Math.round(this.basePrice * 1.2 ** (this.count + 1)); 
            this.count += 1; 
            Unit.total += 1; 
            statsUpdate(); 
            this.update(); 
        } 
    } 
 
    prod() { 
        return Math.round(this.count * this.rate); 
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
    const prod = cursor.prod() + grandma.prod() + farm.prod() + mine.prod() + factory.prod() + laboratory.prod() + creamfall.prod() + hydroplant.prod() + ClickBonus.bonus; 
    production = Math.round(prod * prodBonus.bonus * totalClick.bonus * earningMultiplier);
    if (production > 0) { 
        cream += production; 
        stats.earned += production; 
        statsUpdate(); 
    }
}, 1000); 
 

//  ===============================================================
//      Upgrades 
//  ===============================================================

 
class Double { 
    constructor(unit, price) { 
        this.name = unit.name; 
        this.count = 0; 
        this.unit = unit; 
        this.price = price; 
        this.rate = 2; 
 
        this.upgrade = document.getElementById(this.name + "Upgrade"); 
        this.cost = document.getElementById(this.name + "UpgradeCost"); 
 
        this.upgrade.addEventListener("click", () => { 
            this.buy(); 
        }); 
        this.update(); 
    } 
 
    update() { 
        this.cost.innerText = this.price; 
    } 
 
    buy() { 
        if (cream >= this.price) { 
            const cost = this.price; 
            cream -= cost; 
            stats.spent += cost; 
            this.unit.rate *= this.rate; 
            this.price = Math.round(this.price * 5); 
            this.count += 1; 
            statsUpdate(); 
            this.update(); 
        } 
    } 
} 
 
class DoubleClick extends Double { 
    static clicks = 1; 
    constructor(unit, price) { 
        super(unit, price); 
        this.upgrade.addEventListener("click", () => { 
            DoubleClick.clicks = this.rate ** this.count; 
            statsUpdate() 
        }); 
    } 
} 
 
class ClickBonus { 
    static bonus = 0; 
    constructor(unit, price) { 
        this.name = `${unit.name}Bonus`; 
        this.unit = unit; 
        this.price = price; 
        this.count = 0; 
 
        this.upgrade = document.getElementById(this.name + "Upgrade"); 
        this.cost = document.getElementById(this.name + "UpgradeCost"); 
 
        this.upgrade.addEventListener("click", () => { 
            this.buy() 
        }); 
        this.update(); 
    } 
 
    update() { 
        this.cost.innerText = this.price; 
    } 
 
    buy() { 
        if (cream >= this.price) { 
            cream -= this.price; 
            stats.spent += this.price; 
            this.price = Math.round(this.price * 5); 
            this.count += 1; 
            statsUpdate(); 
            this.update(); 
        } 
    } 
} 

class ProductionBonus {
    constructor(name, price, factor) {
        this.name = name;
        this.price = price;
        this.factor = factor;
        this.count = 0;
        this.bonus = 1;

        this.upgrade = document.getElementById(this.name + "Upgrade"); 
        this.cost = document.getElementById(this.name + "UpgradeCost"); 
        this.upgrade.addEventListener("click", () => { 
            this.buy() 
        }); 
        this.update(); 
    } 
 
    update() { 
        this.cost.innerText = this.price; 
    }

    buy() { 
        if (cream >= this.price) { 
            cream -= this.price; 
            stats.spent += this.price; 
            this.price = Math.round(this.price * 5); 
            this.count += 1;
            if (this.clicky === true){
                this.bonus = this.count * this.factor * stats.clicks + 1.0;
            }else{
                this.bonus = this.count * this.factor + 1.0;
            }
            statsUpdate(); 
            this.update(); 
        } 
    }
}

class TotalClick extends ProductionBonus {
    constructor(name, price, factor) {
        super(name, price, factor);
        this.clicky = true;
    }
}

const totalClick = new TotalClick("totalClick", 600000000, 0.00001)

const prodBonus = new ProductionBonus("prodBonus", 8000000, 0.1);
 
const cursorBonus = new ClickBonus(cursor, 500000); 
 
const cursorDouble = new DoubleClick(cursor, 100); 
 
const grandmaDouble = new Double(grandma, 500); 
const mineDouble = new Double(mine, 2000); 
const factoryDouble = new Double(factory, 10000); 
const laboratoryDouble = new Double(laboratory, 50000); 
const creamfallDouble = new Double(creamfall, 250000); 
const hydroplantDouble = new Double(hydroplant, 1000000);

flyingBonus.addEventListener("click", () => {
    earningMultiplier = 2;
    flyingBonus.classList.add("collected");

    clearInterval(bonusCountdownInterval);
    const expiresAt = Date.now() + 60_000;

    const updateBonusTimer = () => {
        const remainingSeconds = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

        if (remainingSeconds === 0) {
            earningMultiplier = 1;
            bonusTimer.innerText = "Bonus: niet actief";
            clearInterval(bonusCountdownInterval);
            return;
        }

        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = String(remainingSeconds % 60).padStart(2, "0");
        bonusTimer.innerText = `x2 actief: ${minutes}:${seconds}`;
    };

    updateBonusTimer();
    bonusCountdownInterval = setInterval(updateBonusTimer, 1000);
});

flyingBonus.addEventListener("animationiteration", () => {
    flyingBonus.classList.remove("collected");
});


//  ===============================================================
//      Styling
//  ===============================================================


function shakeCream() {
    click.style.transform = "rotate(-8deg)";
    click.style.transition = "transform 0.05s ease";

    setTimeout(() => {
        click.style.transform = "rotate(8deg)";
    }, 60);

    setTimeout(() => {
        click.style.transform = "rotate(0deg)";
    }, 120);
}

function toggleStatsMenu() {
    const isOpen = statsContent.classList.toggle("open");
    statsButton.classList.toggle("open", isOpen);
    statsButton.setAttribute("aria-expanded", String(isOpen));
}

if (statsButton && statsContent) {
    statsButton.addEventListener("click", toggleStatsMenu);
}

if (saveButton) {
    saveButton.addEventListener("click", function() {
        saveGame();
        alert("Game opgeslagen!");
    });
}

const themeButtons = document.querySelectorAll(".menu-item.red, .menu-item.green, .menu-item.blue, .menu-item.default-theme");

themeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        document.body.classList.remove("theme-red", "theme-green", "theme-blue");

        if (button.classList.contains("red")) {
            document.body.classList.add("theme-red");
        } else if (button.classList.contains("green")) {
            document.body.classList.add("theme-green");
        } else if (button.classList.contains("blue")) {
            document.body.classList.add("theme-blue");
        }
    });
});


//  ===============================================================
//      Saving, Loading and Resetting
//  ===============================================================


const SAVE_KEY = "creamClickerSave";

function saveGame() {
    const saveData = {
        cream,
        stats,
        units: {
            cursor: { count: cursor.count, price: cursor.price, rate: cursor.rate },
            grandma: { count: grandma.count, price: grandma.price, rate: grandma.rate },
            farm: { count: farm.count, price: farm.price, rate: farm.rate },
            mine: { count: mine.count, price: mine.price, rate: mine.rate },
            factory: { count: factory.count, price: factory.price, rate: factory.rate },
            laboratory: { count: laboratory.count, price: laboratory.price, rate: laboratory.rate },
            creamfall: { count: creamfall.count, price: creamfall.price, rate: creamfall.rate },
            hydroplant: { count: hydroplant.count, price: hydroplant.price, rate: hydroplant.rate }
        },
        upgrades: {
            cursor: { price: cursorUpgrade.price, rate: cursorUpgrade.rate },
            grandma: { price: grandmaUpgrade.price, rate: grandmaUpgrade.rate },
            mine: { price: mineUpgrade.price, rate: mineUpgrade.rate },
            factory: { price: factoryUpgrade.price, rate: factoryUpgrade.rate },
            laboratory: { price: laboratoryUpgrade.price, rate: laboratoryUpgrade.rate },
            creamfall: { price: creamfallUpgrade.price, rate: creamfallUpgrade.rate },
            hydroplant: { price: hydroplantUpgrade.price, rate: hydroplantUpgrade.rate }
        }
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

function loadGame() {
    const savedGame = localStorage.getItem(SAVE_KEY);
    if (!savedGame) return;

    try {
        const data = JSON.parse(savedGame);

        if (!data) return;

        cream = Number(data.cream) || 0;
        stats.clicks = Number(data.stats?.clicks) || 0;
        stats.earned = Number(data.stats?.earned) || 0;
        stats.spent = Number(data.stats?.spent) || 0;

        const units = data.units || {};
        const unitMap = {
            cursor,
            grandma,
            farm,
            mine,
            factory,
            laboratory,
            creamfall,
            hydroplant
        };

        Object.keys(unitMap).forEach((name) => {
            if (!units[name]) return;
            unitMap[name].count = Number(units[name].count) || 0;
            unitMap[name].price = Number(units[name].price) || unitMap[name].basePrice;
            unitMap[name].rate = Number(units[name].rate) || unitMap[name].rate;
            unitMap[name].unitUpdate();
        });

        const upgrades = data.upgrades || {};
        const upgradeMap = {
            cursor: cursorUpgrade,
            grandma: grandmaUpgrade,
            mine: mineUpgrade,
            factory: factoryUpgrade,
            laboratory: laboratoryUpgrade,
            creamfall: creamfallUpgrade,
            hydroplant: hydroplantUpgrade
        };

        Object.keys(upgradeMap).forEach((name) => {
            if (!upgrades[name]) return;
            upgradeMap[name].price = Number(upgrades[name].price) || upgradeMap[name].price;
            upgradeMap[name].rate = Number(upgrades[name].rate) || upgradeMap[name].rate;
            upgradeMap[name].upgradeUpdate();
        });

        statsUpdate();
    } catch (error) {
        console.error("Save file is invalid:", error);
    }
}

document.getElementById("resetButton").addEventListener("click", () => {
    if (!confirm("Weet je zeker dat je opnieuw wilt beginnen?")) return;

    localStorage.removeItem(SAVE_KEY);
    location.reload();
});

//  ===============================================================
//      Call Functions
//  ===============================================================


statsUpdate();
loadGame();