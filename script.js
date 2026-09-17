let cream = 0;

const click = document.getElementById("cream");
const count = document.getElementById("creamCount");

count.innerText = 0;
function countUpdate(){count.innerText = cream;};

click.addEventListener("click", function() {
    cream += 1;
    countUpdate()
})

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