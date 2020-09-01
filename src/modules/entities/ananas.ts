export default (scene) => {
  const ananas = new Entity('ananas')
  ananas.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(0, 0, 0),
  }) )
  const gltfAnanas = new GLTFShape("models/ananas.glb")
  gltfAnanas.withCollisions = true
  gltfAnanas.visible = true
  ananas.addComponentOrReplace(gltfAnanas);

  engine.addEntity(ananas)
  ananas.setParent(scene)
  return ananas
}
