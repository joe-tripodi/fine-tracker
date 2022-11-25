/*
* @vitest-environment happy-dom
*/
import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import PlayerCard from "../PlayerCard.vue"
import { createVuetify } from "vuetify";

const vuetify = createVuetify();

describe("Player Card", () => {
  it("renders the first, last name and shirt number", async () => {
    const wrapper = mount(PlayerCard, {
      props: {
        player: {
          firstName: "Stefan",
          lastName: "Didone",
          shirtNumber: 6
        }
      },
      global: {
        plugins: [vuetify]
      }
    });

    expect(wrapper.html()).toContain("S. Didone");
    expect(wrapper.html()).toContain("#6");
  })
})
