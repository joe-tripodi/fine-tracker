/*
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ClubFine from "../ClubFine.vue";

describe("Club Fines", () => {
  it("renders the fine reason and amount", () => {
    const wrapper = shallowMount(ClubFine, {
      props: {
        fine: {
          reason: "Late to training",
          amount: 10,
        },
      },
    });
    expect(wrapper.html()).toContain("Late to training");
    expect(wrapper.html()).toContain(10);
  });
});
