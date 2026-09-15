let creams = 0;

const cream = document.getElementById("cream");
const count = document.getElementById("creamCount");

count.innerText = 0;

cream.addEventListener("click", function() {
    creams = creams + 1;
    count.innerText = creams;
})