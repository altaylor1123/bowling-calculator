function calculateBowl(rolls) {
  if (rolls.length === 0) return [];
  let index = 0;
  const score = [];

  while (index < rolls.length) {
    if (rolls[index] === "/") {
      const frameScore = rolls[index + 1] ? 10 + rolls[index + 1] : null;
      score.push(frameScore);
      index++;
    } else {
      const frameScore = rolls
        .slice(index, index + 2)
        .reduce((acc, roll, sliceIndex, sliceArray) => {
          if (sliceArray[1] === undefined) {
            return null;
          }
          return acc + roll;
        }, 0);
      score.push(frameScore);
      index += 2;
    }
  }

  return score;
}

module.exports = calculateBowl;
