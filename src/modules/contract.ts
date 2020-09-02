import {getProvider} from "@decentraland/web3-provider"
import * as EthConnect from "../../node_modules/eth-connect/esm"
import {getUserAccount} from "@decentraland/EthereumController"
import Config from "../config/index"
import abiGoldAnanas from "../abi/goldAnanas"

//http://127.0.0.1:8000/?ENABLE_WEB3&SCENE_DEBUG_PANEL&position=-14%2C-120
export function submitScore (level, score) {

  return executeTask(async () => {
    try {
      const provider = await getProvider()
      const requestManager = new EthConnect.RequestManager(provider)
      const factory = new EthConnect.ContractFactory(requestManager, abiGoldAnanas)
      const address = await getUserAccount()
      const contract = (await factory.at(Config.contracts.goldenAnanas)) as any
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
        const provider = await getProvider()
        const requestManager = new EthConnect.RequestManager(provider)
        const factory = new EthConnect.ContractFactory(requestManager, abiGoldAnanas)
        const address = await getUserAccount()
        const contract = (await factory.at(Config.contracts.goldenAnanas)) as any
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
      const provider = await getProvider()
      const requestManager = new EthConnect.RequestManager(provider)
      const factory = new EthConnect.ContractFactory(requestManager, abiGoldAnanas)
      const address = await getUserAccount()
      const contract = (await factory.at(Config.contracts.goldenAnanas) ) as any
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
