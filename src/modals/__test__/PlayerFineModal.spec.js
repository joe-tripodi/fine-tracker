import { describe, it, expect } from "vitest"
import { shallowMount, mount } from "@vue/test-utils"
import PlayerFineModal from "../PlayerFineModal.vue"
import { createVuetify } from "vuetify";


const vuetify = createVuetify();

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
  ];

  players = [
    {
      firstName: "Stefan",
      lastName: "Didone",
      shirtNumber: 8,
      id: 2
    },
    {
      firstName: "Joe",
      lastName: "Poll",
      shirtNumber: 3,
      id: 1
    },
  ];

  async getAllPlayersNameAndIds(){
    return this.players;
  }

  async getAllClubFines(){
    return this.clubFines;
  }
}

describe("Create a player fine modal test", ()=> {
  it("exists and can be mounted", () => {
    const wrapper = mount(PlayerFineModal, {
      global: {
        provide: {
          database: new Database()
        },
        plugins: [vuetify]
      }
    });
    expect(wrapper.exists()).toBeTruthy();
  })
})