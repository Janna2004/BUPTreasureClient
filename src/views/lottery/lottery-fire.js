import confetti from 'canvas-confetti';


let count = 200;
let defaults1 = {
  angle:70,
  origin: { 
    x: 0.1,
    y: 0.8 
  }
};
let defaults2 = {
  angle:120,
  origin: { 
    x: 0.9,
    y: 0.8 
  }
};

export function fire1(particleRatio, opts) {
  confetti({
    ...defaults1,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

export function fire2(particleRatio, opts) {
  confetti({
    ...defaults2,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}
