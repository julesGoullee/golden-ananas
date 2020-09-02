
export default (pivot) => {
  const fire = new Entity('fire')
  engine.addEntity(fire)
  fire.setParent(pivot)
  fire.addComponentOrReplace(new GLTFShape("models/Fireplace.glb"))
  fire.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 7.5)
  }))

  const fire1 = new Entity('fire1')
  engine.addEntity(fire1)
  fire1.setParent(pivot)
  fire1.addComponentOrReplace(new GLTFShape("models/Fireplace.glb"))
  fire1.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8.5)
  }))
  return fire
}
