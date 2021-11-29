/* eslint-disable jest/expect-expect */
import { render } from '@testing-library/vue'
import BaseButton from './BaseButton.vue'

describe('BaseButton.vue', () => {
  it('Renders the BaseButton.vue component', () => {
    const { getByText } = render(BaseButton)
    // Get by text will throw if there is no text, so there is
    // no need to add expect() check
    getByText('BaseButton')
  })
})
