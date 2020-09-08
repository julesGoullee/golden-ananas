import utils from "../../../node_modules/decentraland-ecs-utils/index"
import getPineappleSlice from "../entities/pineappleSlice"
import Level from "./Level";

export default class LevelThree implements Level {
  scene: Entity
  pivot: Entity
  ananas: Entity
  buttonStart: Entity
  pineappleSlice: Entity
  platforms: Entity[]
  onStart: Function
  onEnd: Function
  lastPlatformPosition: Vector3
  failing: boolean

  constructor(scene, pivot, ananas, buttonStart, platforms, onStart, onEnd) {

    this.scene = scene
    this.pivot = pivot
    this.ananas = ananas
    this.buttonStart = buttonStart
    this.platforms = platforms
    this.onEnd = onEnd
    this.onStart = onStart
    this.pineappleSlice = getPineappleSlice(this.scene)
    this.lastPlatformPosition = this.platforms[this.platforms.length -1].getComponent(Transform).position
    this.failing = false

  }

  init() {

    this.pivot.addComponentOrReplace(new utils.RotateTransformComponent(this.pivot.getComponent(Transform).rotation, Quaternion.Euler(0, 90, 0), 0.5) )
    this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(1, 1, 1), 0.5) )
    this.pineappleSlice.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 90, 0) ) )

    this.buttonStart.addComponentOrReplace(
      new OnPointerDown(
        e => {

          this.buttonStart.getComponent(Animator).getClip('boutonAction').reset()
          this.buttonStart.getComponent(Animator).getClip('boutonAction').play()
          this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(0, 0, 0), 0.5, () => {

            this.onStart()
            this.start()

          }))

        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Start',
          distance: 3
        }
      )
    )

  }

  start(){

    this.pivot.addComponentOrReplace(new utils.KeepRotatingComponent(Quaternion.Euler(0, 36, 0) ) )

    const shape = new utils.TriggerBoxShape(new Vector3(1.4, 2, 0.3), new Vector3(0, 1.1, 0) )

    this.pineappleSlice.addComponentOrReplace(

      new utils.TriggerComponent(
        shape,
        0, 0, null, null,
        () => {

          this.onEnd()

        },
        () => {},
        false
      )
    )

    this.failing = true
    this.platforms.forEach( (platform, i) => this.fallDown(platform, i + 1) )

  }

  fallDown(platform, i){

    const position: Vector3 = platform.getComponent(Transform).position
    platform.addComponentOrReplace(new utils.ScaleTransformComponent(platform.getComponent(Transform).scale, new Vector3(0.9, 0.9, 0.9), 0.5) )

    platform.addComponentOrReplace(new utils.MoveTransformComponent(position, new Vector3(position.x, -1, position.z), i, () => {

      if(this.failing){

        const transform = new Transform({
          position: new Vector3(position.x, this.lastPlatformPosition.y, position.z),
          scale: new Vector3(0, 0, 0)
        })
        // transform.lookAt(new Vector3(8, 5, 8) )
        platform.addComponentOrReplace(transform)

        this.fallDown(platform, this.platforms.length)

      }

    }) )


  }

  update(){}

  reset(){

    this.failing = false
    this.pivot.getComponent(utils.KeepRotatingComponent).stop()
    this.pivot.addComponentOrReplace(new utils.RotateTransformComponent(this.pivot.getComponent(Transform).rotation, Quaternion.Euler(0, 90, 0), 0.5) )

    this.platforms.forEach( (platform, i) => {

      if(i === 0) {

        platform.addComponentOrReplace(new utils.ScaleTransformComponent(platform.getComponent(Transform).scale, new Vector3(0.9, 0.9, 0.9), 0.5) )

      } else {

        platform.addComponentOrReplace(new utils.ScaleTransformComponent(platform.getComponent(Transform).scale, new Vector3(0, 0, 0), 0) )

      }

      platform.addComponentOrReplace(new utils.MoveTransformComponent(platform.getComponent(Transform).position, new Vector3(platform.getComponent(Transform).position.x, i + 1, platform.getComponent(Transform).position.z), 0.5) )

    })

  }

}
