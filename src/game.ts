import utils from "../node_modules/decentraland-ecs-utils/index"
import * as ui from '../node_modules/@dcl/ui-utils/index'
import { PromptStyles, ButtonStyles, Dialog } from "../node_modules/@dcl/ui-utils/utils/types"
import Config from "./config/index"

import * as Utils from "./modules/utils"
import scene from "./modules/scene"
import Scores from "./modules/scores"
import Timer from "./modules/timer"
import getRanks from "./modules/ranks"
import getPivot from "./modules/pivot"
import getGround from "./modules/entities/ground"
import getPlatform from "./modules/entities/platforms"
import getInfoSign from "./modules/entities/infoSign"
import getPanneau from "./modules/entities/panneau"
import getAnanas from "./modules/entities/ananas"
import getGoldenAnanas from "./modules/entities/goldenAnanas"
import getDoor from "./modules/entities/door"
import getButtonStart from "./modules/entities/buttonStart"
import getAnanasDeco from "./modules/entities/ananasDeco"
import getAnanasPlant from "./modules/entities/ananasPlant"
import getPapyVer from "./modules/entities/papyVer"

import Level from "./modules/levels/Level";
import LevelOne from "./modules/levels/one"
import LevelTwo from "./modules/levels/two";
import LevelThree from "./modules/levels/three";

class Game {

  camera: Camera

  pivot: Entity
  timer: Timer
  time: number
  scoreLevel: number
  interval: any
  sawWelcomeMessage: boolean
  isPlaying: boolean
  isDoorOpen: boolean
  isFinishLvl1: boolean
  isFinishLvl2: boolean
  isFinishLvl3: boolean

  ground: Entity
  infoSign: Entity
  goldenAnanas: Entity
  ananasPlant: Entity
  ananas: Entity
  ananasDecoIndoor: Entity
  door: Entity
  papyVer: Entity
  panneau: Entity
  ranks: Entity
  scores: Scores

  buttonStart: Entity
  platforms: Entity[]
  currentLevel: Level
  level1: LevelOne
  level2: LevelTwo
  level3: LevelThree

  constructor() {

    this.camera = Camera.instance

    this.time = 1
    this.interval = null
    this.sawWelcomeMessage = true
    this.isPlaying = false
    this.isDoorOpen = false
    this.isFinishLvl1 = false
    this.isFinishLvl2 = false
    this.isFinishLvl3 = false
    this.platforms = []

    // Global entities
    this.ground = getGround(scene)
    this.infoSign = getInfoSign(scene)
    this.pivot = getPivot(scene)
    this.ananas = getAnanas(scene)

    // Panneau
    this.panneau = getPanneau(scene)
    this.ranks = getRanks(this.panneau)
    const userScores = new Entity('userScores')
    userScores.setParent(scene)
    this.scores = new Scores(this.ranks.getComponent(TextShape), userScores)

    this.panneau.addComponentOrReplace(
      new OnPointerDown(
        e => {
          this.scores.refreshTopRanks()
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Refresh Ranks',
          distance: 6
        }
      )
    )

    // Levels
    Promise.all([
      this.scores.refreshTopRanks(),
      this.scores.getPlayerScores().then( (resScore: any) => {

        this.buttonStart = getButtonStart(this.pivot)
        this.platforms = getPlatform(this.pivot)
        this.timer = new Timer()

        if(resScore.levels[0] === 0){

          log('Load level 1')
          this.sawWelcomeMessage = false
          this.startLevel1()

        } else if(resScore.levels[1] === 0){

          log('Load level 2')
          this.isFinishLvl1 = true
          this.startLevel2()

        } else if(resScore.levels[2] === 0){

          log('Load level 3')
          this.isFinishLvl1 = true
          this.isFinishLvl2 = true
          this.startLevel3()

        }

      })

    ]).catch(error => {

      log(error.toString() )
      this.buttonStart = getButtonStart(this.pivot)
      this.platforms = getPlatform(this.pivot)
      this.timer = new Timer()
      this.startLevel1()

    })

    engine.addSystem(this)

  }

