import { describe, it, expect } from 'vitest'

import { mount, shallowMount } from '@vue/test-utils'
import PlayersView from '../PlayersView.vue'

const Database = class {
  players = [
    {
      firstName: "Stefan",
      lastName: "Didone",
    },
    {
      firstName: "Joe",
      lastName: "Poll"
    },
  ]

  async getAllPlayers() {
    return this.players;
  }
}

describe("Players View", () => {
  it("exists", () => {
    const wrapper = shallowMount(PlayersView, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });
    expect(wrapper.exists()).toBe(true);
  })

  it("renders all players in the database", async () => {
    const wrapper = mount(PlayersView, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain("Stefan Didone");
    expect(wrapper.html()).toContain("Joe Poll");
  })

  it('can search the players', async () => {
    const wrapper = mount(PlayersView, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.get("#search").setValue("Stefan");
    expect(wrapper.html()).toContain("Stefan Didone")
    expect(wrapper.html().includes("Joe Poll")).toBeFalsy();
  })
})

describe("Floating add button", () => {
  it("contains an add button", async () => {
    const wrapper = mount(PlayersView, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find("#floating-add").exists()).toBeTruthy();
  })
})
