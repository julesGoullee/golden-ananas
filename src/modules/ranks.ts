export default (panneau) => {

  const ranks = new Entity('ranks')
  ranks.setParent(panneau)
  const ranksText = new TextShape('')
  ranksText.font = new Font(Fonts.SanFrancisco_Semibold)
  ranksText.fontSize = 3
  ranksText.hTextAlign = 'left'
  ranksText.vTextAlign = 'top'

  ranks.addComponentOrReplace(
    new Transform({
      position: new Vector3(-1.5, 6, -0.2),
      rotation: new Quaternion(0, 0, 0, 0),
      scale: new Vector3(1, 1, 1)
    })
  )

  ranks.addComponentOrReplace(ranksText)
  engine.addEntity(ranks)

  return ranks

}
