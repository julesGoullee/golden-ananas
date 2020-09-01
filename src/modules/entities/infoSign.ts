export default (scene) => {
  const infoSign = new Entity('infoSign')
  infoSign.setParent(scene)
  infoSign.addComponentOrReplace(new Transform({
    position: new Vector3(14.8, 0, 1.2),
    rotation: Quaternion.Euler(10, -50, 0),
    scale: new Vector3(1, 1, 1)
  }) )
  const gltfInfoSign = new GLTFShape("models/mailsign.glb")
  infoSign.addComponentOrReplace(gltfInfoSign);

  engine.addEntity(infoSign)
  return infoSign
}
