import {getTopRanksData, getPlayerScores, saveScore} from "./contract";
import Config from "../config/index";

export default class Scores {

  scores: any
  isSubmitScoreLvl: boolean[]
  ranksText: TextShape
  userScores: Entity
  userScoresText: TextShape

  constructor(ranksText, userScores){

    this.scores = {
      levels: [],
      global: 0
    }
    this.isSubmitScoreLvl = []
    this.ranksText = ranksText
    this.ranksText.value = 'PLAYER     SCORE\n'
    this.userScores = userScores

    this.userScoresText = new TextShape('')
    this.userScoresText.fontSize = 2
    this.userScores.addComponentOrReplace(this.userScoresText)
    this.userScores.addComponentOrReplace(
      new Transform({
        position: new Vector3(8, 1.5078, 8 + 3.768),
        rotation: Quaternion.Euler(9.76, 0, 0),
        scale: new Vector3(1, 1, 1)
      })
    )

  }

  displayUserScores(){

    let userScoresTextContent = 'Your Score\n\n'
    userScoresTextContent += `${this.scores.global}\n\n`
    userScoresTextContent += 'Level         Time'

    for (let i = 0; i < this.scores.levels.length; i++){

      if(this.scores.levels[i] === 0){
        break
      }

      userScoresTextContent += `\n${i + 1}       ${this.scores.levels[i] / 1000}`

    }

    this.userScoresText.value = userScoresTextContent

  }

  getPlayerScores(){

    return getPlayerScores().then(scores => {

      this.scores = scores;
      return this.scores;

    });

  }

  refreshTopRanks(){

    console.log('refreshTopRanks');
    return getTopRanksData()
      .then((ranks) => {

        let ranksTextContent = 'PLAYER     SCORE\n'

        const ranksSorted = ranks.sort( (a, b) => a.score < b.score ? 1 : -1).slice(0, 10)

        for (let i = 0; i < ranksSorted.length; i++){

          ranksTextContent += `\n${ranksSorted[i].player.slice(0, 8)}...    ${ranks[i].score}`

        }

        this.ranksText.value = ranksTextContent

      })

  }

  setScoreForLevel(level, time, save){

    const score = parseInt( (time * 1000).toFixed(0), 10)

    if(!this.isSubmitScoreLvl[level] || this.scores.levels[level] > score){

      if(this.scores.levels[level]){
        this.scores.global -= Config.scoreBase - this.scores.levels[level]
      }

      this.scores.levels[level] = score
      this.scores.global += Config.scoreBase - score
      this.isSubmitScoreLvl[level] = true

      if(save){

        saveScore(level,  score)
          .then( (res) => this.refreshTopRanks() )

      }

    }

    return Promise.resolve()

  }

}
