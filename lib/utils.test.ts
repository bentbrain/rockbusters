import {
  cn,
  ConcealAnswer,
  mergeProgress,
  UpdateAnswer,
  CheckAnswer,
  replaceCharAt,
  getDayCount,
  getCurrentItem,
  calculateTimeLeft,
  CalculatePercentage,
  CalculateGuesses,
  TransformOldStats,
} from "./utils";

vi.mock("./questions", () => ({
  questions: ["question1", "question2", "question3"],
}));

describe("Utility Functions", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  test("cn merges class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });
  test("ConcealAnswer masks the answer correctly", () => {
    expect(ConcealAnswer("hello world")).toBe("h#### w####");
    expect(ConcealAnswer("N-Sync")).toBe("N-S###");
    expect(ConcealAnswer("Terence Trent D'arby")).toBe("T###### T#### D'a###");
  });
  test("mergeProgress merges progress correctly", () => {
    expect(mergeProgress("h####", "hello")).toBe("hello");
    expect(mergeProgress("h#### w####", "hello world")).toBe("hello world");
    expect(mergeProgress("a## b##", "### bee")).toBe("a## bee");
  });
  test("UpdateAnswer updates the answer correctly", () => {
    expect(UpdateAnswer("kanembest", "kanye west")).toBe("kan## #est");
    expect(UpdateAnswer("atozicmitty", "atomic kitty")).toBe("ato#ic #itty");
    expect(UpdateAnswer("n sync", "N-Sync")).toBe("N#####");
    expect(UpdateAnswer("", "Lou Reed")).toBe("### ####");
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
    const caseInsensitiveResult = CheckAnswer(
      "SUPERTRAMP",
      "Supertramp",
      "S#########"
    );
    expect(caseInsensitiveResult.isCorrect).toBe(true);
    expect(caseInsensitiveResult.updatedAnswer).toBe("Supertramp");
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
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-11T00:00:00.000Z"));
    expect(getDayCount()).toBe(1);
  });
  test("getCurrentItem returns the current item correctly", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-11T00:00:00.000Z"));
    const result = getCurrentItem();
    expect(result.hint).toBe("question2");
    expect(result.dayID).toBe(526);
  });
  test("calculateTimeLeft returns time until the next UTC midnight", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-11T21:30:15.000Z"));
    expect(calculateTimeLeft("2024-06-11T08:00:00.000Z")).toEqual({
      hours: 2,
      minutes: 29,
      seconds: 45,
    });
  });
  test("calculateTimeLeft returns zero at exact UTC midnight", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-12T00:00:00.000Z"));
    expect(calculateTimeLeft("2024-06-11T08:00:00.000Z")).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
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
  test("CalculateGuesses records a miss when no guess is correct", () => {
    const state = [
      {
        updatedAnswer: "h####",
        isCorrect: false,
        guessNumber: 0,
        progress: "💚💚💚💚💚",
      },
      {
        updatedAnswer: "he###",
        isCorrect: false,
        guessNumber: 1,
        progress: "💔💚💚💚💚",
      },
    ];
    const guesses = { "0": 2, "1": 1 };
    expect(CalculateGuesses(state, guesses)).toEqual({ "0": 3, "1": 1 });
  });
  test("TransformOldStats converts legacy scores into share strings", () => {
    expect(TransformOldStats(5)).toBe("💔💔💔💔💚");
    expect(TransformOldStats(1)).toBe("💚💚💚💚💚");
    expect(TransformOldStats(0)).toBe("💔💔💔💔💔");
  });
});
