export default (pivot) => {

  const lock = new Entity('lock')
  lock.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    rotation: Quaternion.Euler(0, 0, 0),
    scale: new Vector3(0, 0, 0)
  }) )

  const gltfLock = new GLTFShape("models/openDoor.glb")
  gltfLock.withCollisions = true
  gltfLock.visible = true
  lock.addComponentOrReplace(gltfLock);

  lock.addComponentOrReplace(new Animator());

  [
    'cubeDAction',
    'cubeGAction',
    'plancheAction',
    'porteAction',
    'porte2_colliderAction',
    'porte_colliderAction',
    'lockAction',
    'keyAction'
  ].forEach(animationName => {
    const animState = new AnimationState(animationName)
    animState.speed = 1
    animState.looping = false
    lock.getComponent(Animator).addClip(animState)

  })

  engine.addEntity(lock)
  lock.setParent(pivot)

  return lock
}
