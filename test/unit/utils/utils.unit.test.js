const {
  convertStringToBoolean,
  isOptionalPositiveInteger,
  isPositiveOrZeroInteger,
  isBoolean,
} = require("../../../src/utils/utils");
describe("#isOptionalPositiveNumber", () => {
  it("should return true if a positive integer is given", () => {
    const result = isOptionalPositiveInteger(1);
    expect(result).toEqual(true);
  });

  it("should return true due to value is empty string", () => {
    const result = isOptionalPositiveInteger("");
    expect(result).toEqual(true);
  });
  it("should return true due to value is null", () => {
    const result = isOptionalPositiveInteger(null);
    expect(result).toEqual(true);
  });
  it("should return true due to value is undefined", () => {
    const result = isOptionalPositiveInteger();
    expect(result).toEqual(true);
  });
  it("should return false due to value is string", () => {
    const result = isOptionalPositiveInteger("1");
    expect(result).toEqual(false);
  });
  it("should return false due to value is NaN", () => {
    const result = isOptionalPositiveInteger(NaN);
    expect(result).toEqual(false);
  });
  it("should return false due to value is a negative integer", () => {
    const result = isOptionalPositiveInteger(-1);
    expect(result).toEqual(false);
  });
  it("should return false due to value is a number with decimals", () => {
    const result = isOptionalPositiveInteger(1.01);
    expect(result).toEqual(false);
  });
});

describe("#isPositiveOrZeroInteger", () => {
  it("should return false for undefined value", () => {
    const result = isPositiveOrZeroInteger();
    expect(result).toEqual(false);
  });
  it("should return false for a negative negative number", () => {
    const result = isPositiveOrZeroInteger(-1);
    expect(result).toEqual(false);
  });
  it("should return false due to value is not an integer", () => {
    const result = isPositiveOrZeroInteger(1.01);
    expect(result).toEqual(false);
  });
  it("should return true", () => {
    const result = isPositiveOrZeroInteger(1);
    expect(result).toEqual(true);
  });
});

describe("#convertStringToBoolean", () => {
  it("should return the boolean if it is already boolean", () => {
    const result = convertStringToBoolean(true);
    expect(result).toEqual(true);

    const result2 = convertStringToBoolean(false);
    expect(result2).toEqual(false);
  });

  it("should return the specific boolean value based on the string", () => {
    expect(convertStringToBoolean("true")).toEqual(true);
    expect(convertStringToBoolean("TRUE")).toEqual(true);
    expect(convertStringToBoolean("True")).toEqual(true);
    expect(convertStringToBoolean("TrUe")).toEqual(true);

    expect(convertStringToBoolean("false")).toEqual(false);
    expect(convertStringToBoolean("FALSE")).toEqual(false);
    expect(convertStringToBoolean("False")).toEqual(false);
    expect(convertStringToBoolean("FaLsE")).toEqual(false);
  });

  it("should return undefined because it is neither true nor false", () => {
    const result = convertStringToBoolean("test");
    expect(result).toBe(undefined);
  });
});

describe("#isBoolean", () => {
  it("should return false due to value is not boolean", () => {
    const result = isBoolean();
    expect(result).toEqual(false);

    const result2 = isBoolean("true");
    expect(result2).toEqual(false);
  });
  it("should return true", () => {
    const result = isBoolean(true);
    expect(result).toEqual(true);

    const result2 = isBoolean(false);
    expect(result2).toEqual(true);
  });
});
