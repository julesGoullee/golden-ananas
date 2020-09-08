export default (pivot) => {
  const ananas = new Entity('ananas')
  ananas.addComponentOrReplace(new Transform({
    position: new Vector3(0, 0, 0),
    scale: new Vector3(0, 0, 0),
  }) )
  const gltfAnanas = new GLTFShape('models/ananas.glb')
  gltfAnanas.withCollisions = true
  gltfAnanas.visible = true
  ananas.addComponentOrReplace(gltfAnanas);

  const clip = new AudioClip('sounds/ananasGrow.mp3')
  const source = new AudioSource(clip)
  ananas.addComponent(source)

  engine.addEntity(ananas)
  ananas.setParent(pivot)
  return ananas
}
