export default (scene, pivot) => {
  const platforms = []

  const platform1 = new Entity('platform1')
  platform1.setParent(pivot)
  platform1.addComponentOrReplace(
    new Transform({
      position: new Vector3(6.2, 1, 0),
      scale: new Vector3(0.9, 0.9, 0.9)
    })
  )
  const gltfCloud1 = new GLTFShape("models/cloud.glb")
  gltfCloud1.visible = true
  platform1.addComponentOrReplace(gltfCloud1)
  engine.addEntity(platform1)
  platforms.push(platform1)

  const platform2 = new Entity('platform2')
  platform2.setParent(pivot)
  platform2.addComponentOrReplace(
    new Transform({
      position: new Vector3(4, 2,  -4.2),
      rotation: Quaternion.Euler(0, -20, 0),
      scale: new Vector3(0, 0, 0)
    })
  )
  const gltfCloud2 = new GLTFShape("models/cloud.glb")
  gltfCloud2.visible = false
  platform2.addComponentOrReplace(gltfCloud2)
  engine.addEntity(platform2)
  platforms.push(platform2)

  const platform3 = new Entity('platform3')
  platform3.setParent(pivot)
  platform3.addComponentOrReplace(
    new Transform({
      position: new Vector3(0, 3,  -6.3),
      scale: new Vector3(0, 0, 0)
    })
  )
  const gltfCloud3 = new GLTFShape("models/cloud.glb")
  gltfCloud3.visible = false
  platform3.addComponentOrReplace(gltfCloud3)
  engine.addEntity(platform3)
  platforms.push(platform3)

  const platform4 = new Entity('platform4')
  platform4.setParent(pivot)
  platform4.addComponentOrReplace(
    new Transform({
      position: new Vector3(-3.5, 4,  -4),
      scale: new Vector3(0, 0, 0)
    })
  )
  const gltfCloud4 = new GLTFShape("models/cloud.glb")
  gltfCloud4.visible = false
  platform4.addComponentOrReplace(gltfCloud4)
  engine.addEntity(platform4)
  platforms.push(platform4)

  const platform5 = new Entity('platform5')
  platform5.setParent(pivot)
  platform5.addComponentOrReplace(
    new Transform({
      position: new Vector3(-5, 5,  0),
      scale: new Vector3(0, 0, 0)
    })
  )
  const gltfCloud5 = new GLTFShape("models/cloud.glb")
  gltfCloud5.visible = false
  platform5.addComponentOrReplace(gltfCloud5)
  engine.addEntity(platform5)
  platforms.push(platform5)

  const platform6 = new Entity('platform6')
  platform6.setParent(pivot)
  platform6.addComponentOrReplace(
    new Transform({
      position: new Vector3(-3.5, 6,  4),
      scale: new Vector3(0, 0, 0)
    })
  )
  const gltfCloud6 = new GLTFShape("models/cloud.glb")
  gltfCloud6.visible = false
  platform6.addComponentOrReplace(gltfCloud6)
  engine.addEntity(platform6)
  platforms.push(platform6)

  const platform7 = new Entity('platform7')
  platform7.setParent(pivot)
  platform7.addComponentOrReplace(
    new Transform({
      position: new Vector3(0, 7,  6),
      scale: new Vector3(0, 0, 0)
    })
  )
  const gltfCloud7 = new GLTFShape("models/cloud.glb")
  gltfCloud7.visible = false
  platform7.addComponentOrReplace(gltfCloud7)
  engine.addEntity(platform7)
  platforms.push(platform7)

  const platform8 = new Entity('platform8')
  platform8.setParent(pivot)
  platform8.addComponentOrReplace(
    new Transform({
      position: new Vector3(4, 8,  4),
      scale: new Vector3(0, 0, 0)
    })
  )
  const gltfCloud8 = new GLTFShape("models/cloud.glb")
  gltfCloud8.visible = false
  platform8.addComponentOrReplace(gltfCloud8)
  engine.addEntity(platform8)
  platforms.push(platform8)

  const platform9 = new Entity('platform9')
  platform9.setParent(pivot)
  platform9.addComponentOrReplace(
    new Transform({
      position: new Vector3(6, 9,  0),
      scale: new Vector3(0, 0, 0)
    })
  )
  const gltfCloud9 = new GLTFShape("models/cloud.glb")
  gltfCloud9.visible = false
  platform9.addComponentOrReplace(gltfCloud9)
  engine.addEntity(platform9)
  platforms.push(platform9)

  return platforms

}
