import utils from "../../../node_modules/decentraland-ecs-utils/index"
import getButtonEnd from "../entities/buttonEnd"
import Level from "./Level";

export default class LevelThree implements Level {
  pivot: Entity
  ananas: Entity
  buttonStart: Entity
  buttonEnd: Entity
  platforms: Entity[]
  onStart: Function
  onEnd: Function
  lastPlatformPosition: Vector3
  failing: boolean

  constructor(pivot, ananas, buttonStart, platforms, onStart, onEnd) {

    this.pivot = pivot
    this.ananas = ananas
    this.buttonStart = buttonStart
    this.platforms = platforms
    this.onEnd = onEnd
    this.onStart = onStart
    this.buttonEnd = getButtonEnd(this.pivot)
    this.lastPlatformPosition = this.platforms[this.platforms.length -1].getComponent(Transform).position.clone()
    this.failing = false

  }

  init() {

    this.ananas.addComponentOrReplace(new Transform({
      position: new Vector3(8, 0, 8),
    }) )

    this.ananas.addComponentOrReplace(new utils.ScaleTransformComponent(this.ananas.getComponent(Transform).scale, new Vector3(1, 1, 1), 4, () => {

      this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(1, 1, 1), 0.5) )
      this.pivot.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 36, 0) ) )

      this.buttonStart.addComponentOrReplace(
        new OnPointerDown(
          e => {

            this.buttonStart.getComponent(Animator).getClip('boutonAction').reset()
            this.buttonStart.getComponent(Animator).getClip('boutonAction').play()
            this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(0, 0, 0), 0.5, () => {

              this.start()
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

    }) )

  }

  start(){

    this.failing = true
    this.platforms.forEach( (platform, i) => this.fallDown(platform, i + 1) )

  }

  fallDown(platform, i){

    const position: Vector3 = platform.getComponent(Transform).position.clone()
    platform.addComponentOrReplace(new utils.ScaleTransformComponent(platform.getComponent(Transform).scale, new Vector3(0.9, 0.9, 0.9), 0.5) )

    platform.addComponentOrReplace(new utils.MoveTransformComponent(position, new Vector3(position.x, -1, position.z), i, () => {

      const transform = new Transform({
        position: new Vector3(position.x, this.lastPlatformPosition.y, position.z),
        scale: new Vector3(0, 0, 0)
      })
      // transform.lookAt(new Vector3(8, 5, 8) )
      platform.addComponentOrReplace(transform)

      if(this.failing){

        this.fallDown(platform, this.platforms.length)

      }

    }) )


  }

  update(){}

  reset(){

    this.failing = false

    this.platforms.forEach( (platform, i) => {
      platform.addComponentOrReplace(new utils.ScaleTransformComponent(platform.getComponent(Transform).scale, new Vector3(0.9, 0.9, 0.9), 0.5) )
      platform.addComponentOrReplace(new utils.MoveTransformComponent(platform.getComponent(Transform).position, new Vector3(platform.getComponent(Transform).position.x, i + 1, platform.getComponent(Transform).position.z), 0.5) )
    })

  }

}
