import { Delay } from '../../node_modules/decentraland-ecs-utils/timer/component/delay'
import { Interval } from '../../node_modules/decentraland-ecs-utils/timer/component/interval'

interface ITimeoutClean {
  clearTimeout(): void
}

export function setTimeout(cb: Function, ms: number): ITimeoutClean {

  const ent = new Entity()
  engine.addEntity(ent)
  const delay = new Delay(ms, () => {
    cb()
    engine.removeEntity(ent)
  })
  ent.addComponent(delay)

  return {
    clearTimeout() {
      delay.setCallback(null)
    }
  }

}

interface IIntervalClean {
  clearInterval(): void
}

export function setInterval(cb, ms: number): IIntervalClean {

  const ent = new Entity()
  engine.addEntity(ent)
  const interval = new Interval(ms, () => {
    cb()
  })
  ent.addComponent(interval)

  return {
    clearInterval() {
      interval.setCallback(null)
      engine.removeEntity(ent)
    }
  }

}

