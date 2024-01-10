export const base64ToBytes = (base64: string) => {
  const binString = atob(base64)
  const uint8Array = new Uint8Array(binString.length)

  for (let i = 0; i < binString.length; i++) {
    const codePoint = binString.codePointAt(i)
    if (codePoint !== undefined) {
      uint8Array[i] = codePoint
    } else {
      throw new Error(`Unable to convert base64 to bytes: Invalid character at index ${i}`)
    }
  }
  return uint8Array
}
