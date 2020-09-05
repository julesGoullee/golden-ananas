import {getContract } from '../../node_modules/@dcl/crypto-utils/utils/contract'
import {getUserAccount} from "@decentraland/EthereumController"
import Config from "../config/index"
import abiGoldAnanas from "../abi/goldAnanas"
import delay from "../../node_modules/@dcl/crypto-utils/utils/delay"

export function saveScores(levels, scores) {

  return executeTask(async () => {
    try {
      const address = await getUserAccount()
      const { contract, requestManager } = await getContract(Config.contracts.goldenAnanas, abiGoldAnanas) as any
      log('contract:saveScores', 'levels', levels, 'scores', scores)

      let res = null
      if(levels.length === 1){

        res = await contract.setScore(
          levels[0],
          scores[0],
          { from: address }
        )
        log('contract:saveScores:setScore', 'res', res)

      } else {

        res = await contract.batchSetScore(
          levels,
          scores,
          { from: address }
        )
        log('contract:saveScores:batchSetScore', 'res', res)

      }

      let receipt = null
      while (receipt == null) {
        await delay(2000)
        receipt = await requestManager.eth_getTransactionReceipt(res.toString())
      }
      log('contract:saveScores', 'receipt', receipt)

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
        log('contract:getTopRanksData', resParsed)

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
        levels.push(resScore.toNumber() )

      }

      const resParsed = {
        global: resScore.toNumber(),
        levels
      }
      log('contract:getPlayerScores', resParsed)

      return resParsed

    })
  } catch (error) {
    log(error.toString())
    return []
  }

}

export default {
  getTopRanksData,
  getPlayerScores,
  submitScore: saveScores
}
