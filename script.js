//  ===============================================================
//      Set Variables
//  ===============================================================


let cream = 0;
let mouseClick = 1;
let production = 0;
let earningMultiplier = 1;
let bonusCountdownInterval;

const click = document.getElementById("cream");
const flyingBonus = document.getElementById("flyingBonus");
const bonusTimer = document.getElementById("bonusTimer");
const count = document.getElementById("creamCount");
const creamPerSecond = document.getElementById("creamPerSecond");
const clickCount = document.getElementById("clickCount");
const totalCreams = document.getElementById("totalCreams");
const totalCreamsSpent = document.getElementById("totalCreamsSpent");
const statsButton = document.getElementById("statsButton");
const statsContent = document.getElementById("statsContent");
const storeButton = document.getElementById("storeButton");
const storeContent = document.getElementById("storeContent");
const upgradesButton = document.getElementById("upgradesButton");
const upgradesContent = document.getElementById("upgradesContent");
const saveMenuButton = document.getElementById("saveMenuButton");
const saveMenuContent = document.getElementById("saveMenuContent");
const unitsButton = document.getElementById("unitsButton");
const unitsContent = document.getElementById("unitsContent");
const saveButton = document.getElementById("saveButton");

const stats = {
    clicks: 0,
    earned: 0,
    spent: 0
};

const numberSuffixes = [
    { value: 1e3, suffix: "k" },
    { value: 1e6, suffix: "m" },
    { value: 1e9, suffix: "md" },
    { value: 1e12, suffix: "b" },
    { value: 1e15, suffix: "bd" },
    { value: 1e18, suffix: "t" },
    { value: 1e21, suffix: "td" },
    { value: 1e24, suffix: "q" },
    { value: 1e27, suffix: "qd" },
    { value: 1e30, suffix: "qq" },
    { value: 1e33, suffix: "qqd" },
    { value: 1e36, suffix: "sx" },
    { value: 1e39, suffix: "sxd" },
    { value: 1e42, suffix: "sp" },
    { value: 1e45, suffix: "spd" },
    { value: 1e48, suffix: "oc" },
    { value: 1e51, suffix: "ocd" },
    { value: 1e54, suffix: "no" },
    { value: 1e57, suffix: "nod" },
    { value: 1e60, suffix: "dc" },
    { value: 1e63, suffix: "dcd" }
];

