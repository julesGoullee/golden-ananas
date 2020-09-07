export default (pivot) => {
  const panneau = new Entity('panneau')
  panneau.setParent(pivot)
  panneau.addComponentOrReplace(new Transform({
    position: new Vector3(1.6, 0, 1.6),
    rotation: Quaternion.Euler(0, 45, 0),
  }) )
  const gltfPanneau = new GLTFShape("models/panneauScore.glb")
  gltfPanneau.withCollisions = true
  gltfPanneau.visible = true
  panneau.addComponentOrReplace(gltfPanneau);

  engine.addEntity(panneau)
  return panneau
}
