:pineapple::pineapple: Gold’Ananas :pineapple::pineapple:
=============

Game build for decentraland metaverse in the context of the game jam 2020.
Try to reach the highest level and win the most glossy pineapple!  

=> Chain reaction: let's take a deep dive into.

![alt text](https://github.com/julesGoullee/golden-ananas/blob/master/screenshots/screenStart.png "screenStart")

### Introduction:

Within a week and our knowledge in the [Decentraland](https://decentraland.org) ecosystem, we define our target: build a proof of concept of the gameplay that we want to be simple and easy to understand. 
Indeed, we keep in mind our experience playing some Decentraland games a few months ago during the public launch, rules were not clear and we wondered: what do I have to do now? We spend so much time on scenes not because it was difficult or the gameplay was challenging, but just because we didn't understand what to do.  
Thus, we arrived at the conclusion: let's prove we can build an easy to understand the game, with a game flow chained perfectly in Decentraland: simple, small, minimalist, beautiful.  


The Decentraland Game Jam theme is Chain Reaction. We think of different interpretations of this theme, and we find that on one hand, the gameplay could be built on a chain reaction logic, and on the other hand, the game could be reacting with the blockchain. In the end, we decided to create a game closely linked to the blockchain.  
Thus, by reacting to the blockchain, our game scene adapts to your achievement in the game: by possessing NFT’s, storing your score and appearing in the global top 10 on the leaderboard, you have access to new elements and actions in the scene.


The final idea is to build a game that is scalable and can extend beyond the game. The game can be replicated on different parcels in Decentraland, we can create as many levels as we want and manage the difficulty of each one, and with the NFT badges delivered in the game, we can imagine special access to wearables, objects, and the creation of a Golden Community! 


### Game concept:

- Platform arcade running game, if you failed you have to restart the whole level.  
- Platform arcade running game, if you fail, you have to restart the whole level.
- Make the best score for each level and get into the competition to be the first at the global leader board.
- Each level done changes the scene radically, and progress in the whole history.
- Every (Juicy) 3D models, images, logos are homemade by [@ninja-fire](https://github.com/ninja-fire). Our (messy) moodboard in [figma.com](https://www.figma.com/file/kkYNHc3aGHDSNXKWw6peBi/goldananas?node-id=1%3A2)  
- The game is backed by a dedicated set of Ethereum smart contracts, fully decentralized backend.

- Save each user progression and score, maintain leaderboard top ranks, mint trophies when a player finishes a level as an NFT ERC721, make a donation to support us.  
Progression can be saved at the end of each level, the user can refuse and batch seamlessly many levels resulting in one Ethereum transaction.
When you come back on the scene it will automatically load the level to continue where you stopped.  
Smart contract source repository: [https://github.com/julesGoullee/golden-ananas-contract](https://github.com/julesGoullee/golden-ananas-contract)


### The next steps:

We decide to make something fine-tuned, well packaged in place of building much more stuff.  
As independent creative persons, we need funding in order to continue to work on this project. 
We deeply integrate this requirement in our game, you will see at the end of the game (what is done so far). 
We integrate a fundraise to build a missing object in order to continue the history of the game. 
In practice, it will fund the project to help us buy new parcels to continue this awesome adventure. 
We fix a goal that will allow us to accomplish it. 
We plan to distribute for each fundraiser contributor a collectible that represents the missing object (mystery…)

##### To do:
	
- When all levels are done, allow the player to re-play any levels to increase his score on the leader board.  
- We put down different gameplay blocks, let's combine them to build much more complex levels.  
- Obviously imagine the next chapters of the game!  

### Let's try it:

##### Play in standalone on Ethereum ropsten testnet: 
[https://golden-ananas.vercel.app](https://golden-ananas.vercel.app?DEBUG&ENABLE_WEB3&SCENE_DEBUG_PANEL&position=-13%2C-121&realm=localhost-stub).  

Note: sadly at the date of 7/08/20 the decentraland export sdk have an issue with the metamask connection.  
If you want to test the blockchain integration you have to pull this repo, and run the dev server on your localhost. (witch  your metamask account to ropsten network).  
Open in your browser: 
[http://127.0.0.1:8000/?DEBUG&ENABLE_WEB3&SCENE_DEBUG_PANEL&position=-13%2C-121&realm=localhost-stub](http://127.0.0.1:8000/?DEBUG&ENABLE_WEB3&SCENE_DEBUG_PANEL&position=-13%2C-121&realm=localhost-stub)
