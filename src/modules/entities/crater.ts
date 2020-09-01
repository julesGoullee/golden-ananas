export default (scene) => {

  const crater = new Entity('crater')
  engine.addEntity(crater)
  crater.setParent(scene)
  const transform3 = new Transform({
    position: new Vector3(8, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(4, 18, 4)
  })
  crater.addComponentOrReplace(transform3)
  const gltfShape2 = new GLTFShape("models/Crater_02/Crater_02.glb")
  gltfShape2.withCollisions = true
  gltfShape2.visible = true
  crater.addComponentOrReplace(gltfShape2)
  return crater

}
