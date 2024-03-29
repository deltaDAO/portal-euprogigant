import { render } from '@testing-library/react'
import NetworkName from './index'

describe('@shared/NetworkName', () => {
  it('renders without crashing', () => {
    render(<NetworkName networkId={1} />)
  })

  it('renders minimal', () => {
    render(<NetworkName networkId={1} minimal />)
  })

  it('renders Polygon', () => {
    render(<NetworkName networkId={137} />)
  })

  it('renders icon fallback', () => {
    render(<NetworkName networkId={99999} />)
  })
})
