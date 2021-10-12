var pos = 0;
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];
//var direction = 0;
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan
function makePac() {
  // returns an object with values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  let direction = 0;
  let focus = 0;
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "./images/PacMan1.png";
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);
  // new style of creating an object
  return {
    position,
    velocity,
    newimg,
    direction,
    focus,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    item.focus = (item.focus + 1) % 2;
    checkCollisions(item);
    item.newimg.src = pacArray[item.direction][item.focus];
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  let direction;
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ){
    item.velocity.x = -item.velocity.x;
    item.direction  = (item.direction === 0 ? 1 : 0);
  }
    
  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ){
    item.velocity.y = -item.velocity.y;
  }    
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
