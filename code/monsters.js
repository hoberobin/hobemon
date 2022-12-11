const monsters = {
  Hobemon: {
    position: {
      x: 250,
      y: 325,
    },
    image: {
      src: "./img/raccoonSprite.png",
    },
    frames: {
      max: 4,
      hold: 30,
    },
    animate: true,
    name: "Raccacconie",
    attacks: [attacks.Tackle, attacks.Rock],
  },

  Opponent: {
    position: {
      x: 650,
      y: 150,
    },
    image: {
      src: "./img/forestSpiritSprite.png",
    },
    frames: {
      max: 4,
      hold: 20,
    },
    animate: true,
    isOpponent: true,
    name: "Forest Spirit",
    attacks: [attacks.Tackle, attacks.Rock],
  },
};
