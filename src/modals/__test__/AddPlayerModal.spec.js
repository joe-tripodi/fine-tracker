/*
* @vitest-environment happy-dom
*/
import { describe, it, expect } from "vitest"
import { shallowMount, mount } from "@vue/test-utils"
import AddPlayerModal from "../AddPlayerModal.vue"
import { createVuetify } from "vuetify";

const vuetify = createVuetify();
const Database = class {
  players = [];

  async addPlayer(firstName, lastName, shirtNumber){
    this.players.push({firstName: firstName, lastName: lastName, shirtNumber: shirtNumber});
  }

  async playerExists(shirtNumber) {
    let filteredFines = this.players.filter((player) => player.shirtNumber == shirtNumber);
    return filteredFines.length > 0;
  }

  getAllPlayers() {
    return this.players;
  }
}


describe("Add Player Modal tests", () => {
  it("exists and can be mounted", ()=> {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    expect(wrapper.exists()).toBeTruthy();
  })

  it("has the correct title", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    expect(wrapper.html()).toContain("Add Player");
  })

  it("is inactive on mount", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const classes = wrapper.classes();
    expect(classes.find(elementClass => elementClass == "is-active")).toBeFalsy();
  })

  it("is active when isActive prop is set to true", async () => {
    const wrapper = mount(AddPlayerModal, {
      props: {
        isActive: true
      },
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("is-active");
  })

  it("the is-active class is toggled when the prop changes", async() => {
    const wrapper = mount(AddPlayerModal, {
      props: {
        isActive: true
      },
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });

    wrapper.setProps({isActive: false});
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain("is-active");

  })

})

describe("user input", () => {
  it("has input for firstName reason", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const firstNameInput = wrapper.find("#firstName");
    expect(firstNameInput.exists()).toBeTruthy();
  })

  it("allows you to enter text into the first name field", async () => {
    const wrapper = mount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const firstNameInput = wrapper.find("#firstName");
    await firstNameInput.setValue("Stefan");

    expect(wrapper.find("#firstName").element.value).toBe("Stefan");
  })

  it("has input for a lastName", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const lastNameInput = wrapper.find("#lastName");
    expect(lastNameInput.exists()).toBeTruthy();
  })

  it("allows you to enter a lastName", async () => {
    const wrapper = mount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const lastNameInput = wrapper.find("#lastName");
    await lastNameInput.setValue("Didone");

    expect(wrapper.find("#lastName").element.value).toBe("Didone");
  })

  it("has input for a shirt number", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const shirtNumberInput = wrapper.find("#shirtNumber");
    expect(shirtNumberInput.exists()).toBeTruthy();
  })

  it("allows you to enter a value in the fine amount field", async () => {
    const wrapper = mount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const shirtNumberInput = wrapper.find("#shirtNumber");
    await shirtNumberInput.setValue("8");

    expect(wrapper.find("#shirtNumber").element.value).toBe(8);
  })

  it("does not allow the user to enter alphanumeric characters", async () => {
    const wrapper = mount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const shirtNumberInput = wrapper.find("#shirtNumber");
    await shirtNumberInput.setValue("abcddf");

    expect(wrapper.find("#shirtNumber").element.value).toBe("");
  })

})

describe("add button", () => {
  it("contains an add button", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const buttons = wrapper.findAll("button");
    let containsAddButton = false;
    buttons.forEach((button) => {
      if(button.html().includes("Add")){
        containsAddButton = true;
      }
    })
    expect(containsAddButton).toBeTruthy();
  })
})

describe("cancel button", () => {
  it("exists", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    const buttons = wrapper.findAll("button");
    let containsAddButton = false;
    buttons.forEach((button) => {
      if(button.html().includes("Cancel")){
        containsAddButton = true;
      }
    })
  
    expect(containsAddButton).toBeTruthy();
  })

  it("emits closeAddPlayerModal when pressed", async () => {
    const wrapper = shallowMount(AddPlayerModal,{
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      }
    });
    const cancelButton = wrapper.find(".cancel");
    await cancelButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("closeAddPlayerModal");
    expect(wrapper.emitted().closeAddPlayerModal[0][0]).toBeFalsy();
  })

  it("clears the text when cancel is pressed", async () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[type=text]").setValue("Stefan");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".cancel").trigger("click");

    expect(wrapper.find("input[type=text]").element.value).toBe("");
    expect(wrapper.find("input[type=number]").element.value).toBe("");

  })
})

