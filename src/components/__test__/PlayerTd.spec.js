/*
* @vitest-environment happy-dom
*/
import { describe, it, expect } from "vitest"
import {shallowMount } from "@vue/test-utils"
import PlayerTd from "../PlayerTd.vue"


describe("Player Td", () => {
  it("renders the first and last name", () => {
    const wrapper = shallowMount(PlayerTd, {
      props: {
        player: {
          firstName: "Stefan",
          lastName: "Didone"
        }
      }
    });
    expect(wrapper.html()).toContain("Stefan");
    expect(wrapper.html()).toContain("Didone");
  })
})
