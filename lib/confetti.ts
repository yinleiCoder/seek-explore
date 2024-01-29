import confetti from 'canvas-confetti'

// 庆典烟花
const end = Date.now() + 10 * 1000
export function fireSchoolPride() {
  const colors = ['#bb0000', '#FAEF5D']
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  })
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  })

  if (Date.now() < end) {
    requestAnimationFrame(fireSchoolPride)
  }
}
