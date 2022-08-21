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

  const calculateNextTwoRolls = (roll1, roll2) => {
    let sum = 10;

    if (typeof roll1 === "number" && typeof roll2 === "number") {
      sum += roll1 + roll2;
    }
    if (isSpare(roll2)) {
      sum += 10;
    }
    if (isStrike(roll1)) {
      sum += 10;
    }
    if (isStrike(roll2)) {
      sum += 10;
    }

    return sum;
  };

  while (index < rolls.length) {
    if (isStrike(rolls[index])) {
      const frameScore =
        rolls[index + 1] && rolls[index + 2]
          ? calculateNextTwoRolls(rolls[index + 1], rolls[index + 2])
          : null;
      score.push(frameScore);
      index++;
    } else {
      const frameScore = rolls
        .slice(index, index + 2)
        .reduce((acc, roll, sliceIndex, sliceArray) => {
          if (!sliceArray[1]) {
            return null;
          } else if (isSpare(sliceArray[1])) {
            return rolls[index + 2] && rolls[index + 3]
              ? 10 + rolls[index + 2]
              : null;
          } else {
            return acc + roll;
          }
        }, 0);
      score.push(frameScore);
      index += 2;
    }
  }

  return score;
}

module.exports = calculateBowl;
