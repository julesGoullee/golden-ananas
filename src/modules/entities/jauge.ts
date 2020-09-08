export default (pivot) => {
  const jauge = new Entity('jauge')
  jauge.setParent(pivot)
  jauge.addComponentOrReplace(new Transform({
    position: new Vector3(8 + 6.55, 0.245, 8 + 6.49),
    scale: new Vector3(0, 0, 0)
  }) )
  const gltf = new GLTFShape("models/jauge.glb")
  jauge.addComponentOrReplace(gltf);

  engine.addEntity(jauge)
  return jauge
}
