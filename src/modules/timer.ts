export default class Timer {

  canvas: UICanvas
  counter: UIText
  timerContainer: UIContainerStack

  constructor() {

    this.canvas = new UICanvas()
    this.canvas.visible = false

    this.timerContainer = new UIContainerStack(this.canvas)
    this.timerContainer.visible = false

    this.timerContainer.adaptWidth = false
    this.timerContainer.adaptHeight = false
    this.timerContainer.width = 110
    this.timerContainer.height = 45
    // this.timerContainer.positionY = 100
    // this.timerContainer.positionX = 10
    this.timerContainer.color = Color4.White()
    this.timerContainer.hAlign = 'center'
    this.timerContainer.vAlign = 'top'
    this.timerContainer.stackOrientation = UIStackOrientation.HORIZONTAL

    this.counter = new UIText(this.canvas)
    this.counter.color = Color4.Black()
    this.counter.fontSize = 35
    // this.counter.value = 'caca'
    this.counter.positionY = 2
    this.counter.positionX = 10
    this.counter.vAlign = 'top'
    // this.counter.hAlign = 'center'
    // this.counter.width = 110

  }

  show(){

    this.canvas.visible = true
    this.timerContainer.visible = true
    this.counter.visible = true

  }

  setValue(value){

    this.counter.value = value

  }

  reset(){

    this.canvas.visible = false
    this.timerContainer.visible = false
    this.counter.visible = false
    this.counter.value = ''

  }

}
