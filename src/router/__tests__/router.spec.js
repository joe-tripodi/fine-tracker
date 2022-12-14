import { describe, expect, test } from "vitest";
import router from "../router";

describe("Router has correct routes", () => {
  test("has /home route", () => {
    let homeRoute = router.options.routes.filter(
      (route) => route.path == "/home"
    )[0];
    expect(homeRoute.path).toBe("/home");
    expect(homeRoute.name).toBe("home");
    expect(homeRoute.component()).toBeTruthy();
  });

  test("has /club-fines route", () => {
    let clubFinesRoute = router.options.routes.filter(
      (route) => route.path == "/clubfines"
    )[0];
    expect(clubFinesRoute.path).toBe("/clubfines");
    expect(clubFinesRoute.name).toBe("clubfines");
    expect(clubFinesRoute.component()).toBeTruthy();
  });

  test("has / path in the router itself", () => {
    let slashRoute = router.options.routes.filter(
      (route) => route.path == "/"
    )[0];
    expect(slashRoute.path).toBe("/");
    expect(slashRoute.name).toBe("root");
    expect(slashRoute.component()).toBeTruthy();
  });

  test("history has been set", () => {
    expect(router.options.history).toBeTruthy();
  });

  test("active class has been set to has-background-light", () => {
    expect(router.options.linkActiveClass).toBe("has-background-light");
  });

  test("it contains the route and component for playerfines", () => {
    let finesRoute = router.options.routes.filter(
      (route) => route.path == "/playerfines"
    )[0];
    expect(finesRoute.path).toBe("/playerfines");
    expect(finesRoute.name).toBe("playerfines");
    expect(finesRoute.component()).toBeTruthy();
  });

  test("it contains the route and component for statistics", () => {
    let statisticsRoute = router.options.routes.filter(
      (route) => route.path == "/statistics"
    )[0];
    expect(statisticsRoute.path).toBe("/statistics");
    expect(statisticsRoute.name).toBe("statistics");
    expect(statisticsRoute.component()).toBeTruthy();
  });

  test("it contains the route and component for Players", () => {
    let playersRoute = router.options.routes.filter(
      (route) => route.path == "/players"
    )[0];
    expect(playersRoute.path).toBe("/players");
    expect(playersRoute.name).toBe("players");
    expect(playersRoute.component()).toBeTruthy();
  });
});
