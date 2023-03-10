export const playSound = (type) => {
  const sound = new Audio(`../public/audio/${type}.mp3`);
  sound.play();
}