  update() {

    if( (this.camera.position.x < 0 || this.camera.position.z < 0 ||
      this.camera.position.x > 18 || this.camera.position.z > 18) && !this.isFinishLvl1 && !this.isFinishLvl2){

      this.showCloud()

    } else if(this.camera.position.y < Config.userSize && this.isPlaying){

      this.currentLevel.reset()
      this.reset()
      this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(1, 1, 1), 3))

    } else if(this.isPlaying){

      this.currentLevel.update()

    } else {

      this.hideCloud()

      if(!this.sawWelcomeMessage){

        this.sawWelcomeMessage = true;
        const prompt = new ui.CustomPrompt(PromptStyles.DARKLARGE, 500, 400)
        prompt.addText('Welcome to the Golden Ananas Challenge!', 0, 140, Color4.White(), 20)
        const content = prompt.addText(`Your goal is to retrieve the holy pineapple as
quickly as possible by using the platforms available
to you! 

So ready?
Get on the first platform and click on the button to
start playing.`, -140, -50)
        content.text.hTextAlign = 'left'
        prompt.addButton(
          `Go!`,
          0,
          -150,
          () => {
            log('Yes')
            prompt.close()
          },
          ButtonStyles.E
        )

      }

    }

  }

  showCloud(){

    if(this.platforms.length === 0){
      return
    }
    log('showCloud')
    this.platforms[0].getComponent(GLTFShape).visible = true
    this.platforms.slice(1).map(platform => {

      if(platform.getComponent(Transform).scale.x === 0){
        platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(0.9, 0.9, 0.9), 0.7) )
      }
      platform.getComponent(GLTFShape).visible = true
      // platform.getComponent(Transform).lookAt(this.camera.position)
    })

  }

  hideCloud(){
    if(this.platforms.length === 0){
      return
    }
    log('hideCloud')
    this.platforms.slice(1).map(platform => {

      if(platform.getComponent(Transform).scale.x === 0.9){

        platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0.9, 0.9, 0.9), new Vector3(0, 0, 0), 0.5, () => {
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
      this.interval.clearInterval()
    }

    this.timer.reset()

  }

  start(){

    if(this.isPlaying){
      return
    }

    if(this.interval){
      this.interval.clearInterval()
    }

    this.time = 0
    this.timer.setValue('')
    this.timer.show()

    this.interval = Utils.setInterval( () => {

      this.time += 0.01
      this.timer.setValue(this.time.toFixed(2) )

    }, 10)

    this.showCloud()

    this.isPlaying = true

  }

  startLevel1(){

    if(!this.ananasPlant){
      this.ananasPlant = getAnanasPlant(scene)
    }

    if(!this.goldenAnanas){

      this.goldenAnanas = getGoldenAnanas(this.pivot)

    }

    this.goldenAnanas.addComponentOrReplace(new Transform({
      position: new Vector3(0, 8, 0),
      scale: new Vector3(3, 3, 3)
    }) )

    this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(1, 1, 1), 0.5) )

    this.level1 = new LevelOne(this.pivot, this.ananas, this.ananasPlant, this.buttonStart, this.platforms, () => this.start(), () => this.finishLevel1())
    this.level1.init()
    this.currentLevel = this.level1

  }

  finishLevel1(){

    if(!this.isPlaying || this.isFinishLvl1){
      return
    }

    this.isFinishLvl1 = true
    this.scoreLevel = parseFloat((this.time).toFixed(2))
    this.reset()
    movePlayerTo({ x: 8, y: 0, z: 0 }, { x: 8, y: 2, z: 8 })
    this.ananasPlant.getComponent(Animator).getClip('vibrateAction').play()

    const dialogWindow = new ui.DialogWindow({
      path: 'https://res.cloudinary.com/dp7csktyw/image/upload/v1599254946/dialogAnanas_epfecz.png',
      offsetX: 100,
      offsetY: -20
    }, true)
    const NPCTalk: Dialog[] = [
      {
        text: `${this.scoreLevel} seconds!
Wow! What an impressive
performance!`,
      },
      {
        text: 'Do you want to save your progression?',
        isQuestion: true,
        labelE: {
          label: 'Ok'
        },
        labelF: {
          label: 'No'
        },
        ifPressE: 2,
        ifPressF: 2,
        triggeredByE: () => this.scores.setScoreForLevel(0, this.scoreLevel, true),
        triggeredByF: () => this.scores.setScoreForLevel(0, this.scoreLevel, false)
      },
      {
        text: `I didn't see much crazy
jumper since a while now...`,
      },
      {
        text: `I feel it.. it’s... I absolutely
need to meet you.`,
      },
      {
        text: `Head up, go grab the key
and meet me in my
ananhouse.`,
        isEndOfDialog: true,
        triggeredByNext: () => {
          this.startLevel2()
        },
      }
    ]

    dialogWindow.openDialogWindow(NPCTalk, 0)

  }

  startLevel2() {

    if(!this.door){

      this.door = getDoor(scene)

    }

    if(this.ananasPlant){

      this.ananasPlant.getComponent(Animator).getClip('vibrateAction').stop();
      [
        'feuillesAction',
        'tigeAction',
        'reduceAction',
      ].forEach(animationName => {

        this.ananasPlant.getComponent(Animator).getClip(animationName).play()

      })

    }

    if(this.goldenAnanas){
      this.goldenAnanas.addComponentOrReplace(new utils.MoveTransformComponent(this.goldenAnanas.getComponent(Transform).position, new Vector3(0, 0, 0), 3) )
      this.goldenAnanas.addComponentOrReplace(new utils.ScaleTransformComponent(this.goldenAnanas.getComponent(Transform).scale, new Vector3(0, 0, 0), 3) )
    }

    this.ananas.addComponentOrReplace(new utils.MoveTransformComponent(this.ananas.getComponent(Transform).position, new Vector3(8, 0, 8), 3, () => {

      const ananasInitScale: Vector3 = this.ananas.getComponent(Transform).scale
      this.ananas.addComponentOrReplace(new utils.ScaleTransformComponent(ananasInitScale, new Vector3(1, 1, 1), 4))
      this.door.addComponentOrReplace(new utils.ScaleTransformComponent(ananasInitScale, new Vector3(1, 1, 1), 4, () => {

        this.level2 = new LevelTwo(this.camera, this.pivot, this.buttonStart, this.platforms, this.door, () => this.start(), () => this.finishLevel2())
        this.level2.init()
        this.currentLevel = this.level2

        if(!this.ananasDecoIndoor){
          this.ananasDecoIndoor = getAnanasDeco(scene)
        }
        if(!this.papyVer){
          this.papyVer = getPapyVer(scene)
        }

        this.scores.displayUserScores()
        this.buttonStart.addComponentOrReplace(new utils.ScaleTransformComponent(this.buttonStart.getComponent(Transform).scale, new Vector3(1, 1, 1), 3))

      }))

    }))

  }

  finishLevel2(){

    if (!this.isPlaying || this.isFinishLvl2) {
      return
    }

    this.isFinishLvl2 = true
    this.scoreLevel = parseFloat((this.time).toFixed(2))
    this.reset()
    movePlayerTo({ x: 8, y: 0, z: 0 }, { x: 8, y: 2, z: 8 })

    const onFinish = () => {

      this.scores.displayUserScores()
      prompt.close()
      this.door.addComponentOrReplace(
        new OnPointerDown(
          e => {

            if(!this.isDoorOpen){

              [
                'cubeDAction',
                'cubeGAction',
                'plancheAction',
                'porteAction',
                'porte2_colliderAction',
                'porte_colliderAction',
                'lockAction',
                'keyAction'
              ].forEach(animationName => {

                this.door.getComponent(Animator).getClip(animationName).play()

              })

              this.papyVer.addComponentOrReplace(new utils.Delay(2000, () => {

                this.papyVer.getComponent(Animator).getClip('papyArmatureAction').play()

              }) )

              this.isDoorOpen = true

              Utils.setTimeout(() => {

                const dialogWindow = new ui.DialogWindow({
                  path: 'https://res.cloudinary.com/dp7csktyw/image/upload/v1599254945/dialogVer_qklwn9.png',
                  offsetX: 150,
                  offsetY: -40
                }, true)
                const NPCTalk: Dialog[] = [
                  {
                    text: `Thanks for testing!`,
                  },
                  {
                    text: `We're waiting for your feedback on discord!`,
                    isEndOfDialog: true,
                  }
                ]
                dialogWindow.openDialogWindow(NPCTalk, 0)

              }, 6500)

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

    const prompt = new ui.OptionPrompt(
      `Congrats! You done the second level in ${this.scoreLevel} seconds`,
      'Do you want to save your progression?',
      () => {

        log(`accept`)

        this.scores.setScoreForLevel(1, this.scoreLevel, true)
        onFinish()

      },
      () => {
        log(`reject`)
        this.scores.setScoreForLevel(1, this.scoreLevel, false)
        onFinish()
      },
      'Ok',
      'No',
      true
    )

  }

  startLevel3(){

    if(!this.ananasDecoIndoor){
      this.ananasDecoIndoor = getAnanasDeco(scene)
    }

    this.level3 = new LevelThree(this.pivot, this.ananas, this.buttonStart, this.platforms, () => this.start(), () => this.finishLevel3() )
    this.level3.init()
    this.currentLevel = this.level3
    this.scores.displayUserScores()

  }

  finishLevel3(){

  }

}

new Game()
