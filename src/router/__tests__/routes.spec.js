import { describe, expect, test } from "vitest";
import { routes } from "@/router/router";

describe("Router has correct routes", () => {
  test("has / route", () => {
    expect(routes.filter((route) => route.path == "/").length).toBeGreaterThan(
      0
    );
  });

  test("has /home route", () => {
    expect(
      routes.filter((route) => route.path == "/home").length
    ).toBeGreaterThan(0);
  });
});
