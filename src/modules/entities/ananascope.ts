export default (pivot) => {
  const ananascope = new Entity('ananascope')
  ananascope.setParent(pivot)
  ananascope.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1, 1, 1)
  }) )
  const gltf = new GLTFShape("models/ananascope.glb")
  gltf.isPointerBlocker = false

  ananascope.addComponentOrReplace(gltf);
  ananascope.addComponentOrReplace(new Animator() );

  [
    'ananascopeAction',
    'ananascopePositionLvl3Action',
    'ananascopePositionLv4Action',
    'ananascopeDonationAction'
  ].forEach(animationName => {

    const animState = new AnimationState(animationName)
    animState.speed = 1
    animState.looping = false
    ananascope.getComponent(Animator).addClip(animState)

  })

  engine.addEntity(ananascope)
  return ananascope
}