function formatNumber(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return String(value);

    let divisor = 1;
    let suffix = "";

    numberSuffixes.forEach((option) => {
        if (number >= option.value) {
            divisor = option.value;
            suffix = option.suffix;
        }
    });

    if (!suffix) {
        return new Intl.NumberFormat("nl-NL").format(number);
    }

    const shortened = Math.floor((number / divisor) * 10) / 10;
    const formatted = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1 }).format(shortened);
    return `${formatted}${suffix}`;
}

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
    count.innerText = formatNumber(cream);
    creamPerSecond.innerText = formatNumber(production);
    clickCount.innerText = formatNumber(stats.clicks);
    totalCreams.innerText = formatNumber(stats.earned);
    totalCreamsSpent.innerText = formatNumber(stats.spent);
    updateThemeUnlocks();
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
        this.amount = document.getElementById(this.name + "Amount");
 
        this.store.addEventListener("click", () => { 
            this.buy(); 
        }); 
        this.update(); 
    } 
 
    update() { 
        this.units.innerText = formatNumber(this.count); 
        this.units.parentElement.hidden = this.count === 0;
        this.cost.innerText = formatNumber(this.price); 
        this.amount.innerText = formatNumber(this.count);
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
        this.amount = document.getElementById(this.name + "UpgradeAmount");
 
        this.upgrade.addEventListener("click", () => { 
            this.buy(); 
        }); 
        this.update(); 
    } 
 
    update() { 
        this.cost.innerText = formatNumber(this.price); 
        this.amount.innerText = formatNumber(this.count);
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
        this.amount = document.getElementById(this.name + "UpgradeAmount");
 
        this.upgrade.addEventListener("click", () => { 
            this.buy() 
        }); 
        this.update(); 
    } 
 
    update() { 
        this.cost.innerText = formatNumber(this.price); 
        this.amount.innerText = formatNumber(this.count);
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
        this.amount = document.getElementById(this.name + "UpgradeAmount");
        this.upgrade.addEventListener("click", () => { 
            this.buy() 
        }); 
        this.update(); 
    } 
 
    update() { 
        this.cost.innerText = formatNumber(this.price);
        this.amount.innerText = formatNumber(this.count);
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

const prodBonus = new ProductionBonus("prodBonus", 20000000, 0.1);
 
const cursorBonus = new ClickBonus(cursor, 5000000); 
 
const cursorDouble = new DoubleClick(cursor, 3000); 
 
const grandmaDouble = new Double(grandma, 20000); 
const farmDouble = new Double(farm, 160000);
const mineDouble = new Double(mine, 1280000); 
const factoryDouble = new Double(factory, 10200000); 
const laboratoryDouble = new Double(laboratory, 81600000); 
const creamfallDouble = new Double(creamfall, 660000000); 
const hydroplantDouble = new Double(hydroplant, 5480000000);

//  ===============================================================
//      Quick Time Events
//  ===============================================================


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

function showShopPanel(showUpgrades) {
    const showStore = !showUpgrades;

    storeContent.classList.toggle("open", showStore);
    upgradesContent.classList.toggle("open", showUpgrades);
    storeButton.classList.toggle("open", showStore);
    upgradesButton.classList.toggle("open", showUpgrades);
    storeButton.setAttribute("aria-expanded", String(showStore));
    upgradesButton.setAttribute("aria-expanded", String(showUpgrades));
}

if (storeButton && storeContent && upgradesButton && upgradesContent) {
    storeButton.addEventListener("click", () => showShopPanel(false));
    upgradesButton.addEventListener("click", () => showShopPanel(true));
}

if (saveMenuButton && saveMenuContent) {
    saveMenuButton.addEventListener("click", () => {
        const isOpen = saveMenuContent.classList.toggle("open");
        saveMenuButton.classList.toggle("open", isOpen);
        saveMenuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

if (unitsButton && unitsContent) {
    unitsButton.addEventListener("click", () => {
        const isOpen = unitsContent.classList.toggle("open");
        unitsButton.classList.toggle("open", isOpen);
        unitsButton.setAttribute("aria-expanded", String(isOpen));
    });
}

if (saveButton) {
    saveButton.addEventListener("click", function() {
        if (saveGame()) {
            alert("Game opgeslagen!");
        }
    });
}

const themeButtons = document.querySelectorAll(".theme-choice.red, .theme-choice.green, .theme-choice.blue, .theme-choice.default-theme");

const themeUnlockRequirements = {
    red: { creams: 1_000_000, label: "1 miljoen" },
    blue: { creams: 1_000_000_000_000, label: "1 biljoen" },
    green: { creams: 1_000_000_000_000_000_000, label: "1 triljoen" }
};

function updateThemeUnlocks() {
    Object.entries(themeUnlockRequirements).forEach(([theme, requirement]) => {
        const button = Array.from(themeButtons).find((item) => item.classList.contains(theme));
        if (!button) return;

        const locked = stats.earned < requirement.creams;
        const unlockMessage = `${formatNumber(requirement.creams)} creams nodig`;
        button.classList.toggle("locked", locked);
        button.setAttribute("aria-disabled", String(locked));
        button.setAttribute("aria-label", locked
            ? `${theme} thema, ${unlockMessage}`
            : `Selecteer ${theme} thema`);
        button.title = locked
            ? unlockMessage
            : `Selecteer ${theme} thema`;
        if (locked) {
            button.dataset.unlockLabel = unlockMessage;
        } else {
            delete button.dataset.unlockLabel;
        }
    });
}

themeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        if (button.classList.contains("locked")) return;

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

const gameUnits = {
    cursor,
    grandma,
    farm,
    mine,
    factory,
    laboratory,
    creamfall,
    hydroplant
};

const gameUpgrades = {
    cursor: cursorDouble,
    grandma: grandmaDouble,
    farm: farmDouble,
    mine: mineDouble,
    factory: factoryDouble,
    laboratory: laboratoryDouble,
    creamfall: creamfallDouble,
    hydroplant: hydroplantDouble,
    cursorBonus,
    prodBonus,
    totalClick
};

function saveGame() {
    const saveData = {
        cream,
        stats: { ...stats },
        units: Object.fromEntries(
            Object.entries(gameUnits).map(([name, unit]) => [
                name,
                { count: unit.count, price: unit.price, rate: unit.rate }
            ])
        ),
        upgrades: Object.fromEntries(
            Object.entries(gameUpgrades).map(([name, upgrade]) => [
                name,
                { count: upgrade.count, price: upgrade.price }
            ])
        )
    };

    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        return true;
    } catch (error) {
        console.error("Game could not be saved:", error);
        alert("Opslaan is mislukt. Controleer of browseropslag beschikbaar is.");
        return false;
    }
}

function loadGame() {
    try {
        const savedGame = localStorage.getItem(SAVE_KEY);
        if (!savedGame) return;

        const data = JSON.parse(savedGame);
        if (!data) return;

        cream = Number(data.cream) || 0;
        stats.clicks = Number(data.stats?.clicks) || 0;
        stats.earned = Number(data.stats?.earned) || 0;
        stats.spent = Number(data.stats?.spent) || 0;

        Object.entries(gameUnits).forEach(([name, unit]) => {
            const savedUnit = data.units?.[name];
            if (!savedUnit) return;

            unit.count = Number(savedUnit.count) || 0;
            unit.price = Number(savedUnit.price) || unit.basePrice;
            unit.rate = Number(savedUnit.rate) || unit.rate;
            unit.update();
        });
        Unit.total = Object.values(gameUnits).reduce((total, unit) => total + unit.count, 0);

        Object.entries(gameUpgrades).forEach(([name, upgrade]) => {
            const savedUpgrade = data.upgrades?.[name];
            if (!savedUpgrade) return;

            upgrade.count = Number(savedUpgrade.count) || 0;
            upgrade.price = Number(savedUpgrade.price) || upgrade.price;
            upgrade.update();
        });

        DoubleClick.clicks = cursorDouble.rate ** cursorDouble.count;
        cursorBonus.update();
        prodBonus.bonus = prodBonus.count * prodBonus.factor + 1;
        totalClick.bonus = totalClick.count * totalClick.factor * stats.clicks + 1;
        statsUpdate();
    } catch (error) {
        console.error("Game save could not be loaded:", error);
    }
}

const resetButton = document.getElementById("resetButton");
if (resetButton) {
    resetButton.addEventListener("click", () => {
        if (!confirm("Weet je zeker dat je opnieuw wilt beginnen?")) return;

        localStorage.removeItem(SAVE_KEY);
        location.reload();
    });
}

//  ===============================================================
//      Call Functions
//  ===============================================================


statsUpdate();
loadGame();