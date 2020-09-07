const Config = {
  contracts: {

    'local': {
      goldenAnanas: '0x407De3b78F391a75fC4F5b709E5C7aFB71174e9E',
      manaToken: '0x9B7C4B23625e9D8A8c5542B8a92977ACbC62e601',
    },

    // Ropsten
    '3': {
      goldenAnanas: '0xe7d94aCE77779AfB9aC6467DEa1839D2277460b2',
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
  manaContributionGoal: 50000,
  defaultDonation: 10
}

export default Config
