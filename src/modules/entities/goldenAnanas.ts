export default (pivot) => {
  const goldenAnanas = new Entity('goldenAnanas')
  goldenAnanas.addComponentOrReplace(new Transform({
    position: new Vector3(0, 0, 0),
    scale: new Vector3(0, 0, 0),
    // position: new Vector3(0, 0.5, 0),
    // scale: new Vector3(0.1, 0.1, 0.1)
  }) )
  const gltfGoldenAnanas = new GLTFShape("models/goldananas.glb")
  gltfGoldenAnanas.withCollisions = true
  gltfGoldenAnanas.visible = true
  goldenAnanas.addComponentOrReplace(gltfGoldenAnanas);

  engine.addEntity(goldenAnanas)
  goldenAnanas.setParent(pivot)
  return goldenAnanas
}
