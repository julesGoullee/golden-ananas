export default [
  {
    "inputs": [
      {
        "internalType": "contract GoldenAnanasScore",
        "name": "_goldenAnanasScore",
        "type": "address"
      },
      {
        "internalType": "contract GoldenAnanasRank",
        "name": "_goldenAnanasRank",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_minContrib",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "AdminAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "AdminRemoved",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "goldenAnanasRank",
    "outputs": [
      {
        "internalType": "contract GoldenAnanasRank",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "goldenAnanasScore",
    "outputs": [
      {
        "internalType": "contract GoldenAnanasScore",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isAdmin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "minContrib",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minContrib",
        "type": "uint256"
      }
    ],
    "name": "setMinContrib",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract GoldenAnanasScore",
        "name": "_goldenAnanasScore",
        "type": "address"
      }
    ],
    "name": "setGoldenAnanasScore",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract GoldenAnanasRank",
        "name": "_goldenAnanasRank",
        "type": "address"
      }
    ],
    "name": "setGoldenAnanasRank",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_level",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_scoreLevel",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_player",
        "type": "address"
      }
    ],
    "name": "setScoreFor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_level",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_scoreLevel",
        "type": "uint256"
      }
    ],
    "name": "setScore",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getScore",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_level",
        "type": "uint256"
      }
    ],
    "name": "getScoreByLevel",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getRanks",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_level",
        "type": "uint256"
      }
    ],
    "name": "getRanksByLevel",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "withdrawToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "withdrawEth",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
