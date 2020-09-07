const Config = {
  contracts: {

    // local
    '1234': {
      goldenAnanas: '0x407De3b78F391a75fC4F5b709E5C7aFB71174e9E',
      manaToken: '0x9B7C4B23625e9D8A8c5542B8a92977ACbC62e601',
    },

    // Ropsten
    '3': {
      goldenAnanas: '0x24C08142dD48ca242DdC2D08220666f7F1d5bB3f',
      // manaToken: '0xCEAdf25c74608e8945e44EDb025b7f1F40609787', // fake
      manaToken: '0x2a8Fd99c19271F4F04B1B7b9c4f7cF264b626eDB', // decentraland
    },

    // Mainnet
    '1': {

    }
  },
  userSize: 1.80,
  countLevels: 3,
  scoreBase: 100000,
  defaultDonation: 10
}

export default Config
