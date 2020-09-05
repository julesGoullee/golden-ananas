import utils from "../../../node_modules/decentraland-ecs-utils/index"
import getButtonEnd from "../entities/buttonEnd"
import Level from "./Level";

export default class LevelOne implements Level {
  pivot: Entity
  ananas: Entity
  ananasPlant: Entity
  buttonStart: Entity
  buttonEnd: Entity
  platforms: Entity[]
  onStart: Function
  onEnd: Function

  constructor(pivot, ananas, ananasPlant, buttonStart, platforms, onStart, onEnd) {

    this.pivot = pivot
    this.ananas = ananas
    this.ananasPlant = ananasPlant
    this.buttonStart = buttonStart
    this.platforms = platforms
    this.onEnd = onEnd
    this.onStart = onStart
    this.buttonEnd = getButtonEnd(this.pivot)

  }

  init() {

    this.ananasPlant.addComponentOrReplace(new Transform({
      position: new Vector3(8, 0, 8),
      scale: new Vector3(0.5, 0.5, 0.5),
    }) )

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
          hoverText: 'Start',
          distance: 3
        }
      )
    )
    this.buttonEnd.addComponentOrReplace(
      new OnPointerDown(
        e => {

          this.buttonEnd.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonEnd.getComponent(Transform).scale, new Vector3(0, 0, 0), 0.5, () => {

            engine.removeEntity(this.buttonEnd)
            this.pivot.getComponent(utils.KeepRotatingComponent).stop()
            this.pivot.addComponentOrReplace(new utils.RotateTransformComponent(this.pivot.getComponent(Transform).rotation, Quaternion.Euler(0, 90, 0), 0.5) )

            this.onEnd()

          }))

        },
        {
          button: ActionButton.POINTER,
          hoverText: 'End',
          distance: 3
        }
      )
    )
  }

  update(){

    this.platforms.slice(1).map(platform => {

      if(platform.getComponent(Transform).scale.x === 0){
        platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(0.9, 0.9, 0.9), 0.7) )
      }

    })

  }

  reset(){

    this.platforms.slice(1).map(platform => {

      if(platform.getComponent(Transform).scale.x !== 0){

        platform.addComponentOrReplace(new utils.ScaleTransformComponent(platform.getComponent(Transform).scale, new Vector3(0, 0, 0), 0.5) )

      }

    })

  }

}
