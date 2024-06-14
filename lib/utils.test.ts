import {
  cn,
  ConcealAnswer,
  mergeProgress,
  UpdateAnswer,
  CheckAnswer,
  replaceCharAt,
  getDayCount,
  getCurrentItem,
  CalculatePercentage,
  CalculateGuesses,
} from "./utils";

jest.mock("./questions", () => ({
  questions: ["question1", "question2", "question3"],
}));

describe("Utility Functions", () => {
  test("cn merges class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });
  test("ConcealAnswer masks the answer correctly", () => {
    expect(ConcealAnswer("hello world")).toBe("h#### w####");
  });
  test("mergeProgress merges progress correctly", () => {
    expect(mergeProgress("h####", "hello")).toBe("hello");
    expect(mergeProgress("h#### w####", "hello world")).toBe("hello world");
  });
  test("UpdateAnswer updates the answer correctly", () => {
    expect(UpdateAnswer("kanembest", "kanye west")).toBe("kan## #est");
    expect(UpdateAnswer("atozicmitty", "atomic kitty")).toBe("ato#ic #itty");
  });
  test("CheckAnswer checks the answer correctly", () => {
    const result = CheckAnswer("hellowzrld", "hello world", "h#### w####");
    expect(result.isCorrect).toBe(false);
    expect(result.updatedAnswer).toBe("hello w#rld");
    const correctResult = CheckAnswer(
      "helloworld",
      "hello world",
      "h#### w####"
    );
    expect(correctResult.isCorrect).toBe(true);
    expect(correctResult.updatedAnswer).toBe("hello world");
  });
  test("replaceCharAt replaces character at specified index", () => {
    expect(replaceCharAt("hello", 1, "a")).toBe("hallo");
    expect(() => replaceCharAt("hello", 10, "a")).toThrow(
      "Index out of bounds"
    );
    expect(() => replaceCharAt("hello", 1, "aa")).toThrow(
      "Replacement character must be a single character"
    );
  });
  test("getDayCount returns the correct number of days since starting date", () => {
    const mockDate = new Date("2024-06-11");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    expect(getDayCount()).toBe(1);
  });
  test("getCurrentItem returns the current item correctly", () => {
    const mockDate = new Date("2024-06-11");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    const result = getCurrentItem();
    expect(result.hint).toBe("question2");
    expect(result.dayID).toBe(526);
  });
  test("CalculatePercentage calculates the percentage correctly", () => {
    expect(CalculatePercentage(100, 50)).toBe(50);
    expect(CalculatePercentage(0, 0)).toBe(0);
    expect(CalculatePercentage(10, 3)).toBe(30);
  });
  test("CalculateGuesses calculates guesses correctly", () => {
    const state = [
      {
        updatedAnswer: "h####",
        isCorrect: false,
        guessNumber: 0,
        progress: "h####",
      },
      {
        updatedAnswer: "h####",
        isCorrect: false,
        guessNumber: 1,
        progress: "h####",
      },
      {
        updatedAnswer: "h####",
        isCorrect: true,
        guessNumber: 2,
        progress: "hello",
      },
    ];
    const guesses = { "0": 0, "1": 0, "2": 0 };
    const result = CalculateGuesses(state, guesses);
    expect(result).toEqual({ "0": 0, "1": 0, "2": 1 });
  });
});
