const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./img/battleBackground2.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

let opponent;
let hobemon;
let renderedSprites;
let battleAnimationId;
let queue;

function initBattle() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#opponentHealthBar").style.width = "100%";
  document.querySelector("#hobemonHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  opponent = new Monster(monsters.Opponent);
  hobemon = new Monster(monsters.Hobemon);
  renderedSprites = [opponent, hobemon];
  queue = [];

  hobemon.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });

  // Our event listeners for buttons(attack)
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      hobemon.attack({
        attack: selectedAttack,
        recipient: opponent,
        renderedSprites,
      });

      if (opponent.health <= 0) {
        queue.push(() => {
          opponent.faint();
        });
        queue.push(() => {
          //fade back to black
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector("#userInterface").style.display = "none";

              gsap.to("#overlappingDiv", {
                opacity: 0,
              });

              battle.initiated = false;
              audio.Map.play();
            },
          });
        });
      }

      //Opponent attacks right here

      const randomAttack =
        opponent.attacks[Math.floor(Math.random() * opponent.attacks.length)];

      queue.push(() => {
        opponent.attack({
          attack: randomAttack,
          recipient: hobemon,
          renderedSprites,
        });

        if (hobemon.health <= 0) {
          queue.push(() => {
            hobemon.faint();
          });

          queue.push(() => {
            //fade back to black
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector("#userInterface").style.display = "none";

                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                battle.initiated = false;
                audio.Map.play();
              },
            });
          });
        }
      });
    });

    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedAttack.type;
      document.querySelector("#attackType").style.color = selectedAttack.color;
    });
  });
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animate();
// initBattle();
// animateBattle();
// Event Listeners for Buttons (Attacks)

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
