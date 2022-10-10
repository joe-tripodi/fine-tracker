import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

describe('Home View', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeView);
    expect(wrapper.text()).toContain('Home')
  })
})
