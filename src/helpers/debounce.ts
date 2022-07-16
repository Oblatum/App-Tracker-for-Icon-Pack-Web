export function debounce(func: Function, delay = 300) {
  let timer: number | ReturnType<typeof setTimeout> = 0
  return function (this: Function) {
    let waiting = false
    if (!timer) {
      func.apply(this, arguments)
    } else {
      waiting = true
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = 0
    }, delay)
    if (waiting) {
      setTimeout(() => {
        if (!timer) {
          func.apply(this, arguments)
        }
      }, delay)
    }
  }
}