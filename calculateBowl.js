function calculateBowl(rolls) {
  if (rolls.length === 0) return [];
  let index = 0;
  const score = [];

  while (index < rolls.length) {
    const frameScore = rolls
      .slice(index, index + 2)
      .reduce((acc, roll) => acc + roll, 0);
    score.push(frameScore);
    index += 2;
  }

  return score;
}

module.exports = calculateBowl;
