import utils from "../../../node_modules/decentraland-ecs-utils/index"
import * as Utils from "../utils"
import getButtonEndKey from "../entities/buttonEndKey"
import Level from "./Level";
import Config from "../../config/index"

export default class LevelTwo implements Level {
  camera: Camera
  pivot: Entity
  buttonStart: Entity
  buttonEndKey: Entity
  platforms: Entity[]
  platformsTimer: {}
  door: Entity
  onStart: Function
  onEnd: Function
  platformsDelay: number

  constructor(camera, pivot, buttonStart, platforms, door, onStart, onEnd) {

    this.camera = camera
    this.pivot = pivot
    this.buttonStart = buttonStart
    this.platforms = platforms
    this.platformsTimer = {}
    this.door = door
    this.onEnd = onEnd
    this.onStart = onStart

    this.platformsDelay = 1000;

    this.door.addComponentOrReplace(
      new OnPointerDown(() => {},{
        button: ActionButton.POINTER,
        hoverText: 'Locked. Find the key to open',
        distance: 8
      })
    )
    this.buttonEndKey = getButtonEndKey(this.pivot)

  }

  init(){

    this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(1, 1, 1), 0.5) )
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

    this.platforms[this.platforms.length -1].addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0.9, 0.9, 0.9), new Vector3(0, 0, 0) , 0.7) )

    this.buttonEndKey.addComponentOrReplace(
      new OnPointerDown(
        e => {

          this.buttonEndKey.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonEndKey.getComponent(Transform).scale, new Vector3(0, 0, 0), 0))
          engine.removeEntity(this.buttonEndKey)
          this.onEnd()

        }, {
          button: ActionButton.POINTER,
          hoverText: 'End',
          distance: 3
        })
    )

  }

  update(){

    this.platforms.slice(1, -1).forEach( (platform, i) => {

      if(this.camera.position.y > platform.getComponent(Transform).position.y + Config.userSize &&
        this.camera.position.y < this.platforms[i + 2].getComponent(Transform).position.y + Config.userSize && !this.platformsTimer[i]){

        this.platformsTimer[i] = Utils.setTimeout( () => {

          platform.addComponentOrReplace(new utils.MoveTransformComponent(
            platform.getComponent(Transform).position,
            new Vector3(platform.getComponent(Transform).position.x, -1, platform.getComponent(Transform).position.z),
            0.5, () => {

              delete this.platformsTimer[i]

            }) )

        }, this.platformsDelay)
      }

    });

  }

  reset(){

    Object.keys(this.platformsTimer).forEach( i => {

      this.platformsTimer[i].clearTimeout()
      delete this.platformsTimer[i]

    })

    this.platforms.slice(1).forEach( (platform, i) => {

      platform.addComponentOrReplace(new utils.ScaleTransformComponent(platform.getComponent(Transform).scale, new Vector3(0, 0, 0), 0.5, () => {

        platform.addComponentOrReplace(new utils.MoveTransformComponent(platform.getComponent(Transform).position, new Vector3(platform.getComponent(Transform).position.x, i + 2, platform.getComponent(Transform).position.z), 0.5) )

      }) )

    })

  }

}