describe("delete button (menu button)", () => {
  it("contains a delete button", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    })

    expect(wrapper.find(".delete").exists()).toBeTruthy();
  })

  it("emits closeAddFineModal when pressed", async () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    })

    await wrapper.find(".delete").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("closeAddPlayerModal");
    expect(wrapper.emitted().closeAddPlayerModal[0][0]).toBeFalsy();
  })

  it("clears the text when cancel is pressed", async () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[id=firstName]").setValue("Stefan");
    await wrapper.find("input[id=lastName]").setValue("Didone");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".delete").trigger("click");

    expect(wrapper.find("input[id=firstName]").element.value).toBe("");
    expect(wrapper.find("input[id=lastName]").element.value).toBe("");
    expect(wrapper.find("input[type=number]").element.value).toBe("");
  })
})


describe("add button", () => {
  it("contains an add button", () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
        plugins: [vuetify]
      },
    });
    expect(wrapper.find(".add").exists()).toBeTruthy();
  })

  it("emits closeAddPlayerModal when input is valid", async () => {

    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[id=firstName]").setValue("Stefan");
    await wrapper.find("input[id=lastName]").setValue("Didone");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");
    
    expect(wrapper.emitted()).toHaveProperty("closeAddPlayerModal");
    expect(wrapper.emitted().closeAddPlayerModal[0]).toBeTruthy()
  })

  it("does not emit closeAddPlayerModal when firstName input is invalid", async () => {

    const wrapper = mount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[id=firstName]").setValue("");
    await wrapper.find("input[id=lastName]").setValue("Didone");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");
    expect(wrapper.emitted().closeAddPlayerModal).toBeFalsy();
  })

  it("does not emit closeAddPlayerModal when lastName input is invalid", async () => {

    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[id=firstName]").setValue("Stefan");
    await wrapper.find("input[id=lastName]").setValue("");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");
    expect(wrapper.emitted().closeAddPlayerModal).toBeFalsy();
  })

  it("does not emit closeAddPlayerModal when shirt number is invalid", async () => {

    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[id=firstName]").setValue("Stefan");
    await wrapper.find("input[id=lastName]").setValue("Didone");
    await wrapper.find("input[type=number]").setValue(-10);
    await wrapper.find(".add").trigger("click");
    expect(wrapper.emitted().closeAddPlayerModal).toBeFalsy();
  })

  it("clears the form on valid input", async () => {
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[id=firstName]").setValue("Stefan");
    await wrapper.find("input[id=lastName]").setValue("Didone");
    await wrapper.find("input[type=number]").setValue(8);
    await wrapper.find(".add").trigger("click");

    expect(wrapper.find("input[id=firstName]").element.value).toBe("");
    expect(wrapper.find("input[id=lastName]").element.value).toBe("");
    expect(wrapper.find("input[type=number]").element.value).toBe("");
  })

  it("adds a fine when given valid input", async () => {
    const database = new Database();
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: database,
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[id=firstName]").setValue("Stefan");
    await wrapper.find("input[id=lastName]").setValue("Didone");
    await wrapper.find("input[type=number]").setValue(8);
    await wrapper.find(".add").trigger("click");

    expect(database.getAllPlayers().length).toBeTruthy();
    expect(database.getAllPlayers()[0].firstName).toBe("Stefan");
    expect(database.getAllPlayers()[0].lastName).toBe("Didone");
    expect(database.getAllPlayers()[0].shirtNumber).toBe(8);
  })

  it("does not add duplicate reasons", async () => {
    const database = new Database();
    const wrapper = shallowMount(AddPlayerModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: database,
        },
        plugins: [vuetify]
      },
    });

    await wrapper.find("input[id=firstName]").setValue("Stefan");
    await wrapper.find("input[id=lastName]").setValue("Didone");
    await wrapper.find("input[type=number]").setValue(8);
    await wrapper.find(".add").trigger("click");

    await wrapper.find("input[id=firstName]").setValue("Stefan");
    await wrapper.find("input[id=lastName]").setValue("Didone");
    await wrapper.find("input[type=number]").setValue(8);
    await wrapper.find(".add").trigger("click");

    expect(database.getAllPlayers().length).toBe(1);
  })

})


