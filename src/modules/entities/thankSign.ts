export default (pivot) => {
  const thankSign = new Entity('thankSign')
  thankSign.setParent(pivot)
  thankSign.addComponentOrReplace(new Transform({
    position: new Vector3(8, 4.3, 11),
    rotation: new Quaternion(0, 0, 0, 0),
    scale: new Vector3(1, 1, 1)
  }) )
  const gltfThankSign = new GLTFShape("models/thankSign.glb")
  thankSign.addComponentOrReplace(gltfThankSign);

  engine.addEntity(thankSign)
  return thankSign
}
