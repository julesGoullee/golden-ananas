export default (pivot) => {

  const donationProgressList = []

  for(let i = 0; i < 4; i++){

    const donationProgress = new Entity(`donationProgress${i}`)
    donationProgress.setParent(pivot)

    const ranksText = new TextShape('...')
    ranksText.font = new Font(Fonts.SanFrancisco_Semibold)
    ranksText.fontSize = 4
    ranksText.hTextAlign = 'right'
    ranksText.vTextAlign = 'top'
    ranksText.color = Color3.Gray()

    donationProgress.addComponentOrReplace(ranksText)
    engine.addEntity(donationProgress)
    donationProgressList.push(donationProgress)

  }

  const l = 0.87
  const h = 4.3
  donationProgressList[0].addComponentOrReplace(
    new Transform({
      position: new Vector3(8 + 6.55, h, 8 + 6.49 - l),
      rotation: Quaternion.Euler(0, 0, 0),
    })
  )
  donationProgressList[1].addComponentOrReplace(
    new Transform({
      position: new Vector3(8 + 6.55, h, 8 + 6.49 + l),
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  donationProgressList[2].addComponentOrReplace(
    new Transform({
      position: new Vector3(8 + 6.55 + l, h, 8 + 6.49),
      rotation: Quaternion.Euler(0, -90, 0),
    })
  )
  donationProgressList[3].addComponentOrReplace(
    new Transform({
      position: new Vector3(8 + 6.55 - l, h, 8 + 6.49),
      rotation: Quaternion.Euler(0, 90, 0),
    })
  )
  return donationProgressList

}
