import utils from "../node_modules/decentraland-ecs-utils/index"
import Config from "./config/index"

import scene from "./modules/scene"
import CheckRanks from "./modules/checkRanks"
import getRanks from "./modules/ranks"
import getPivot from "./modules/pivot"
import getTimer from "./modules/timer"
import getScore from "./modules/score"
import { getPlayerScores, submitScore } from "./modules/contract"
import getGround from "./modules/entities/ground"
import getPlatform from "./modules/entities/platforms"
import getInfoSign from "./modules/entities/infoSign"
import getPanneau from "./modules/entities/panneau"
import getAnanas from "./modules/entities/ananas"
import getGoldenAnanas from "./modules/entities/goldenAnanas"
import getDoor from "./modules/entities/door"
import getThankSign from "./modules/entities/thankSign"
import getButtonStart from "./modules/entities/buttonStart"
import getAnanasDeco from "./modules/entities/ananasDeco"

import Level from "./modules/levels/Level";
import LevelOne from "./modules/levels/one"
import LevelTwo from "./modules/levels/two";

class Game {

  camera: Camera

  pivot: Entity
  timer: UIText
  score: UIText
  time: number
  scoreLevel: number
  interval: NodeJS.Timeout
  isPlaying: boolean
  isAnanasOpen: boolean
  isDoorOpen: boolean
  isFinishLvl1: boolean
  isFinishLvl2: boolean
  isSubmitScoreLvl1: boolean
  isSubmitScoreLvl2: boolean

  ground: Entity
  infoSign: Entity
  goldenAnanas: Entity
  door: Entity
  panneau: Entity
  ranks: Entity
  checkRanks: CheckRanks

  buttonStart: Entity
  platforms: Entity[]
  currentLevel: Level
  level1: LevelOne
  level2: LevelTwo

  constructor() {

    this.camera = Camera.instance
    this.timer = getTimer()
    this.score = getScore()

    this.time = 1
    this.interval = null
    this.isPlaying = false
    this.isAnanasOpen = false
    this.isDoorOpen = false
    this.isFinishLvl1 = false
    this.isFinishLvl2 = false
    this.isSubmitScoreLvl1 = false
    this.isSubmitScoreLvl2 = false

    // Global entities
    this.ground = getGround(scene)
    this.infoSign = getInfoSign(scene)
    this.pivot = getPivot(scene)
    this.goldenAnanas = getGoldenAnanas(scene, this.pivot)

    // Panneau
    this.panneau = getPanneau(scene)
    this.ranks = getRanks(scene, this.panneau)
    this.checkRanks = new CheckRanks(this.ranks.getComponent(TextShape) )
    engine.addSystem(this.checkRanks)

    this.panneau.addComponentOrReplace(
      new OnPointerDown(
        e => {
          this.checkRanks.refreshData()
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Refresh Ranks',
          distance: 8
        }
      )
    )

    // Levels
    getPlayerScores()
      .then( (resScore: any) => {

        this.buttonStart = getButtonStart(scene, this.pivot)
        this.platforms = getPlatform(scene, this.pivot)
        // if(resScore.levels[0] === 0){
        //
        //   log('Load level 1')
        //   this.startLevel1()
        //
        // } else if(resScore.levels[1] === 0){

          log('Load level 2')
          this.isAnanasOpen = true
          this.isFinishLvl1 = true
          this.startLevel2()

        // }

      }).catch(error => {

      log(error.toString() )
      this.buttonStart = getButtonStart(scene, this.pivot)
      this.platforms = getPlatform(scene, this.pivot)
      this.startLevel1()

    })

    // this.isAnanasOpen = true
    // this.isFinishLvl1 = true
    // this.startLevel2()

    engine.addSystem(this)

  }

  update() {

    if( (this.camera.position.x < 0 || this.camera.position.z < 0 ||
      this.camera.position.x > 18 || this.camera.position.z > 18) && !this.isFinishLvl1 && !this.isFinishLvl1){

      log('showCloud')
      this.showCloud()

    } else if(this.camera.position.y < Config.userSize){

      if(this.isPlaying){

        this.currentLevel.reset()
        this.reset()

      }

    } else if(this.isPlaying){

      this.currentLevel.update()

    } else if(!this.isFinishLvl1){

      this.hideCloud()

    }

  }

