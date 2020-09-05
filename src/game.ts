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

  ground: Entity
  infoSign: Entity
  goldenAnanas: Entity
  ananasPlant: Entity
  ananas: Entity
  canvas: UICanvas

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
    this.platforms = []

    // Global entities
    this.ground = getGround(scene)
    this.infoSign = getInfoSign(scene)
    this.pivot = getPivot(scene)
    this.ananas = getAnanas(scene)
    this.canvas = new UICanvas()

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
          hoverText: 'Refresh leadboard',
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
        this.timer = new Timer(this.canvas)

        if(resScore.levels[0] === 0){

          log('Load level 1')
          this.sawWelcomeMessage = false
          this.startLevel1()

        } else if(resScore.levels[1] === 0){

          log('Load level 2')
          this.startLevel2()

        } else if(resScore.levels[2] === 0){

          log('Load level 3')
          this.startLevel3()

        }

      })

    ]).catch(error => {

      log(error.toString() )
      log('Error Load level 1')
      this.sawWelcomeMessage = false
      this.buttonStart = getButtonStart(this.pivot)
      this.platforms = getPlatform(this.pivot)
      this.timer = new Timer(this.canvas)
      this.startLevel1()

    })

    engine.addSystem(this)

  }

  update() {

    if( (this.camera.position.x < 0 || this.camera.position.z < 0 ||
      this.camera.position.x > 18 || this.camera.position.z > 18) && !this.scores.isFinishScoreLvl[0] && !this.scores.isFinishScoreLvl[1]){

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
        prompt.addIcon(`images/dialogAnanas.png`, -50, 0, 64, 64)
        prompt.addText('Welcome to the Golden Ananas Challenge!', 0, 140, Color4.White(), 20)
        const content = prompt.addText(`Do you think you're ready ?!
        
        
The propose is to activate the button above.

Jump on the cloud,
activate the button down here is a good start
`, -140, -50)
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

    if(this.platforms.length === 0 || this.platforms[1].getComponent(Transform).scale.x != 0){
      return
    }
    log('showCloud')
    this.platforms.slice(1).map(platform => {

      if(platform.getComponent(Transform).scale.x === 0){
        platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0, 0, 0), new Vector3(0.9, 0.9, 0.9), 0.7) )
      }
      // platform.getComponent(Transform).lookAt(this.camera.position)
    })

  }

  hideCloud(){
    if(this.platforms.length === 0 || this.platforms[1].getComponent(Transform).scale.x != 0.9){
      return
    }
    log('hideCloud')
    this.platforms.slice(1).map(platform => {

      platform.addComponentOrReplace(new utils.ScaleTransformComponent(new Vector3(0.9, 0.9, 0.9), new Vector3(0, 0, 0), 0.5) )

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

    if(!this.isPlaying){
      return
    }

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
        text: `At the end of each level, you can save your score to receive your badge in exchange and appear on the leaderboard.`,
      },
      {
        text: `Personally, it allows me to follow the best and finally find my new recruit ...`,
      },
      {
        text: 'Do you want to save your progress and get your first Golden Ananas Challenge badge?',
        isQuestion: true,
        labelE: {
          label: 'Ok'
        },
        labelF: {
          label: 'No'
        },
        ifPressE: 4,
        ifPressF: 4,
        triggeredByE: () => this.scores.setScoreForLevel(0, this.scoreLevel, true),
        triggeredByF: () => this.scores.setScoreForLevel(0, this.scoreLevel, false)
      },
      {
        text: `I didn't see such crazy
jumper since a while now...`,
      },
      {
        text: `I feel it.. it’s... I absolutely
need to meet you.`,
        isEndOfDialog: true,
        triggeredByNext: () => {
          this.startLevel2()
        },
      },
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
      this.goldenAnanas.addComponentOrReplace(new utils.ScaleTransformComponent(this.goldenAnanas.getComponent(Transform).scale, new Vector3(0, 0, 0), 3 ) )

    }

    this.ananas.addComponentOrReplace(new utils.MoveTransformComponent(this.ananas.getComponent(Transform).position, new Vector3(8, 0, 8), 3, () => {

      const ananasInitScale: Vector3 = this.ananas.getComponent(Transform).scale
      this.ananas.addComponentOrReplace(new utils.ScaleTransformComponent(ananasInitScale, new Vector3(1, 1, 1), 4))
      this.door.addComponentOrReplace(new utils.ScaleTransformComponent(ananasInitScale, new Vector3(1, 1, 1), 4, () => {

        this.level2 = new LevelTwo(this.camera, this.pivot, this.buttonStart, this.platforms, this.door, () => this.start(), () => this.finishLevel2())
        this.currentLevel = this.level2

        if(this.goldenAnanas){
          engine.removeEntity(this.goldenAnanas)
        }
        if(this.ananasPlant){
          engine.removeEntity(this.ananasPlant)
        }
        if(!this.ananasDecoIndoor){
          this.ananasDecoIndoor = getAnanasDeco(scene)
        }
        if(!this.papyVer){
          this.papyVer = getPapyVer(scene)
        }

        this.scores.displayUserScores()
        const dialogWindow = new ui.DialogWindow({
          path: 'https://res.cloudinary.com/dp7csktyw/image/upload/v1599254946/dialogAnanas_epfecz.png',
          offsetX: 100,
          offsetY: -20
        }, true)
        const NPCTalk: Dialog[] = [
          {
            text: `Head up, go grab the key
and meet me in my
Anan’house.`,
            isEndOfDialog: true,
            triggeredByNext: () => {
              this.level2.init()
            },
          }
        ]

        dialogWindow.openDialogWindow(NPCTalk, 0)
      }))

    }))

  }

  finishLevel2(){

    if (!this.isPlaying) {
      return
    }

    this.scoreLevel = parseFloat((this.time).toFixed(2))
    this.reset()
    movePlayerTo({ x: 8, y: 0, z: 0 }, { x: 8, y: 2, z: 8 })

    this.scores.displayUserScores()
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
                offsetX: 140,
                offsetY: -40
              }, true)
              const NPCTalk: Dialog[] = [
                {
                  text: `It’s more promising than I thought ...`,
                },
                {
                  text: `First of all, I am very honored to meet you, a score like this, you only see once in a lifetime!`,
                  offsetY: -20
                },
                {
                  text: 'Do you want to save your score ?',
                  isQuestion: true,
                  labelE: {
                    label: 'Ok'
                  },
                  labelF: {
                    label: 'No'
                  },
                  ifPressE: 4,
                  ifPressF: 4,
                  triggeredByE: () => this.scores.setScoreForLevel(1, this.scoreLevel, true),
                  triggeredByF: () => this.scores.setScoreForLevel(1, this.scoreLevel, false)
                },
                {
                  text: `Oh! how rude I am, I did not introduce myself! I have been the protector of the golden ananas since ... I don't even know …`,
                  offsetY: -20
                },
                {
                  text: `The first expeditions to find him go back to my earliest youth.`
                },
                {
                  text: `I was an agile adventurer at the time and managed to complete every challenge to finally find the golden ananas.`,
                  offsetY: -20
                },
                {
                  text: `As you can see I'm getting old, and it's time for me to choose someone to take care of and protect him.`,
                  offsetY: -20
                },
                {
                  text: `It is not an easy task and only a true jumper can complete this mission.`,
                },
                {
                  text: `Don't worry, the pineapple is magically protected, it only reveals itself if all the golden slices are together.`,
                  offsetY: -20
                },
                {
                  text: `They have been scattered all over the country and the secret of their location is well kept!`,
                  offsetY: -20
                },
                {
                  text: `You are good, but there is still a long way to go.`,
                },
                {
                  text: `Start by looking at the top of my house, I remember hiding one of the slices over there.`,
                  offsetY: -20,
                  isEndOfDialog: true,
                  triggeredByNext: () => {
                    engine.removeEntity(this.door)
                    this.startLevel3()
                  },
                }
              ]
              dialogWindow.openDialogWindow(NPCTalk, 0)

            }, 6500)

          }

        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Open',
          distance: 8
        }
      )
    )

  }

  startLevel3(){

    if(!this.ananasDecoIndoor){
      this.ananasDecoIndoor = getAnanasDeco(scene)
    }

    this.ananas.addComponentOrReplace(new Transform({
      position: new Vector3(8, 0, 8),
    }) )

    this.ananas.addComponentOrReplace(new utils.ScaleTransformComponent(this.ananas.getComponent(Transform).scale, new Vector3(1, 1, 1), 3, () => {

      this.level3 = new LevelThree(scene, this.pivot, this.ananas, this.buttonStart, this.platforms, () => this.start(), () => this.finishLevel3() )
      this.level3.init()
      this.currentLevel = this.level3
      this.scores.displayUserScores()

    }) )

  }

  finishLevel3(){

    if (!this.isPlaying) {
      return
    }

    this.scoreLevel = parseFloat((this.time).toFixed(2))
    this.reset()
    movePlayerTo({ x: 7.3, y: 0, z: 4.5 }, { x: 8, y: 2, z: 12 })

    Utils.setTimeout(() => {

      const dialogWindow = new ui.DialogWindow({
        path: 'https://res.cloudinary.com/dp7csktyw/image/upload/v1599254945/dialogVer_qklwn9.png',
        offsetX: 140,
        offsetY: -40
      }, true)
      const NPCTalk: Dialog[] = [
        {
          text: `Thanks for testing. Please share yours feedbacks!`,
          isEndOfDialog: true,
        },
       ]
      dialogWindow.openDialogWindow(NPCTalk, 0)

    }, 6500)

  }

}

new Game()
