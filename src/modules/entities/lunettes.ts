export default (pivot) => {
  const lunettes = new Entity('lunettes')
  lunettes.setParent(pivot)
  lunettes.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1, 1, 1)
  }) )
  const gltf = new GLTFShape("models/lunettes.glb")
  gltf.isPointerBlocker = false
  lunettes.addComponentOrReplace(gltf);
  lunettes.addComponentOrReplace(new Animator() );

  [
    'lunettesRotateAction.001',
  ].forEach(animationName => {

    const animState = new AnimationState(animationName)
    animState.speed = 1
    animState.looping = true
    lunettes.getComponent(Animator).addClip(animState)

  })

  engine.addEntity(lunettes)
  return lunettes
}
