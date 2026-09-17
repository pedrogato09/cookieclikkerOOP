let cream = 0;

const click = document.getElementById("cream");
const count = document.getElementById("creamCount");

count.innerText = 0;
function countUpdate(){count.innerText = cream;};

click.addEventListener("click", function() {
    cream = cream + 1;
    countUpdate()
})
 cream = cream + 1;
    cream += 1;
    countUpdate()

//units

let cursor = 0;
let cursorPrice = 15;
let cursorRate = 1;

const cursorBuy = document.getElementById("cursorStore");
const cursorCount = document.getElementById("cursorUnits");

cursorCount.innerText = 0;
function cursorUpdate(){cursorCount.innerText = cursor;};

cursorBuy.addEventListener("click", function() {
    if (cream >= cursorPrice) {
        cream -= cursorPrice;
        cursor += 1;
        countUpdate();
        cursorUpdate();
    };
});

setInterval(() => {
    cream += cursor*cursorRate;
    countUpdate();
}, 1000);

let grandma = 0;
let grandmaPrice = 100;
let grandmaRate = 5;

const grandmaBuy = document.getElementById("grandmaStore");
const grandmaCount = document.getElementById("grandmaUnits");

grandmaCount.innerText = 0;
function grandmaUpdate(){grandmaCount.innerText = grandma;};

grandmaBuy.addEventListener("click", function() {
    if (cream >= grandmaPrice) {
        cream -= grandmaPrice;
        grandma += 1;
        countUpdate();
        grandmaUpdate();
    };
});

setInterval(() => {
    cream += grandma*grandmaRate;
    countUpdate();
}, 1000);

let mine = 0;
let minePrice = 500;
let mineRate = 20;

const mineBuy = document.getElementById("mineStore");
const mineCount = document.getElementById("mineUnits");

mineCount.innerText = 0;
function mineUpdate(){mineCount.innerText = mine;};

mineBuy.addEventListener("click", function() {
    if (cream >= minePrice) {
        cream -= minePrice;
        mine += 1;
        countUpdate();
        mineUpdate();
    };
});

setInterval(() => {
    cream += mine*mineRate;
    countUpdate();
}, 1000);

let factory = 0;
let factoryPrice = 3000;
let factoryRate = 100;

const factoryBuy = document.getElementById("factoryStore");
const factoryCount = document.getElementById("factoryUnits");

factoryCount.innerText = 0;
function factoryUpdate(){factoryCount.innerText = factory;};

factoryBuy.addEventListener("click", function() {
    if (cream >= factoryPrice) {
        cream -= factoryPrice;
        factory += 1;
        countUpdate();
        factoryUpdate();
    };
});

setInterval(() => {
    cream += factory*factoryRate;
    countUpdate();
}, 1000);




