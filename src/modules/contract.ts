import {getContract} from '../../node_modules/@dcl/crypto-utils/utils/contract'
import {getUserAccount} from "@decentraland/EthereumController"
import * as EthConnect from '../../node_modules/eth-connect/esm'
import { getProvider } from '@decentraland/web3-provider'
import delay from "../../node_modules/@dcl/crypto-utils/utils/delay"
import * as currency from '../../node_modules/@dcl/crypto-utils/currency/index'
import Config from "../config/index"
import abiGoldenAnanas from "../abi/goldenAnanas"

export function saveScores(levels, scores) {

  return executeTask(async () => {
    try {
      const provider = await getProvider()
      const requestManagerNet = new EthConnect.RequestManager(provider)
      const network = await requestManagerNet.net_version();

      const address = await getUserAccount()
      const { contract, requestManager } = await getContract(Config.contracts[network].goldenAnanas, abiGoldenAnanas) as any
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

        const provider = await getProvider()
        const requestManager = new EthConnect.RequestManager(provider)
        const network = await requestManager.net_version();

        const address = await getUserAccount()
        const { contract } = await getContract(Config.contracts[network].goldenAnanas, abiGoldenAnanas) as any
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

      const provider = await getProvider()
      const requestManager = new EthConnect.RequestManager(provider)
      const network = await requestManager.net_version();

      const address = await getUserAccount()
      const { contract } = await getContract(Config.contracts[network].goldenAnanas, abiGoldenAnanas) as any
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

export function donation(amount){

  return executeTask(async () => {
    const provider = await getProvider()
    const requestManager = new EthConnect.RequestManager(provider)
    const network = await requestManager.net_version();

    try {
      await currency.send(Config.contracts[network].manaToken, Config.contracts[network].goldenAnanas, amount * 10 ** 18, true).then( () => {
        log('donation mined')
      })
    } catch (error) {
      log(error.toString())
      throw error
    }

  })

}

export function getGoldenAnanasManaBalance(){

  return executeTask(async () => {

    const provider = await getProvider()
    const requestManager = new EthConnect.RequestManager(provider)
    const network = await requestManager.net_version();

    try {
      const balance = (await currency.balance(Config.contracts[network].manaToken, Config.contracts[network].goldenAnanas) ) as any
      const balanceParse = parseInt(balance, 10) / 10 ** 18
      log('goldenAnanas mana balance', balanceParse)
      return balanceParse
    } catch (error) {
      log(error.toString())
      throw error
    }

  })

}
export default {
  getTopRanksData,
  getPlayerScores,
  saveScores
}
