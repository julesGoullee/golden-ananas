export default () => {

  const canvas = new UICanvas()
  const score = new UIText(canvas)
  score.fontSize = 35
  score.vAlign = 'top'
  score.hAlign = 'left'
  score.paddingLeft = 200

  return score

}
