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

  constructor(pivot, ananas, buttonStart, platforms, onStart, onEnd) {

    this.pivot = pivot
    this.ananas = ananas
    this.buttonStart = buttonStart
    this.platforms = platforms
    this.onEnd = onEnd
    this.onStart = onStart
    this.buttonEnd = getButtonEnd(this.pivot)

  }

  init() {

    this.ananas.addComponentOrReplace(new Transform({
      position: new Vector3(8, 0, 8),
    }) )
    this.ananas.addComponentOrReplace(new utils.ScaleTransformComponent(this.ananas.getComponent(Transform).scale, new Vector3(1, 1, 1), 4, () => {

    }) )


  }

  update(){}

  reset(){}

}
