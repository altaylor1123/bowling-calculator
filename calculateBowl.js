function calculateBowl(rolls) {
  let score = [];
  if (rolls.length === 0) return score;

  if (isStrike(rolls[0])) {
    const frameScore = calculateStrikeFrame(rolls);
    score.push(frameScore);
    return score.concat(calculateBowl(rolls.slice(1)));
  } else {
    const frameScore = calculateFrame(rolls);
    score.push(frameScore);
    return score.concat(calculateBowl(rolls.slice(2)));
  }
}

const isSpare = (roll) => {
  return roll === "/";
};
const isStrike = (roll) => {
  return roll === "X";
};

const calculateStrikeFrame = (rolls) => {
  if (rolls[1] === undefined || rolls[2] === undefined) return null;
  return rolls.slice(1, 3).reduce((acc, roll, _, array) => {
    if (isSpare(roll)) {
      return acc + (10 - array[0]);
    }
    if (isStrike(roll)) {
      return acc + 10;
    }
    return acc + roll;
  }, 10);
};

const calculateFrame = (rolls) => {
  if (rolls[1] === undefined) return null;
  return rolls.slice(0, 2).reduce((acc, roll, _, array) => {
    if (isSpare(roll)) {
      return rolls[2] !== undefined && rolls[3] !== undefined
        ? acc + (10 - array[0]) + rolls[2]
        : null;
    }
    return acc + roll;
  }, 0);
};

module.exports = calculateBowl;
