export default (scene, panneau) => {

  const ranks = new Entity('ranks')
  ranks.setParent(panneau)
  const ranksText = new TextShape('')
  ranksText.fontSize = 4
  ranksText.hTextAlign = 'left'
  ranksText.vTextAlign = 'top'

  ranks.addComponentOrReplace(
    new Transform({
      position: new Vector3(-2, 7, -0.5),
      rotation: new Quaternion(0, 0, 0, 0),
      scale: new Vector3(1, 1, 1)
    })
  )

  ranks.addComponentOrReplace(ranksText)
  engine.addEntity(ranks)

  return ranks

}
