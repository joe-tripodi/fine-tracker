/*
* @vitest-environment happy-dom
*/
import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import FineCard from "../FineCard.vue"
import { createVuetify } from "vuetify";

const vuetify = createVuetify();

describe("Player Card", () => {
  it("renders the fine reason, amount and player name", async () => {
    const wrapper = mount(FineCard, {
      props: {
        fine: {
          reason: "Late to training",
          playerId: 1,
          playerName: "Joe Poll",
          id: 1,
          amount: 10,
          doubleFactor: 0,
          dateCreated: new Date(),
          paid: false,
          void: false,
          credited: false,
        },
      },
      global: {
        plugins: [vuetify]
      }
    });

    expect(wrapper.html()).toContain("Late to training");
    expect(wrapper.html()).toContain("$10");
    expect(wrapper.html()).toContain("Joe Poll");
  })
})
