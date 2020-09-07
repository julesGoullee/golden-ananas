import utils from "../../../node_modules/decentraland-ecs-utils/index"
import Config from "../../config/index";

export default (pivot) => {

  const buttonStart = new Entity('buttonStart')
  buttonStart.setParent(pivot)
  buttonStart.addComponentOrReplace(new Animator() )
  const animAction = new AnimationState('buttonAction')
  animAction.looping = false
  buttonStart.getComponent(Animator).addClip(animAction)

  buttonStart.addComponentOrReplace(
    new Transform({
      position: new Vector3(4, 2, 4),
      rotation: Quaternion.Euler(0, -30, 0),
      scale: new Vector3(0, 0, 0)
    })
  )

  const gltfButton = new GLTFShape("models/bouton.glb")
  buttonStart.addComponentOrReplace(gltfButton)
  engine.addEntity(buttonStart)
  buttonStart.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 120, 0)))

  const camera = Camera.instance

  class PivotRotate implements ISystem {

    update() {

      if(camera.position.y > Config.userSize && camera.position.y < Config.userSize * 2){

        if(buttonStart.hasComponent(utils.KeepRotatingComponent) ){

          buttonStart.getComponent(utils.KeepRotatingComponent).stop()
          buttonStart.removeComponent(utils.KeepRotatingComponent)
          buttonStart.addComponentOrReplace(new utils.RotateTransformComponent(buttonStart.getComponent(Transform).rotation, Quaternion.Euler(0, -30, 0), 0.5) )

        }

      } else {

        buttonStart.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 120, 0) ) )

      }
    }

  }

  engine.addSystem(new PivotRotate())

  return buttonStart
}
