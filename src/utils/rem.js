function htRem () {
  var ww = document.documentElement.clientWidth
  if (ww > 1440) {
    ww = 1440
  }
  document.documentElement.style.fontSize = 100 * ww / 1440 + 'px'
}
htRem()

window.onresize = function () {
  htRem()
}
