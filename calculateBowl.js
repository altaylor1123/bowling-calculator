function calculateBowl(rolls) {
  if (rolls.length === 0) return [];
  let index = 0;
  const score = [];

  const calculateNextTwoRolls = (roll1, roll2) => {
    let sum = 0;

    if (typeof roll1 === "number" && typeof roll2 === "number") {
      sum = roll1 + roll2;
    }
    if (roll2 === "/") {
      sum += 10;
    }
    if (roll1 === "X") {
      sum += 10;
    }
    if (roll2 === "X") {
      sum += 10;
    }

    return sum;
  };

  while (index < rolls.length) {
    if (rolls[index] === "X") {
      const frameScore =
        rolls[index + 1] && rolls[index + 2]
          ? 10 + calculateNextTwoRolls(rolls[index + 1], rolls[index + 2])
          : null;
      score.push(frameScore);
      index++;
    } else {
      const frameScore = rolls
        .slice(index, index + 2)
        .reduce((acc, roll, sliceIndex, sliceArray) => {
          if (!sliceArray[1]) {
            return null;
          } else if (sliceArray[1] === "/") {
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
