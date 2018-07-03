let players = [];
const playerInput = document.querySelector(".new-player");
const playerList = document.querySelector(".player-list");
const scores = document.querySelector(".scores");
const winner = document.querySelector(".winner");

const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
const suites = ["hearts", "spades", "diamonds", "clubs"];
let deck = [];

function createDeck() {
  cards.forEach((card, rank) => {
    // use the index of the card in the deck to rank each card
    suites.forEach(suit => {
      deck.push({
        card,
        suit,
        rank
      });
    });
  });
}

createDeck();

document.querySelector(".add-player").addEventListener("click", e => {
  e.preventDefault();
  players.push({ name: playerInput.value });
  const li = document.createElement("li");
  li.innerText = playerInput.value;
  playerList.appendChild(li);
});

document.querySelector(".play").addEventListener("click", e => {
  players.forEach(player => {
    let randomIndex = Math.floor(Math.random() * deck.length);
    player.card = deck[randomIndex];
    // remove card from deck so there aren't any duplicates
    deck.splice(randomIndex, 1);
  });

  players.forEach(player => {
    const li = document.createElement("li");
    li.innerText = `${player.name} - ${player.card.card} of ${
      player.card.suit
    }`;
    scores.appendChild(li);
  });

  // rank the players in the order of their hand -- see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  players = players.sort((a, b) => a.card.rank - b.card.rank);

  let highScore = players[players.length - 1];
  winner.innerText = "Winner is " + highScore.name;
});
