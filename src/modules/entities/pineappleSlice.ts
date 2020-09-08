export default (pivot) => {

  const pineappleSlice = new Entity('pineappleSlice')
  pineappleSlice.setParent(pivot)
  pineappleSlice.addComponentOrReplace(
    new Transform({
      position: new Vector3(5.5, 11, 1.1),
    })
  )
  const gltf = new GLTFShape('models/ananasSlice.glb')
  gltf.withCollisions = false

  const clip = new AudioClip('sounds/grabObj.mp3')
  const source = new AudioSource(clip)
  pineappleSlice.addComponent(source)

  pineappleSlice.addComponentOrReplace(gltf)
  engine.addEntity(pineappleSlice)

  return pineappleSlice

}
