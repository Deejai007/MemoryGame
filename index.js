const cards = document.getElementsByClassName("card");
shuffle();
for (i = 0; i < 12; i++) {
  cards[i].addEventListener("click", flipCard);
}
shuffle();
function lockboard() {
  for (i = 0; i < 12; i++) {
    cards[i].removeEventListener("click", flipCard);
  }
}
function unlockboard() {
  for (i = 0; i < 12; i++) {
    cards[i].addEventListener("click", flipCard);
  }
}

a = 0;
let moves = 0;
let win = 0;
obj = [undefined, undefined];
function flipCard() {
  this.classList.add("flip");
  //   this.style.border = "3px solid white";
  obj[a] = this;
  obj[0].removeEventListener("click", flipCard);

  a++;
  if (a == 2) {
    moves++;
    document.getElementById("move").innerHTML = moves;

    compare();
    lockboard();

    setTimeout(() => {
      unlockboard();
    }, 900);
    a = 0;
  }
}
function compare() {
  let num1 = obj[0].dataset.value;
  let num2 = obj[1].dataset.value;

  if (num1 === num2) {
    win++;
    obj[0].removeEventListener("click", flipCard);
    obj[1].removeEventListener("click", flipCard);
    setTimeout(() => {
      obj[0].style.visibility = "hidden";
      obj[1].style.visibility = "hidden";
    }, 800);
    console.log("match");
  } else {
    unflip();
  }
  if (win == 6) {
    setTimeout(() => {
      document.getElementById("vct").style.display = "block";
      document.getElementById("vct").innerText = "You win!";
    }, 800);
    setTimeout(() => {
      window.location.reload();
    }, 8000);
  }
}
function unflip() {
  setTimeout(() => {
    obj[0].classList.remove("flip");
    obj[1].classList.remove("flip");
  }, 900);
}
function shuffle() {
  for (k = 0; k < 12; k++) {
    let randomPos = Math.floor(Math.random() * 12);
    cards[k].style.order = randomPos;
  }
}
