export default () => {

  const canvas = new UICanvas()
  const timer = new UIText(canvas)
  timer.fontSize = 35
  timer.vAlign = 'bottom'
  timer.hAlign = 'center'
  timer.paddingBottom = 40
  timer.width = 20

  return timer

}
