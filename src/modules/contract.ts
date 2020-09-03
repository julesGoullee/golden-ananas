import {getContract } from '../../node_modules/@dcl/crypto-utils/utils/contract'
import {getUserAccount} from "@decentraland/EthereumController"
import Config from "../config/index"
import abiGoldAnanas from "../abi/goldAnanas"

//http://127.0.0.1:8000/?ENABLE_WEB3&DEBUG&SCENE_DEBUG_PANEL&position=-13%2C-121&realm=localhost-stub
export function submitScore (level, score) {

  return executeTask(async () => {
    try {
      const address = await getUserAccount()
      const { contract } = await getContract(Config.contracts.goldenAnanas, abiGoldAnanas) as any
      const res = await contract.setScore(
        level,
        score,
        {
          from: address,
          value: level === Config.countLevels -1 ? Config.minContribution * 10 ** 18 : 0
        }
      )
      log(res)
    } catch (error) {
      log(error.toString())
      throw error
    }
  })
}

export async function getTopRanksData() {

    try {
      return executeTask(async () => {
        const address = await getUserAccount()
        const { contract } = await getContract(Config.contracts.goldenAnanas, abiGoldAnanas) as any
        const res = await contract.getRanks({
          from: address
        })
        const resParsed = res.length === 0 ? [] : res[0].map( (player, i) => {
          return { player, score: res[1][i].toNumber() }
        })

        return resParsed
      })
    } catch (error) {
      log(error.toString())
      return []
    }

}

export async function getPlayerScores() {

  try {
    return executeTask(async () => {

      const address = await getUserAccount()
      const { contract } = await getContract(Config.contracts.goldenAnanas, abiGoldAnanas) as any
      const resScore = await contract.getScore({ from: address })

      const levels = []

      for(let i = 0; i < Config.countLevels; i++){

        const resScore = await contract.getScoreByLevel(i, { from: address })
        levels.push(resScore.toNumber() / 100)

      }

      return {
        global: resScore.toNumber(),
        levels
      }

    })
  } catch (error) {
    log(error.toString())
    return []
  }

}

export default {
  getTopRanksData,
  getPlayerScores,
  submitScore
}
