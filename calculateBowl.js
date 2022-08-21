function calculateBowl(rolls) {
  if (rolls.length === 0) return [];
  let index = 0;
  const score = [];

  const checkRoll = (roll) => {
    if (roll === "X") {
      return 10;
    } else {
      return roll;
    }
  };

  while (index < rolls.length) {
    if (rolls[index] === "X") {
      const frameScore =
        rolls[index + 1] && rolls[index + 2]
          ? 10 + checkRoll(rolls[index + 1]) + checkRoll(rolls[index + 2])
          : null;
      score.push(frameScore);
      index++;
    } else {
      const frameScore = rolls
        .slice(index, index + 2)
        .reduce((acc, roll, sliceIndex, sliceArray) => {
          if (sliceArray[1] === undefined) {
            return null;
          } else if (sliceArray[1] === "/") {
            return rolls[index + 2] ? 10 + rolls[index + 2] : null;
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
