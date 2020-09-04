export default (pivot) => {
  const ananasPlant = new Entity('ananasPlant')
  ananasPlant.setParent(pivot)
  ananasPlant.addComponentOrReplace(new Transform({
    position: new Vector3(0, 0, 0),
    scale: new Vector3(0, 0, 0),
  }) )
  const gltf = new GLTFShape("models/ananasPlant.glb")
  ananasPlant.addComponentOrReplace(gltf);
  ananasPlant.addComponentOrReplace(new Animator());

  [
    'vibrateAction',
    'feuillesAction',
    'tigeAction',
    'reduceAction',
  ].forEach(animationName => {
    const animState = new AnimationState(animationName)
    animState.speed = 1
    animState.looping = false
    ananasPlant.getComponent(Animator).addClip(animState)

  })

  engine.addEntity(ananasPlant)
  return ananasPlant
}
