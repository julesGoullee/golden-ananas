import utils from "../../../node_modules/decentraland-ecs-utils/index"

export default (scene, pivot) => {

  const camera = Camera.instance
  const pivotLocal = new Entity('buttonEndPivotLocal')
  pivotLocal.setParent(pivot)
  pivotLocal.addComponentOrReplace(new Transform({
    position: new Vector3(5, 10, 0),
    rotation: Quaternion.Euler(0, -90, 0),
    scale: new Vector3(1, 1, 1)
  }))
  class PivotRotate implements ISystem {
    update() {
      if(camera.position.y > 10){

        pivotLocal.addComponentOrReplace(
          new utils.RotateTransformComponent(pivotLocal.getComponent(Transform).rotation, Quaternion.Euler(0, -90, 0), 1)
        )

      } else {
        pivotLocal.getComponent(Transform).rotate(Vector3.Up(), 5)
      }
    }
  }
  engine.addEntity(pivotLocal)
  engine.addSystem(new PivotRotate())

  const buttonEnd = new Entity('buttonEnd')
  buttonEnd.setParent(pivotLocal)
  buttonEnd.addComponentOrReplace(new Animator())
  const animAction = new AnimationState('boutonAction')
  animAction.looping = false
  buttonEnd.getComponent(Animator).addClip(animAction)
  buttonEnd.addComponentOrReplace(
    new Transform({
      position: new Vector3(0, 0, 0)
    })
  )
  const gltfButton = new GLTFShape("models/bouton.glb")
  buttonEnd.addComponentOrReplace(gltfButton)
  engine.addEntity(buttonEnd)

  return buttonEnd

}
