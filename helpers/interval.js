function withInterval(callback, interval) {
  let lastRun = 0

  function animate() {
    requestAnimationFrame(animate)

    const currentTime = Date.now()
    if (currentTime - lastRun > interval) {
      lastRun = currentTime
      callback()
    }
  }

  animate()
}