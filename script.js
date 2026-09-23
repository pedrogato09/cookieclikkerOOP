let cream = 0;

const click = document.getElementById("cream");
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
const SAVE_KEY = "creamClickerSave";

function countUpdate() {
    count.innerText = cream;
}

function statsUpdate() {
    clickCount.innerText = stats.clicks;
    totalCreams.innerText = stats.earned;
    totalCreamsSpent.innerText = stats.spent;
}

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

        countUpdate();
        statsUpdate();
    } catch (error) {
        console.error("Save file is invalid:", error);
    }
}

click.addEventListener("click", function() {
    cream += 1;
    stats.clicks += 1;
    stats.earned += 1;
    countUpdate();
    statsUpdate();
});

//units

class Unit {
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
        this.unitUpdate();
    }

    unitUpdate() {
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
            countUpdate();
            statsUpdate();
            this.unitUpdate();
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
    const production = cursor.prod() + grandma.prod() + farm.prod() + mine.prod() + factory.prod() + laboratory.prod() + creamfall.prod() + hydroplant.prod();
    if (production > 0) {
        cream += production;
        stats.earned += production;
        countUpdate();
        statsUpdate();
    }
}, 1000);

class Upgrade {
    constructor(name, price, unit, rate) {
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
        this.upgradeUpdate();
    }

    upgradeUpdate() {
        this.cost.innerText = this.price;
    }

    buy() {
        if (cream >= this.price) {
            const cost = this.price;
            cream -= cost;
            stats.spent += cost;
            this.unit.rate *= this.rate;
            this.price = Math.round(this.price * 5);
            countUpdate();
            statsUpdate();
            this.unit.unitUpdate();
            this.upgradeUpdate();
        }
    }
}

class CursorUpgrade extends Upgrade {
    constructor() {
        super("cursor", 100, cursor, 2);
    }
}

const cursorUpgrade = new CursorUpgrade();
const grandmaUpgrade = new Upgrade("grandma", 500, grandma, 2);
const mineUpgrade = new Upgrade("mine", 2000, mine, 2);
const factoryUpgrade = new Upgrade("factory", 10000, factory, 2);
const laboratoryUpgrade = new Upgrade("laboratory", 50000, laboratory, 2);
const creamfallUpgrade = new Upgrade("creamfall", 250000, creamfall, 2);
const hydroplantUpgrade = new Upgrade("hydroplant", 1000000, hydroplant, 2);

setInterval(() => {
    cursorUpgrade.upgradeUpdate();
    grandmaUpgrade.upgradeUpdate();
    mineUpgrade.upgradeUpdate();
    factoryUpgrade.upgradeUpdate();
    laboratoryUpgrade.upgradeUpdate();
    creamfallUpgrade.upgradeUpdate();
    hydroplantUpgrade.upgradeUpdate();
}, 1000);

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

countUpdate();
statsUpdate();
loadGame();


