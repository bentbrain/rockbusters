import { getTimeLeft } from "./countdown";

describe("countdown helpers", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("returns the time until the next UTC midnight", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-11T21:30:15.000Z"));

    expect(getTimeLeft("2024-06-11T08:00:00.000Z")).toEqual({
      hours: 2,
      minutes: 29,
      seconds: 45,
    });
  });

  test("never returns negative time after the reset boundary", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-12T00:00:01.000Z"));

    expect(getTimeLeft("2024-06-11T08:00:00.000Z")).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});
