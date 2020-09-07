export default (pivot) => {
  const jauge = new Entity('jauge')
  jauge.setParent(pivot)
  jauge.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1, 1, 1)
  }) )
  const gltf = new GLTFShape("models/jauge.glb")
  jauge.addComponentOrReplace(gltf);
  jauge.addComponentOrReplace(new Animator() );

  engine.addEntity(jauge)
  return jauge
}
