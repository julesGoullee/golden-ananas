export default (pivot) => {
  const panneau = new Entity('panneau')
  panneau.setParent(pivot)
  panneau.addComponentOrReplace(new Transform({
    position: new Vector3(2.4, 0, 2.4),
    rotation: new Quaternion(0, 0.4, 0, 1),
    scale: new Vector3(1, 1, 1)
  }) )
  const gltfPanneau = new GLTFShape("models/panneau.glb")
  gltfPanneau.withCollisions = true
  gltfPanneau.visible = true
  panneau.addComponentOrReplace(gltfPanneau);

  engine.addEntity(panneau)
  return panneau
}
