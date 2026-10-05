import { Component, lazy, Suspense } from 'react'
import LogisticsFlow from './LogisticsFlow'

const Logistics3D = lazy(() => import('./Logistics3D'))

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <LogisticsFlow /> : this.props.children
  }
}

// 3D scene is code-split (three.js is large) and the 2D version shows while it
// loads, or permanently if WebGL is unavailable or the 3D scene errors.
export default function HeroVisual() {
  if (!hasWebGL()) return <LogisticsFlow />
  return (
    <Boundary>
      <Suspense fallback={<LogisticsFlow />}>
        <Logistics3D />
      </Suspense>
    </Boundary>
  )
}
