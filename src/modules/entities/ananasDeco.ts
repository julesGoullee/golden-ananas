export default (scene) => {
  const ananasDeco = new Entity('ananasDeco')
  ananasDeco.setParent(scene)
  ananasDeco.addComponentOrReplace(new Transform({
    position: new Vector3(-10, 0, 8),
    // rotation: Quaternion.Euler(10, -50, 0),
    scale: new Vector3(0.7, 0.7, 0.7)
  }) )
  const gltfInfoSign = new GLTFShape("models/ananasDeco.glb")
  ananasDeco.addComponentOrReplace(gltfInfoSign);

  engine.addEntity(ananasDeco)
  return ananasDeco
}
