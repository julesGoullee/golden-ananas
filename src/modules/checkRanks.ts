import { getTopRanksData, getPlayerScores } from "./contract";

export default class CheckRanks implements ISystem {

  isLoad: boolean
  scores: any
  ranksText: TextShape
  constructor(ranksText){

    this.isLoad = false
    this.ranksText = ranksText
    this.scores = null;

  }

  update(dt:number){

    if(!this.isLoad){

      this.isLoad = true
      this.refreshData()

    }

  }

  refreshData(){

    getPlayerScores().then(scores => {

      this.scores = scores;

    });

    getTopRanksData()
      .then((ranks) => {

        let ranksTextContent = ' Player         Score\n'

        const ranksSorted = ranks.sort( (a, b) => a.score < b.score ? 1 : -1).slice(0, 10)

        for (let i = 0; i < ranksSorted.length; i++){

          ranksTextContent += `\n${ranksSorted[i].player.slice(0, 8)}...       ${ranks[i].score}`

        }

        this.ranksText.value = ranksTextContent

      })

  }

}
