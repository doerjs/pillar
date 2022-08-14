export function nextTick(handle) {
  setTimeout(() => {
    handle()
  }, 0)
}
