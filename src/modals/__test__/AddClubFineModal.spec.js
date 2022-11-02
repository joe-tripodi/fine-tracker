/*
* @vitest-environment happy-dom
*/
import { describe, it, expect } from "vitest"
import { shallowMount, mount } from "@vue/test-utils"
import AddClubFineModal from "../AddClubFineModal.vue"

const Database = class {
  clubFines = [];

  async addClubFine(reason, amount){
    this.clubFines.push({reason: reason, amount: amount});
  }

  async clubFineExists(reason) {
    let filteredFines = this.clubFines.filter((fine) => fine.reason.toLowerCase() == reason.toLowerCase());
    return filteredFines.length > 0;
  }

  getAllClubFines() {
    return this.clubFines;
  }
}


describe("Add Club Fine Modal tests", () => {
  it("exists and can be mounted", ()=> {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    expect(wrapper.exists()).toBeTruthy();
  })

  it("has the correct title", () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    expect(wrapper.html()).toContain("Add Club Fine");
  })

  it("is inactive on mount", () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    const classes = wrapper.classes();
    expect(classes.find(elementClass => elementClass == "is-active")).toBeFalsy();
  })

  it("is active when isActive prop is set to true", async () => {
    const wrapper = mount(AddClubFineModal, {
      props: {
        isActive: true
      },
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });

    await wrapper.vm.$nextTick();

    const classes = wrapper.classes();
    expect(classes.find(elementClass => elementClass == "is-active")).toBeTruthy();
  })

  it("the is-active class is toggled when the prop changes",async () => {
    const wrapper = mount(AddClubFineModal, {
      props: {
        isActive: true
      },
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });

    wrapper.setProps({isActive: false});

    await wrapper.vm.$nextTick();

    const classes = wrapper.classes();
    expect(classes.find(elementClass => elementClass == "is-active")).toBeFalsy();

  })

})

describe("user input", () => {
  it("has input for a fine reason", () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    const reasonInput = wrapper.find("#reasonForFine");
    expect(reasonInput.exists()).toBeTruthy();
  })

  it("allows you to enter text into the fine reason field", async () => {
    const wrapper = mount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    const reasonInput = wrapper.find("#reasonForFine");
    await reasonInput.setValue("Late to training");

    expect(wrapper.find("#reasonForFine").element.value).toBe("Late to training");
  })

  it("has input for a fine amount", () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    const fineInput = wrapper.find("#fineAmount");
    expect(fineInput.exists()).toBeTruthy();
  })

  it("allows you to enter a value in the fine amount field", async () => {
    const wrapper = mount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    const fineInput = wrapper.find("#fineAmount");
    await fineInput.setValue("10");

    expect(wrapper.find("#fineAmount").element.value).toBe(10);
  })

  it("does not allow the user to enter alphanumeric characters", async () => {
    const wrapper = mount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    const fineInput = wrapper.find("#fineAmount");
    await fineInput.setValue("abcddf");

    expect(wrapper.find("#fineAmount").element.value).toBe("");
  })

})

describe("add button", () => {
  it("contains an add button", () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
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
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
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

  it("emits closeAddClubFineModal when pressed", async () => {
    const wrapper = shallowMount(AddClubFineModal,{
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      }
    });
    const cancelButton = wrapper.find(".cancel");
    await cancelButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("closeAddClubFineModal");
  })

  it("clears the text when cancel is pressed", async () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("A reason");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".cancel").trigger("click");

    expect(wrapper.find("input[type=text]").element.value).toBe("");
    expect(wrapper.find("input[type=number]").element.value).toBe("");

  })
})

describe("delete button (menu button)", () => {
  it("contains a delete button", () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    })

    expect(wrapper.find(".delete").exists()).toBeTruthy();
  })

  it("emits closeAddFineModal when pressed", async () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    })

    await wrapper.find(".delete").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("closeAddClubFineModal");
  })

  it("clears the text when cancel is pressed", async () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("A reason");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".delete").trigger("click");

    expect(wrapper.find("input[type=text]").element.value).toBe("");
    expect(wrapper.find("input[type=number]").element.value).toBe("");
  })
})

describe("add button", () => {
  it("contains an add button", () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: null,
        },
      },
    });
    expect(wrapper.find(".add").exists()).toBeTruthy();
  })

  it("emits closeAddClubFineModal when input is valid", async () => {

    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("A reason");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");
    
    expect(wrapper.emitted()).toHaveProperty("closeAddClubFineModal");
  })

  it("does not emit closeAddClubFineModal when reason input is invalid", async () => {

    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");
    expect(wrapper.emitted().closeAddClubFineModal).toBeFalsy();
  })

  it("does not emit closeAddClubFineModal when amount is invalid", async () => {

    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("A fine reason");
    await wrapper.find("input[type=number]").setValue(-10);
    await wrapper.find(".add").trigger("click");
    expect(wrapper.emitted().closeAddClubFineModal).toBeFalsy();
  })

  it("clears the form on valid input", async () => {
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: new Database(),
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("A reason");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");

    expect(wrapper.find("input[type=text]").element.value).toBe("");
    expect(wrapper.find("input[type=number]").element.value).toBe("");
  })

  it("adds a fine when given valid input", async () => {
    const database = new Database();
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: database,
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("Late to training");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");

    expect(database.getAllClubFines().length).toBeTruthy();
    expect(database.getAllClubFines()[0].reason).toBe("Late to training");
    expect(database.getAllClubFines()[0].amount).toBe(10);
  })

  it("does not add duplicate reasons", async () => {
    const database = new Database();
    const wrapper = shallowMount(AddClubFineModal, {
      global: {
        stubs: ["fa"],
        provide: {
          database: database,
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("Late to training");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");

    await wrapper.find("input[type=text]").setValue("Late to training");
    await wrapper.find("input[type=number]").setValue(10);
    await wrapper.find(".add").trigger("click");

    expect(database.getAllClubFines().length).toBe(1);
  })

})


