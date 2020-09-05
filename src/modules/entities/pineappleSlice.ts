export default (pivot) => {

  const pineappleSlice = new Entity('pineappleSlice')
  pineappleSlice.setParent(pivot)
  pineappleSlice.addComponentOrReplace(
    new Transform({
      position: new Vector3(5, 11, 1),
      // rotation: Quaternion.Euler(0, 0, 0),
      // scale: new Vector3(1, 1, 1)
    })
  )
  const gltf = new GLTFShape('models/ananasSlice.glb')
  gltf.withCollisions = false
  pineappleSlice.addComponentOrReplace(gltf)
  engine.addEntity(pineappleSlice)

  return pineappleSlice

}
