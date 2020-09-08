const Config = {
  contracts: {

    'local': {
      goldenAnanas: '0x407De3b78F391a75fC4F5b709E5C7aFB71174e9E',
      manaToken: '0x9B7C4B23625e9D8A8c5542B8a92977ACbC62e601',
    },

    // Ropsten
    '3': {
      goldenAnanas: '0xb0f0FE0A407E055Dc0d6C0d66421501975739dEc',
      // manaToken: '0xCEAdf25c74608e8945e44EDb025b7f1F40609787', // fake
      manaToken: '0x2a8Fd99c19271F4F04B1B7b9c4f7cF264b626eDB', // decentraland
    },

    // Mainnet
    '1': {
      goldenAnanas: '',
      manaToken: '',
    }
  },
  userSize: 1.80,
  countLevels: 3,
  scoreBase: 100000,
  manaContributionGoal: 50000,
  defaultDonation: 100
}

export default Config
