export default (pivot) => {
  const donationBox = new Entity('donationBox')
  donationBox.setParent(pivot)
  donationBox.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1, 1, 1)
  }) )
  const gltf = new GLTFShape("models/donationBox.glb")
  donationBox.addComponentOrReplace(gltf);
  donationBox.addComponentOrReplace(new Animator() );

  [
    'donationBoxAction.001',
  ].forEach(animationName => {

    const animState = new AnimationState(animationName)
    animState.speed = 1
    animState.looping = false
    donationBox.getComponent(Animator).addClip(animState)

  })
  donationBox.getComponent(Animator).getClip('donationBoxAction').play()

  engine.addEntity(donationBox)
  return donationBox
}
