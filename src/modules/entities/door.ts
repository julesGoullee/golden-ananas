export default (pivot) => {
  // const door = new Entity('door')
  // door.addComponentOrReplace(new Transform({
  //   position: new Vector3(8, 0, 8),
  //   rotation: Quaternion.Euler(0, 0, 0),
  //   scale: new Vector3(1, 1, 1)
  // }) )
  // const gltfDoor = new GLTFShape("models/porte.glb")
  // // gltfDoor.withCollisions = false
  // // gltfDoor.visible = false
  // door.addComponentOrReplace(gltfDoor);
  //
  // engine.addEntity(door)
  // door.setParent(scene)

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

  const speed1 = 1
  lock.addComponentOrReplace(new Animator());

  [
    'porte_colliderAction',
    'porteAction',
    'porte2_colliderAction',
    'plancheAction',
    'cubeAction2',
    'cubeAction',
    'keyAction.005',
    'lockAction1',
    'lockAction2',
    'keyAction',
  ].forEach(animationName => {
    const animState = new AnimationState(animationName)
    animState.speed = speed1
    animState.looping = false
    lock.getComponent(Animator).addClip(animState)

  })

  engine.addEntity(lock)
  lock.setParent(pivot)

  return lock
}
