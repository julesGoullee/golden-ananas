export default (scene) => {

  const glasses = new Entity('glasses')
  engine.addEntity(glasses)
  glasses.setParent(scene)
  glasses.addComponentOrReplace(new Transform({
    position: new Vector3(8, 1.5, 8),
    rotation: new Quaternion(1, 0, 1, 0),
    scale: new Vector3(5, 5, 5)
  }))
  const gltfGlasses = new GLTFShape("models/glasses.glb");
// gltfGlasses.withCollisions = true
// gltfGlasses.visible = true
  glasses.addComponentOrReplace(gltfGlasses);

  return glasses
}
