const playEvents = (store, events, callback) => {
  let _events = events.map(x => x)
    let start = new Date().getTime()

    let step = timestamp => {
      let now = new Date().getTime()
      let time = now - start
      
      let maxTime = 10000
      if (time < maxTime) {
        store.playTime = ~~ time
        window.requestAnimationFrame(step)
      } else {
        store.playTime = maxTime
        store.playing = false
        store.playend = true
      }

      if (_events.length > 0) {
        let firstEvent = _events[0]
        if (time > firstEvent.time) {
          _events.shift()
          console.log(firstEvent.data)
          callback(firstEvent)
        }
      }
    }

    window.requestAnimationFrame(step)
    store.playing = true
}

module.exports = {
  playEvents
}