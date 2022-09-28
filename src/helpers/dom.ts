export function appendEl(el: HTMLElement, target: HTMLElement) {
  target.appendChild(el);
}

export function removeEl(el: HTMLElement, target: HTMLElement) {
  if (
    el &&
    target &&
    Array.prototype.find.call(target?.children, (v) => v === el)
  )
    target.removeChild(el);
}

export function preventDefault(evt: Event) {
  evt.preventDefault();
}
