import { describe, expect, it } from "vitest";
import { filterBrowserLoadFailureExceptions } from "./analytics";

describe("analytics event filtering", () => {
  it("drops stackless Safari load failure exceptions", () => {
    const event = {
      event: "$exception",
      properties: {
        $browser: "Safari",
        $exception_list: [
          {
            type: "TypeError",
            value: "Load failed",
          },
        ],
      },
    };

    expect(filterBrowserLoadFailureExceptions(event)).toBeNull();
  });

  it("keeps Safari load failure exceptions with stack frames", () => {
    const event = {
      event: "$exception",
      properties: {
        $browser: "Safari",
        $exception_list: [
          {
            stacktrace: {
              frames: [{ filename: "app/page.tsx" }],
            },
            type: "TypeError",
            value: "Load failed",
          },
        ],
      },
    };

    expect(filterBrowserLoadFailureExceptions(event)).toBe(event);
  });

  it("keeps non-Safari load failure exceptions", () => {
    const event = {
      event: "$exception",
      properties: {
        $browser: "Chrome",
        $exception_list: [
          {
            type: "TypeError",
            value: "Load failed",
          },
        ],
      },
    };

    expect(filterBrowserLoadFailureExceptions(event)).toBe(event);
  });
});
