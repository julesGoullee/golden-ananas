import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { PromptStyles, ButtonStyles } from "../../node_modules/@dcl/ui-utils/utils/types"

export default () => {
  const prompt = new ui.CustomPrompt(PromptStyles.DARKLARGE, 500, 600)
  prompt.addIcon(`images/goldAnanas.png`, 0, 50, 256, 256, {
    sourceWidth: 520,
    sourceHeight: 520
  })
  prompt.addText('Welcome to the Golden Ananas Challenge!', 0, 230, Color4.White(), 20)
  const content = prompt.addText(`            Do you think you're ready ?! 
         
The challenge is to activate the button above.
Jump on the cloud, activate the button down
here is a good start
`, -140, -170)
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
