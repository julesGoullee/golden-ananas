export default (scene) => {
  const fleche = new Entity('fleche')
  fleche.addComponentOrReplace(new Transform({
    position: new Vector3(0, 0, 4),
    rotation: new Quaternion(0, 0, 0, 0),
    scale: new Vector3(1, 1.3, 1)
  }) )
  const gltfFleche = new GLTFShape("models/fleche.glb")
  fleche.addComponentOrReplace(gltfFleche);

  engine.addEntity(fleche)
  fleche.setParent(scene)
  return fleche
}
