import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import HomeView from "../HomeView.vue";

const vuetify = createVuetify();

describe("Home View", () => {
  it("exists", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
