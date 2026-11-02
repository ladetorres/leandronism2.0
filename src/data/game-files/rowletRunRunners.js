class RunnerAnimation {
  constructor(id, name, spriteFileName = '', spriteWidth = 1, spriteHeight = 1,
              spriteRows = 1, spriteCols = 1, animRowStart = 1, animRowEnd = 1,
              animDuration = 1) {
    this.id = id
    this.name = name
    this.spriteFileName = spriteFileName
    this.spriteWidth = spriteWidth
    this.spriteHeight = spriteHeight
    this.spriteRows = spriteRows
    this.spriteCols = spriteCols
    this.animRowStart = animRowStart
    this.animRowEnd = animRowEnd
    this.animDuration = animDuration
  }
}

export const rowletWalkAnim = new RunnerAnimation(
  1,
  'rowletWalkAnim',
  '/rowlet/anim/Walk-Anim.png',
  1,
  1,
  8,
  4,
  3,
  3,
  1
);
export const shedinjaWalkAnim = new RunnerAnimation(
  1,
  'shedinjaWalkAnim',
  '/shedinja/anim/Walk-Anim.png',
  16,
  1,
  8,
  16,
  3,
  3,
  1
);
export const miloticWalkAnim = new RunnerAnimation(
  1,
  'miloticWalkAnim',
  '/milotic/anim/Walk-Anim.png',
  16,
  1,
  8,
  6,
  3,
  3,
  1
);
export const sylveonWalkAnim = new RunnerAnimation(
  1,
  'sylveonWalkAnim',
  '/sylveon/anim/Walk-Anim.png',
  16,
  1,
  8,
  4,
  3,
  3,
  1
);
export const onyxWalkAnim = new RunnerAnimation(
  1,
  'onyxWalkAnim',
  '/onyx/anim/Walk-Anim.png',
  16,
  1,
  8,
  4,
  3,
  3,
  1
);
export const dugtrioWalkAnim = new RunnerAnimation(
  1,
  'dugtrioWalkAnim',
  '/dugtrio/anim/Walk-Anim.png',
  16,
  1,
  8,
  3,
  3,
  3,
  1
);

export const rowletHopAnim = new RunnerAnimation(
  1,
  'rowletHopAnim',
  '/rowlet/anim/Hop-Anim.png',
  1,
  1,
  8,
  10,
  3,
  3,
  1
);
export const shedinjaHopAnim = new RunnerAnimation(
  1,
  'shedinjaHopAnim',
  '/shedinja/anim/Hop-Anim.png',
  1,
  1,
  8,
  10,
  3,
  3,
  1
);
export const miloticHopAnim = new RunnerAnimation(
  1,
  'miloticHopAnim',
  '/milotic/anim/Hop-Anim.png',
  1,
  1,
  8,
  10,
  3,
  3,
  1
);
export const sylveonHopAnim = new RunnerAnimation(
  1,
  'sylveonHopAnim',
  '/sylveon/anim/Hop-Anim.png',
  1,
  1,
  8,
  10,
  3,
  3,
  1
);
export const onyxHopAnim = new RunnerAnimation(
  1,
  'onyxHopAnim',
  '/onyx/anim/Hop-Anim.png',
  1,
  1,
  8,
  10,
  3,
  3,
  1
);
export const dugtrioHopAnim = new RunnerAnimation(
  1,
  'dugtrioHopAnim',
  '/dugtrio/anim/Hop-Anim.png',
  1,
  1,
  8,
  7,
  3,
  3,
  1
);

