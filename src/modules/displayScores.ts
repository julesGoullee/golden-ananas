import { getTopRanksData, getPlayerScores } from "./contract";

export default class DisplayScores implements ISystem {

  isLoad: boolean
  scores: any
  ranksText: TextShape
  userScores: Entity
  userScoresText: TextShape

  constructor(ranksText, userScores){

    this.scores = null
    this.isLoad = false
    this.ranksText = ranksText
    this.userScores = userScores

    this.userScoresText = new TextShape('')
    this.userScoresText.fontSize = 2
    this.userScores.addComponentOrReplace(this.userScoresText)
    this.userScores.addComponentOrReplace(
      new Transform({
        position: new Vector3(8 - 2.74, 1.7, 8 + 2.65),
        rotation: Quaternion.Euler(10.6, 407 - 90, 0.15),
        scale: new Vector3(1, 1, 1)
      })
    )

  }

  update(dt:number){

    if(!this.isLoad){

      this.isLoad = true
      this.refreshData()

    }

  }

  displayUserScores(){

    if(this.scores === null){
      return
    }

    let userScoresTextContent = 'Your Score\n\n'
    userScoresTextContent += `${this.scores.global}\n\n`
    userScoresTextContent += 'Level         Time'

    for (let i = 0; i < this.scores.levels.length; i++){

      if(this.scores.levels[i] === 0){
        break
      }

      userScoresTextContent += `\n${i + 1}       ${this.scores.levels[i]}`

    }

    this.userScoresText.value = userScoresTextContent

  }

  getPlayerScores(){

    return getPlayerScores().then(scores => {

      this.scores = scores;

      return this.scores;

    });

  }

  refreshData(){

    return Promise.all([
      getPlayerScores().then(scores => {
        this.scores = scores;
      }),
      getTopRanksData()
        .then((ranks) => {

          let ranksTextContent = ' Player         Score\n'

          const ranksSorted = ranks.sort( (a, b) => a.score < b.score ? 1 : -1).slice(0, 10)

          for (let i = 0; i < ranksSorted.length; i++){

            ranksTextContent += `\n${ranksSorted[i].player.slice(0, 8)}...       ${ranks[i].score}`

          }

          console.log('ranksTextContent', ranksTextContent)

          this.ranksText.value = ranksTextContent

        })
    ])

  }

}
