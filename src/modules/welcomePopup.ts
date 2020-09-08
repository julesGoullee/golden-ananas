import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { PromptStyles, ButtonStyles } from "../../node_modules/@dcl/ui-utils/utils/types"

export default () => {
  const prompt = new ui.CustomPrompt(PromptStyles.DARKLARGE, 500, 600)
  prompt.addIcon(`images/goldAnanas.png`, 0, 110, 200, 200, {
    sourceWidth: 520,
    sourceHeight: 520
  })
  prompt.addText('Welcome to the Golden Ananas Challenge!', 0, 260, Color4.White(), 20)
  const content = prompt.addText(`First of all, this game is designed to be played at
the first person, click on V to switch views.

Your goal is to jump on the path of chained clouds
as quickly as possible.

So ready?
Get on the first cloud and, then click on the button
to start playing.

We hope you will have fun!
`, -140, -180)
  content.text.hTextAlign = 'left'
  prompt.addButton(
    `Go!`,
    0,
    -250,
    () => {
      log('Yes')
      prompt.close()
    },
    ButtonStyles.E
  )
}
