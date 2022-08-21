const calculateBowl = require("./calculateBowl");

describe("Calculate bowl", () => {
  it("returns an empty array upon recieving an empty array", () => {
    expect(calculateBowl([])).toEqual([]);
  });
  it("returns the sum of a frame", () => {
    expect(calculateBowl([4, 5])).toEqual([9]);
  });
  it("returns 2 scores for 2 non-bonus frames (no spares/strikes)", () => {
    expect(calculateBowl([4, 5, 3, 2])).toEqual([9, 5]);
  });
  it("returns a null should a frame not be completed ", () => {
    expect(calculateBowl([4])).toEqual([null]);
    expect(calculateBowl([4, 5, 4])).toEqual([9, null]);
  });
  it("returns a spare bonus should next roll be scored", () => {
    expect(calculateBowl([6, "/", 5, 4])).toEqual([15, 9]);
  });
  it("returns a null on a spare that doesn't have a next frame rolled", () => {
    expect(calculateBowl(["/"])).toEqual([null]);
    expect(calculateBowl([4, 5, 6, "/"])).toEqual([9, null]);
    expect(calculateBowl([4, 5, 6, "/", 4])).toEqual([9, null, null]);
  });
  it("returns a strike bonus should next two rolls be scored", () => {
    expect(calculateBowl(["X", 5, 4])).toEqual([19, 9]);
    expect(calculateBowl([4, 5, "X", 8, 1])).toEqual([9, 19, 9]);
  });
  it("returns a null on a strike that doesn't have the next two rolls scored", () => {
    expect(calculateBowl(["X"])).toEqual([null]);
    expect(calculateBowl([4, 5, "X", 9])).toEqual([9, null, null]);
  });
  it("returns nulls on a streak of strikes", () => {
    expect(calculateBowl(["X", "X", "X"])).toEqual([30, null, null]);
  });
  it("returns stike bonus when strike followed by spare", () => {
    expect(calculateBowl(["X", 4, "/"])).toEqual([20, null]);
    expect(calculateBowl([4, 5, "X", 8, "/"])).toEqual([9, 20, null]);
  });
  it("returns 0 scores upon rolling 0s", () => {
    expect(calculateBowl(["X", 0, 0])).toEqual([10, 0]);
  });
});
