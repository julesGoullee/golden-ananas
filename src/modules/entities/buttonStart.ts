import utils from "../../../node_modules/decentraland-ecs-utils/index"
import Config from "../../config/index";

export default (pivot) => {

  const camera = Camera.instance

  const pivotLocal = new Entity('buttonStartPivotLocal')
  pivotLocal.setParent(pivot)
  pivotLocal.addComponentOrReplace(new Transform({
    position: new Vector3(5, 1.3, -1),
    rotation: new Quaternion(0, 1, 0, 1),
    scale: new Vector3(1, 1, 1)
  }))

  class PivotRotate implements ISystem {
    update() {

      if(camera.position.y > Config.userSize && camera.position.y < Config.userSize * 2){

        pivotLocal.addComponentOrReplace(
          new utils.RotateTransformComponent(pivotLocal.getComponent(Transform).rotation, new Quaternion(0, 1, 0, -0.5), 1)
        )

      } else {
        let transform = pivotLocal.getComponent(Transform)
        transform.rotate(Vector3.Up(), 5)
      }
    }

  }
  engine.addEntity(pivotLocal)
  engine.addSystem(new PivotRotate())

  const buttonStart = new Entity('buttonStart')
  buttonStart.setParent(pivotLocal)
  buttonStart.addComponentOrReplace(new Animator())
  const animAction = new AnimationState('boutonAction')
  animAction.looping = false
  buttonStart.getComponent(Animator).addClip(animAction)

  buttonStart.addComponentOrReplace(
    new Transform({
      position: new Vector3(0, 1, 0)
    })
  )
  const gltfButton = new GLTFShape("models/bouton.glb")
  buttonStart.addComponentOrReplace(gltfButton)
  engine.addEntity(buttonStart)

  return buttonStart
}
