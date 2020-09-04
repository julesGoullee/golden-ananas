import { Delay } from '../../node_modules/decentraland-ecs-utils/timer/component/delay'
import { Interval } from '../../node_modules/decentraland-ecs-utils/timer/component/interval'

export function setTimeout(cb, ms) {

  const ent = new Entity()
  engine.addEntity(ent)
  const delay = new Delay(ms, () => {
    cb()
    engine.removeEntity(ent)
  })
  ent.addComponent(delay)

  return {
    clearTimeout: (): void =>  {
      delay.setCallback(null)
    }
  }

}

export function setInterval(cb, ms) {

  const ent = new Entity()
  engine.addEntity(ent)
  const interval = new Interval(ms, () => {
    cb()
  })
  ent.addComponent(interval)

  return {
    clearInterval: (): void =>  {
      interval.setCallback(null)
      engine.removeEntity(ent)
    }
  }

}

