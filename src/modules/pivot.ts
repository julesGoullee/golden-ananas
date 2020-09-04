export default (scene) => {

  const pivot = new Entity('pivot')
  pivot.setParent(scene)
  pivot.addComponentOrReplace(new Transform({
    position: new Vector3(8, 0, 8),
    rotation: Quaternion.Euler(0, 90, 0)
  }))

  engine.addEntity(pivot)

  return pivot
}
