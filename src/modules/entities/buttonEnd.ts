import utils from "../../../node_modules/decentraland-ecs-utils/index"

export default (pivot) => {

  const buttonEnd = new Entity('buttonEnd')
  buttonEnd.setParent(pivot)
  buttonEnd.addComponentOrReplace(new Animator() )
  const animAction = new AnimationState('buttonAction')
  animAction.looping = false
  buttonEnd.getComponent(Animator).addClip(animAction)
  buttonEnd.addComponentOrReplace(
    new Transform({
      position: new Vector3(5, 11, 1.5),
      rotation: Quaternion.Euler(0, -30, 0)
    })
  )
  const gltfButton = new GLTFShape("models/bouton.glb")
  buttonEnd.addComponentOrReplace(gltfButton)
  engine.addEntity(buttonEnd)

  buttonEnd.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 120, 0) ) )
  const camera = Camera.instance

  class PivotRotate implements ISystem {

    update() {

      if(camera.position.y > 10){

        if(buttonEnd.hasComponent(utils.KeepRotatingComponent) ){

          buttonEnd.getComponent(utils.KeepRotatingComponent).stop()
          buttonEnd.removeComponent(utils.KeepRotatingComponent)
          buttonEnd.addComponentOrReplace(new utils.RotateTransformComponent(buttonEnd.getComponent(Transform).rotation, Quaternion.Euler(0, -30, 0), 0.5) )

        }

      } else {

        buttonEnd.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 120, 0) ) )

      }

    }

  }

  engine.addSystem(new PivotRotate())

  return buttonEnd

}
