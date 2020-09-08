export default (pivot) => {
  const ananasPlant = new Entity('ananasPlant')
  ananasPlant.setParent(pivot)
  ananasPlant.addComponentOrReplace(new Transform({
    position: new Vector3(0, 0, 0),
    scale: new Vector3(0, 0, 0),
  }) )
  const gltf = new GLTFShape("models/ananasPlantSmooth.glb")
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

  const clip = new AudioClip('sounds/ananasReduce.mp3')
  const source = new AudioSource(clip)
  ananasPlant.addComponent(source)

  engine.addEntity(ananasPlant)
  return ananasPlant
}
