import { describe, it, expect } from "vitest";

import { mount, shallowMount } from "@vue/test-utils";
import PlayersFines from "../PlayerFines.vue";
import { createVuetify } from "vuetify";
import FineCard from "../../components/FineCard.vue";

const vuetify = createVuetify();

const Database = class {
  players = [
    {
      firstName: "Stefan",
      lastName: "Didone",
      shirtNumber: 8,
      id: 2,
    },
    {
      firstName: "Joe",
      lastName: "Poll",
      shirtNumber: 3,
      id: 1,
    },
  ];

  fines = [
    {
      reason: "Late to training",
      playerId: 1,
      playerName: "Joe Poll",
      id: 1,
      amount: 10,
      doubleFactor: 0,
      dateCreated: new Date(),
      paid: true,
      void: false,
      credited: false,
    },
    {
      reason: "No thongs in the shower",
      id: 2,
      playerId: 1,
      playerName: "Joe Poll",
      amount: 10,
      doubleFactor: 0,
      dateCreated: new Date(),
      paid: false,
      void: false,
      credited: false,
    },
    {
      reason: "Late to gameday",
      playerId: 2,
      playerName: "Stefan Didone",
      id: 3,
      amount: 50,
      doubleFactor: 0,
      dateCreated: new Date(),
      paid: false,
      void: false,
      credited: false,
    },
  ];

  async getAllUnpaidFines() {
    return this.fines.filter((fine) => fine.paid == false);
  }

  async getAllFines() {
    return this.fines;
  }

  async getAllPaidFines() {
    return this.fines.filter((fine) => fine.paid == true);
  }

  async getAllPlayers() {
    return this.players;
  }

  async getAllClubFines() {
    return [];
  }

  async getAllPlayersNameAndIds() {
    return this.players;
  }
};

describe("Players Fines", () => {
  it("exists", () => {
    const wrapper = shallowMount(PlayersFines, {
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

  it("renders all unpaid fines in the database", async () => {
    const wrapper = mount(PlayersFines, {
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

    expect(wrapper.html()).toContain("No thongs in the shower");
    expect(wrapper.html()).toContain("$10");
    expect(wrapper.html()).toContain("Joe Poll");
    expect(wrapper.html()).toContain("Late to gameday");
    expect(wrapper.html()).toContain("$50");
    expect(wrapper.html()).toContain("Stefan Didone");
  });
});

describe("Floating add button", () => {
  it("contains an add button", async () => {
    const wrapper = mount(PlayersFines, {
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
