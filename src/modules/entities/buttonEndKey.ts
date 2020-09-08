export default (pivot) => {

  const buttonEnd = new Entity('buttonEnd')
  buttonEnd.setParent(pivot)
  buttonEnd.addComponentOrReplace(
    new Transform({
      position: new Vector3(5, 11, 2),
      rotation: Quaternion.Euler(0, -125, 0),
      scale: new Vector3(0.5, 0.5, 0.5)
    })
  )
  const gltfButton = new GLTFShape('models/key.glb')
  buttonEnd.addComponentOrReplace(new Animator())

  const animNames = [
    'aileGAction',
    'aileDAction'
  ]

  animNames.forEach(animationName => {

    const animClip = new AnimationState(animationName)
    animClip.looping = true
    animClip.play()
    buttonEnd.getComponent(Animator).addClip(animClip)

  })

  buttonEnd.addComponentOrReplace(gltfButton)
  engine.addEntity(buttonEnd)

  return buttonEnd

}
