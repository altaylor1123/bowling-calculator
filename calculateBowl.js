function calculateBowl(rolls) {
  if (rolls.length === 0) return [];
  let index = 0;
  const score = [];

  const isDigit = (roll) => {
    return /([0-9])/.test(roll);
  };
  const isSpare = (roll) => {
    return roll === "/";
  };
  const isStrike = (roll) => {
    return roll === "X";
  };

  const calculateStrikeFrame = () => {
    if (
      !(
        (rolls[index + 1] || rolls[index + 1] === 0) &&
        (rolls[index + 2] || rolls[index + 2] === 0)
      )
    )
      return null;
    return rolls.slice(index + 1, index + 3).reduce((acc, roll, _, array) => {
      if (isDigit(roll)) {
        return acc + roll;
      }
      if (isSpare(roll)) {
        return acc + (10 - array[0]);
      }
      if (isStrike(roll)) {
        return acc + 10;
      }
      return acc;
    }, 10);
  };

  const calculateFrame = () => {
    return rolls.slice(index, index + 2).reduce((acc, roll, _, array) => {
      if (!(array[1] || array[1] === 0)) {
        return null;
      } else if (isSpare(array[1])) {
        return rolls[index + 2] && rolls[index + 3]
          ? 10 + rolls[index + 2]
          : null;
      } else {
        return acc + roll;
      }
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
