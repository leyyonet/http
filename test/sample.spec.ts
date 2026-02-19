import { assert, describe, it } from "vitest";
import { CausedError } from "@leyyo/common";

describe("http", () => {
  it("not symbol", () => {
    assert.throws(() => {
      throw new CausedError("invalid");
    });
  });
});
