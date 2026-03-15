import { formatTodaysDate } from "./formatDate";

describe("formatTodaysDate", () => {
  it("returns a string", () => {
    const date = new Date("November 14, 2026");
    const result = formatTodaysDate(date);
    expect(typeof result).toBe("string");
  });

  it("formats a normal date correctly", () => {
    const date = new Date("November 14, 2026");
    const result = formatTodaysDate(date);
    expect(result).toBe("2026-11-14");
  });

  it("pads the month when it is a single digit", () => {
    const date = new Date("January 11, 2026");
    const result = formatTodaysDate(date);
    expect(result).toBe("2026-01-11");
  });

  it("pads the day when it is a single digit", () => {
    const date = new Date("November 1, 2026");
    const result = formatTodaysDate(date);
    expect(result).toBe("2026-11-01");
  });

  it("pads both month and day when both are single digits", () => {
    const date = new Date("January 1, 2026");
    const result = formatTodaysDate(date);
    expect(result).toBe("2026-01-01");
  });
});
