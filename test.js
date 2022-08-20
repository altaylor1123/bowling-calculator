const calculateBowl = require("./calculateBowl");

describe("Calculate bowl", () => {
  it("returns an empty array upon recieving an empty array", () => {
    const score = calculateBowl([]);
    expect(score).toEqual([]);
  });
  it("returns the sum of a frame", () => {
    const score = calculateBowl([4, 5]);
    expect(score).toEqual([9]);
  });
  it("returns 2 scores for 2 non-bonus frames (no spares/strikes)", () => {
    const score = calculateBowl([4, 5, 3, 2]);
    expect(score).toEqual([9, 5]);
  });
  it("returns a null should a frame not be completed ", () => {
    expect(calculateBowl([4])).toEqual([null]);
    expect(calculateBowl([4, 5, 4])).toEqual([9, null]);
  });
  it("returns a spare bonus should next roll be scored", () => {
    const score = calculateBowl(["/", 5, 4]);
    expect(score).toEqual([15, 9]);
  });
  it("returns a null on a spare that doesn't have a next scored roll", () => {
    const score = calculateBowl(["/"]);
    expect(score).toEqual([null]);
  });
});
