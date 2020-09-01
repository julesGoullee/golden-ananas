const scene = new Entity('scene')
engine.addEntity(scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)

export default scene
