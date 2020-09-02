export default (pivot) => {
  const ananasDeco = new Entity('ananasDeco')
  ananasDeco.setParent(pivot)
  ananasDeco.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    // rotation: Quaternion.Euler(0, 180, 0),
    // scale: new Vector3(0.7, 0.7, 0.7)
  }) )
  const gltfInfoSign = new GLTFShape("models/ananasDeco.glb")
  ananasDeco.addComponentOrReplace(gltfInfoSign);

  engine.addEntity(ananasDeco)
  return ananasDeco
}
