export default (pivot) => {
  const bat = new Entity('bat')
  const batOriginPosition = new Vector3(8, 1, 8)
  bat.addComponentOrReplace(new Transform({
    position:batOriginPosition,
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(0.35, 0.35, 0.35)
  }))
  const gltfBat = new GLTFShape("models/bat.glb")
  gltfBat.withCollisions = true
  gltfBat.visible = true
  bat.addComponentOrReplace(gltfBat);

  engine.addEntity(bat)
  bat.setParent(pivot)

  class SimpleRotate implements ISystem {
    update() {
      const transform = bat.getComponent(Transform)
      transform.rotate(Vector3.Up(), 1)
    }
  }

  engine.addSystem(new SimpleRotate())

  return bat

}
