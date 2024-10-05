export function groupInX<T>(arr: T[], n = 3) {
  const result: T[][] = Array.from({ length: n }, () => [])

  for (let i = 0; i < arr.length; i++) {
    result[i % n].push(arr[i])
  }

  return result
}

export function determineOrientation(width: number, height: number) {
  const aspectRatio = (width / height).toFixed(2)

  let orientation: 'square' | 'landscape' | 'portrait' = 'square'

  if (width > height) {
    orientation = 'landscape'
  } else if (height > width) {
    orientation = 'portrait'
  }

  return {
    orientation,
    aspectRatio
  }
}
