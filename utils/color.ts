export const randomColor = (r: number = 256, g: number = 256, b: number = 256) => {
  const rColor = Math.floor(Math.random() * r)
  const gColor = Math.floor(Math.random() * g)
  const bColor = Math.floor(Math.random() * b)
  const randomColor = `rgb(${rColor}, ${gColor}, ${bColor})`
  return randomColor
}
