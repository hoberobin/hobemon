const audio = {
  Map: new Howl({
    src: "./audio/map.wav",
    html5: true,
    volume: 0.1,
  }),
  initBattle: new Howl({
    src: "./audio/initBattle.wav",
    html5: true,
    volume: 0.05,
  }),
  battle: new Howl({
    src: "./audio/battle.mp3",
    volume: 0.05,
  }),
  tackleHit: new Howl({
    src: "./audio/tackleHit.wav",
    html5: true,
    volume: 0.1,
  }),
  rockHit: new Howl({
    src: "./audio/rockHit.wav",
    html5: true,
    volume: 0.1,
  }),
  initRock: new Howl({
    src: "./audio/initRock.wav",
    html5: true,
    volume: 0.1,
  }),
  victory: new Howl({
    src: "./audio/victory.wav",
    html5: true,
    volume: 0.1,
  }),
};