export const rowletAttackAnim = new RunnerAnimation(
  1,
  'rowletAttackAnim',
  '/rowlet/anim/Attack-Anim.png',
  1,
  1,
  8,
  14,
  3,
  3,
  1
);
export const shedinjaAttackAnim = new RunnerAnimation(
  1,
  'shedinjaAttackAnim',
  '/shedinja/anim/Attack-Anim.png',
  1,
  1,
  8,
  10,
  3,
  3,
  1
);
export const miloticAttackAnim = new RunnerAnimation(
  1,
  'miloticAttackAnim',
  '/milotic/anim/Attack-Anim.png',
  1,
  1,
  8,
  10,
  3,
  3,
  1
);
export const sylveonAttackAnim = new RunnerAnimation(
  1,
  'sylveonAttackAnim',
  '/sylveon/anim/Attack-Anim.png',
  1,
  1,
  8,
  14,
  3,
  3,
  1
);
export const onyxAttackAnim = new RunnerAnimation(
  1,
  'onyxAttackAnim',
  '/onyx/anim/Attack-Anim.png',
  1,
  1,
  8,
  11,
  3,
  3,
  1
);
export const dugtrioAttackAnim = new RunnerAnimation(
  1,
  'dugtrioAttackAnim',
  '/dugtrio/anim/Attack-Anim.png',
  1,
  1,
  8,
  9,
  3,
  3,
  1
);
export const rowletHurtAnim = new RunnerAnimation(
  1,
  'rowletHurtAnim',
  '/rowlet/anim/Hurt-Anim.png',
  1,
  1,
  8,
  2,
  3,
  3,
  0.5
);
export const shedinjaHurtAnim = new RunnerAnimation(
  1,
  'shedinjaHurtAnim',
  '/shedinja/anim/Hurt-Anim.png',
  1,
  1,
  8,
  2,
  3,
  3,
  0.5
);
export const miloticHurtAnim = new RunnerAnimation(
  1,
  'miloticHurtAnim',
  '/milotic/anim/Hurt-Anim.png',
  1,
  1,
  8,
  2,
  3,
  3,
  0.5
);
export const sylveonHurtAnim = new RunnerAnimation(
  1,
  'sylveonHurtAnim',
  '/sylveon/anim/Hurt-Anim.png',
  1,
  1,
  8,
  2,
  3,
  3,
  0.5
);
export const onyxHurtAnim = new RunnerAnimation(
  1,
  'onyxHurtAnim',
  '/onyx/anim/Hurt-Anim.png',
  1,
  1,
  8,
  2,
  3,
  3,
  0.5
);

export const dugtrioHurtAnim = new RunnerAnimation(
  1,
  'dugtrioHurtAnim',
  '/dugtrio/anim/Hurt-Anim.png',
  1,
  1,
  8,
  2,
  3,
  3,
  0.5
);


class Runner {
  constructor(id, name, spriteDefaultFileName = '', spriteSelectedtFileName = '',
              speed = 1, hopChargeTime = 3, attackChargeTime = 3,
              lifePoints = 3, maxLifePoints = 5, pokeballsRequirement = 0,
              pointsMultiplier = 1, description = '', idleAnimation = null,
              walkAnimation = null,
              attackAnimation = null, hopAnimation = null, doubleTeamAnimation = null,
              hurtAnimation = null, loseAnimation = null, winAnimation = null) {
    this.id = id
    this.name = name
    this.spriteDefaultFileName = spriteDefaultFileName
    this.spriteSelectedtFileName = spriteSelectedtFileName
    this.speed = speed
    this.hopChargeTime = hopChargeTime
    this.attackChargeTime = attackChargeTime
    this.lifePoints = lifePoints
    this.maxLifePoints = maxLifePoints
    this.pokeballsRequirement = pokeballsRequirement
    this.pointsMultiplier = pointsMultiplier
    this.description = description
    this.idleAnimation = idleAnimation
    this.walkAnimation = walkAnimation
    this.attackAnimation = attackAnimation
    this.hopAnimation = hopAnimation
    this.doubleTeamAnimation = doubleTeamAnimation
    this.hurtAnimation = hurtAnimation
    this.loseAnimation = loseAnimation
    this.winAnimation = winAnimation
  }
}



export const runnerRowlet = new Runner(
  1,
  'Rowlet',
  '/rowlet/rowlet-determined-static.png',
  '/rowlet/rowlet-joyous-static.png',
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  'desc',
  rowletWalkAnim,
  rowletWalkAnim,
  rowletWalkAnim,
  rowletWalkAnim,
  rowletWalkAnim,
  rowletWalkAnim,
  rowletWalkAnim,
  rowletWalkAnim
  );

export default Runner
