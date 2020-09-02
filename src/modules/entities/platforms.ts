export default (pivot) => {
  const platforms = []

  const cloudCount: number = 10
  const rayon: number = 5.8

  for(let i = 1; i <= cloudCount; i ++){

    const platform = new Entity('platform' + i)
    const transform = new Transform({
      position: new Vector3(rayon * Math.cos((Math.PI * 2) / (cloudCount / i) ), i, rayon * Math.sin((Math.PI * 2) / (cloudCount / i) )),
      scale: new Vector3(0.9, 0.9, 0.9)
    })
    transform.lookAt(new Vector3(8, i, 8) )
    platform.setParent(pivot)
    platform.addComponentOrReplace(transform)
    const gltfCloud = new GLTFShape("models/cloud.glb")
    gltfCloud.visible = true
    platform.addComponentOrReplace(gltfCloud)
    engine.addEntity(platform)
    platforms.push(platform)

  }

  return platforms

}
