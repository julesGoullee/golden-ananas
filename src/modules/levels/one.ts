import scene from "../scene"
import utils from "../../../node_modules/decentraland-ecs-utils/index"
import getButtonEnd from "../entities/buttonEnd"
import Level from "./Level";

export default class LevelOne implements Level {
  pivot: Entity
  buttonStart: Entity
  buttonEnd: Entity
  platforms: Entity[]
  onStart: Function
  onEnd: Function

  constructor(pivot, buttonStart, platforms, onStart, onEnd) {

    this.pivot = pivot
    this.buttonStart = buttonStart
    this.platforms = platforms
    this.onEnd = onEnd
    this.onStart = onStart
    this.buttonEnd = getButtonEnd(scene, this.pivot)

  }

  init() {

    this.pivot.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 45, 0)))

    this.buttonStart.addComponentOrReplace(
      new OnPointerDown(
        e => {

          this.buttonStart.getComponent(Animator).getClip('boutonAction').reset()
          this.buttonStart.getComponent(Animator).getClip('boutonAction').play()
          this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(0, 0, 0), 0.5, () => {

            this.onStart()

          }))

        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Click to start',
          distance: 5
        }
      )
    )
    this.buttonEnd.addComponentOrReplace(
      new OnPointerDown(
        e => {

          this.buttonEnd.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonEnd.getComponent(Transform).scale, new Vector3(0, 0, 0), 0.5, () => {

            this.pivot.getComponent(utils.KeepRotatingComponent).stop()
            this.platforms.slice(1, -1).map(platform => {

              platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(1, 1, 1), new Vector3(0, 0, 0), 0.7, () => {

                platform.getComponent(GLTFShape).visible = false

              }))

            })
            this.onEnd()

          }))

        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Click to finish!',
          distance: 4
        }
      )
    )
  }

  update(){

    this.platforms[0].getComponent(GLTFShape).visible = true
    this.platforms.slice(1).map(platform => {

      if(platform.getComponent(Transform).scale.x === 0){
        platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(1, 1, 1), 0.7) )
      }
      platform.getComponent(GLTFShape).visible = true
    })

  }

  reset(){

    this.platforms.slice(1).map(platform => {

      if(platform.getComponent(Transform).scale.x === 1){

        platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(1, 1, 1), new Vector3(0, 0, 0), 0.5, () => {
          platform.getComponent(GLTFShape).visible = false

        }) )

      } else if(platform.getComponent(Transform).scale.x === 0){

        platform.getComponent(GLTFShape).visible = false

      }

    })

  }

}
