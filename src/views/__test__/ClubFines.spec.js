import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ClubFines from '../ClubFines.vue'

describe('Club Fines', () => {
  it('exists', () => {
    const wrapper = mount(ClubFines);
    expect(wrapper.exists()).toBe(true);
  })

  it('contains a header', () => {
    const wrapper = mount(ClubFines);
    wrapper.get("h1");
  })
})
