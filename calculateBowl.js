function calculateBowl(rolls) {
  if (rolls.length === 0) return [];
  let index = 0;
  const score = [];

  const isSpare = (roll) => {
    return roll === "/";
  };
  const isStrike = (roll) => {
    return roll === "X";
  };

  const calculateStrikeFrame = () => {
    if (rolls[index + 1] === undefined || rolls[index + 2] === undefined)
      return null;
    return rolls.slice(index + 1, index + 3).reduce((acc, roll, _, array) => {
      if (isSpare(roll)) {
        return acc + (10 - array[0]);
      }
      if (isStrike(roll)) {
        return acc + 10;
      }
      return acc + roll;
    }, 10);
  };

  const calculateFrame = () => {
    if (rolls[index + 1] === undefined) return null;
    return rolls.slice(index, index + 2).reduce((acc, roll, _, array) => {
      if (isSpare(roll)) {
        return rolls[index + 2] !== undefined && rolls[index + 3] !== undefined
          ? acc + (10 - array[0]) + rolls[index + 2]
          : null;
      }
      return acc + roll;
    }, 0);
  };

  while (index < rolls.length) {
    if (isStrike(rolls[index])) {
      const frameScore = calculateStrikeFrame();
      score.push(frameScore);
      index++;
    } else {
      const frameScore = calculateFrame();
      score.push(frameScore);
      index += 2;
    }
  }

  return score;
}

module.exports = calculateBowl;
