/*
* @vitest-environment happy-dom
*/
import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import ClubFines from '../ClubFines.vue'

const Database = class {
  clubFines = [
    {
      reason: "Late to training",
      amount: 5,
    },
    {
      reason: "Late to game",
      amount: 50
    },
  ]

  async getAllClubFines() {
    return this.clubFines;
  }
}

describe('Club Fines', () => {
  it('exists', () => {
    const wrapper = shallowMount(ClubFines, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });
    expect(wrapper.exists()).toBeTruthy();
  })

  it('renders a club fine with an amount', async () => {
    const wrapper = mount(ClubFines, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('Late to training');
    expect(wrapper.html()).toContain('$5');
  })

  it('renders multiple club fines with amounts', async () => {
    const wrapper = mount(ClubFines, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('Late to training');
    expect(wrapper.html()).toContain('$5');
    expect(wrapper.html()).toContain('Late to game')
    expect(wrapper.html()).toContain('$50');
  })

  it('can search the fines', async () => {
    const wrapper = mount(ClubFines, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.get("#search").setValue("training");
    expect(wrapper.html()).toContain("Late to training")
    expect(wrapper.html().includes("Late to game")).toBeFalsy();
  })

})

describe("Floating add button", () => {
  it("contains an add button", async () => {
    const wrapper = mount(ClubFines, {
      global: {
        provide: {
          database: new Database()
        },
        stubs: ["fa"]
      }
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".floating-add").exists()).toBeTruthy();
  })
})
