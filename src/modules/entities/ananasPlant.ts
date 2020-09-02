export default (pivot) => {
  const ananasPlant = new Entity('ananasPlant')
  ananasPlant.setParent(pivot)
  ananasPlant.addComponentOrReplace(new Transform({
    position: new Vector3(0, 0, 0),
    scale: new Vector3(0, 0, 0),
  }) )
  const gltf = new GLTFShape("models/ananasPlant.glb")
  ananasPlant.addComponentOrReplace(gltf);

  engine.addEntity(ananasPlant)
  return ananasPlant
}