  showCloud(){

    this.platforms[0].getComponent(GLTFShape).visible = true
    this.platforms.slice(1).map(platform => {

      if(platform.getComponent(Transform).scale.x === 0){
        platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(1, 1, 1), 0.7) )
      }
      platform.getComponent(GLTFShape).visible = true
    })

  }

  hideCloud(){

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

  reset(){

    if(!this.isPlaying){
      return
    }

    this.isPlaying = false

    if(this.interval){
      clearInterval(this.interval)
    }

    this.timer.value = ''
    this.score.value = ''

    this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(1, 1, 1), 3))

  }

  start(){

    if(this.isPlaying){
      return
    }

    if(this.interval){
      clearInterval(this.interval)
    }

    this.time = 0
    this.timer.value = '0'
    this.score.value = ''

    this.interval = setInterval( () => {

      this.time += 0.01
      this.timer.value = this.time.toFixed(2)

    }, 10)

    this.showCloud()

    this.isPlaying = true

  }

  startLevel1(){

    this.level1 = new LevelOne(this.pivot, this.buttonStart, this.platforms, () => this.start(), () => this.finishLevel1())
    this.level1.init()
    this.currentLevel = this.level1

  }

  finishLevel1(){

    if(!this.isPlaying || this.isFinishLvl1){
      return
    }

    this.isAnanasOpen = true
    this.isFinishLvl1 = true
    this.scoreLevel = parseFloat((this.time).toFixed(2))
    this.reset()

    this.score.value = `Congrats! You done this first level in ${this.scoreLevel} seconds`

    if(!this.isSubmitScoreLvl1 && (this.checkRanks.scores.levels[0] == 0 || this.checkRanks.scores.levels[0] > this.scoreLevel) ){
      this.isSubmitScoreLvl1 = true

      submitScore(0, parseInt( (this.scoreLevel * 100).toString(), 10) ).then(res => {})

    }

    this.startLevel2()

  }

  startLevel2(){

    // this.door = getDoor(scene)
    const ananasDeco = getAnanasDeco(scene)
    const ananas = getAnanas(scene)
    this.goldenAnanas.addComponentOrReplace(new utils.MoveTransformComponent(new Vector3(0, 7, 0), new Vector3(0, 0.5, 0), 3))
    this.goldenAnanas.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(1, 1, 1), new Vector3(0.1, 0.1, 0.1), 3, () => {

      ananas.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(1, 1, 1), 4))
      // this.door.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(1, 1, 1), 4, () => {
      //
      //   this.level2 = new LevelTwo(this.camera, this.pivot, this.buttonStart, this.platforms, this.door, () => this.start(), () => this.finishLevel2() )
      //   this.level2.init()
      //   this.currentLevel = this.level2
      //
      // }))

    }))

  }

  finishLevel2(){

    if (!this.isPlaying || this.isFinishLvl2) {
      return
    }

    this.isFinishLvl2 = true
    this.scoreLevel = parseFloat((this.time).toFixed(2))
    this.reset()
    this.score.value = `Congrats! You done the second level in ${this.scoreLevel} seconds`

    this.door.addComponentOrReplace(
      new OnPointerDown(
        e => {

          if(!this.isDoorOpen){

            [
              'porte_colliderAction',
              'porteAction',
              'porte2_colliderAction',
              'plancheAction',
              'cubeAction2',
              'cubeAction',
              'keyAction.005',
              'lockAction1',
              'lockAction2',
              'keyAction',
            ].forEach(animationName => {

              this.door.getComponent(Animator).getClip(animationName).reset()
              this.door.getComponent(Animator).getClip(animationName).play()

            })
            this.isDoorOpen = true

            const thanksSign = getThankSign(scene)
            thanksSign.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(1, 1, 1), 3))
            thanksSign.addComponentOrReplace(new utils.MoveTransformComponent(new Vector3(8, -10, 11), thanksSign.getComponent(Transform).position, 3) )

            this.goldenAnanas.addComponentOrReplace(
              new OnPointerDown(
                e => {

                  if(!this.isSubmitScoreLvl2 && (this.checkRanks.scores.levels[1] == 0 || this.checkRanks.scores.levels[1] > this.scoreLevel)){

                    this.isSubmitScoreLvl2 = true

                    submitScore(1, (this.time * 100).toFixed(0) ).then(res => {})

                  }

                },
                {
                  button: ActionButton.POINTER,
                  hoverText: 'Submit your score and became contributor!',
                  distance: 8
                }
              )
            )

          }

        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Unlock!',
          distance: 8
        }
      )
    )
  }

}

new Game()
