export default class Timer {

  canvas: UICanvas
  counter: UIText
  timerContainer: UIContainerStack
  isInit: boolean
  constructor(canvas) {

    this.canvas = canvas
    this.isInit = false

  }

  init(){

    this.isInit = true

    this.timerContainer = new UIContainerStack(this.canvas)
    this.timerContainer.visible = false

    this.timerContainer.adaptWidth = false
    this.timerContainer.adaptHeight = false
    this.timerContainer.width = 110
    this.timerContainer.height = 45
    this.timerContainer.color = Color4.White()
    this.timerContainer.hAlign = 'center'
    this.timerContainer.vAlign = 'top'
    this.timerContainer.stackOrientation = UIStackOrientation.HORIZONTAL

    this.counter = new UIText(this.canvas)
    this.counter.visible = false
    this.counter.color = Color4.Black()
    this.counter.fontSize = 35
    this.counter.positionY = 6.5
    this.counter.positionX = 11
    this.counter.vAlign = 'top'
    this.counter.hAlign = 'center'
    this.counter.width = 110

  }

  show(){
    log('show')

    if(!this.isInit){
      this.init()
    }

    this.canvas.visible = true
    this.timerContainer.visible = true
    this.counter.visible = true

  }

  setValue(value){
    log('setValue')

    if(!this.isInit){
      this.init()
    }

    this.counter.value = value

  }

  reset(){

    log('reset')
    if(!this.isInit){
      this.init()
    }

    this.canvas.visible = false
    this.timerContainer.visible = false
    this.counter.visible = false
    this.counter.value = ''

  }

}
