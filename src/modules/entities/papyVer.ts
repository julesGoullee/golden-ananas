export default (pivot) => {
  const papyVer = new Entity('papyVer')
  papyVer.setParent(pivot)
  papyVer.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1, 1, 1)
  }) )
  const gltf = new GLTFShape("models/papyVer.glb")
  papyVer.addComponentOrReplace(gltf);
  papyVer.addComponentOrReplace(new Animator() );

  [
    'papyArmatureAction',
    'papyScoreAction',
    'papyAnanascopeAction',
    'papyPositionLvl2Action',
    'papyPositionLvl3Action',
    // 'papyDonationAction'
  ].forEach(animationName => {

    const animState = new AnimationState(animationName)
    animState.speed = 1
    animState.looping = false
    papyVer.getComponent(Animator).addClip(animState)

  })

  engine.addEntity(papyVer)
  return papyVer
}
