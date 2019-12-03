const player = document.querySelector('.player')
const video = player.querySelector('.viewer')

const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.player__fullscreen')

let isClicking = false

function togglePlay(e) {
  if (video.paused) {
    video.play()
    toggle.innerHTML = '&#9613;&#9613;'
  } else {
    toggle.innerHTML = '&#9658;'
    video.pause()
  }
}

function handleFwdOrBk(e) {
  video.currentTime = Math.ceil(
    video.currentTime + parseInt(this.dataset.skip, 10)
  )
}

function moveProgressBar(e) {
  progressBar.style.flexBasis = (this.currentTime / this.duration) * 100 + '%'
}

function handleRanges(e) {
  if (isClicking) {
    video[this.name] = this.value
  }
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

function handleFullscreen(e) {
  player.classList.toggle('fullscreen')
}

toggle.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', moveProgressBar)

skipButtons.forEach(btn => {
  btn.addEventListener('click', handleFwdOrBk)
})

ranges.forEach(range => {
  range.addEventListener('mousedown', () => (isClicking = true))
  range.addEventListener('mouseup', () => (isClicking = false))
  range.addEventListener('mousemove', handleRanges)
})

progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', () => (isClicking = true))
progress.addEventListener('mouseup', () => (isClicking = false))
progress.addEventListener('mouseout', () => (isClicking = false))
progress.addEventListener('mousemove', e => isClicking && scrub(e))

fullscreen.addEventListener('click', handleFullscreen)