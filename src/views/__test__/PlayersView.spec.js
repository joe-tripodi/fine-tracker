import { describe, it, expect } from "vitest";

import { mount, shallowMount } from "@vue/test-utils";
import PlayersView from "../PlayersView.vue";
import { createVuetify } from "vuetify";
import PlayerCard from "../../components/PlayerCard.vue";

const vuetify = createVuetify();

const Database = class {
  players = [
    {
      firstName: "Stefan",
      lastName: "Didone",
    },
    {
      firstName: "Joe",
      lastName: "Poll",
    },
  ];

  async getAllPlayers() {
    return this.players;
  }
};

describe("Players View", () => {
  it("exists", () => {
    const wrapper = shallowMount(PlayersView, {
      global: {
        provide: {
          database: new Database(),
        },
        stubs: ["fa"],
        plugins: [vuetify],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders all players in the database", async () => {
    const wrapper = mount(PlayersView, {
      global: {
        provide: {
          database: new Database(),
        },
        stubs: ["fa"],
        plugins: [vuetify],
      },
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain("S. Didone");
    expect(wrapper.html()).toContain("J. Poll");
  });
});

describe("Floating add button", () => {
  it("contains an add button", async () => {
    const wrapper = mount(PlayersView, {
      global: {
        provide: {
          database: new Database(),
        },
        stubs: ["fa"],
        plugins: [vuetify],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find("#floating-add").exists()).toBeTruthy();
  });
});
