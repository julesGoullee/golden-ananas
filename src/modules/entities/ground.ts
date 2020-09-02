export default (pivot) => {
  const ground = new Entity('ground')
  engine.addEntity(ground)
  ground.setParent(pivot)
  ground.addComponentOrReplace(new GLTFShape("models/FloorBaseGrass.glb"))
  ground.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    scale:  new Vector3(1.6, 0.0001, 1.6)
  }))
  return ground
}
