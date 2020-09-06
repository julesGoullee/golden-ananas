import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { PromptStyles, ButtonStyles } from "../../node_modules/@dcl/ui-utils/utils/types"

export default () => {
  const prompt = new ui.CustomPrompt(PromptStyles.DARKLARGE, 500, 400)
  prompt.addIcon(`images/dialogAnanas.png`, -50, 0, 64, 64)
  prompt.addText('Welcome to the Golden Ananas Challenge!', 0, 140, Color4.White(), 20)
  const content = prompt.addText(`Do you think you're ready ?!
        
        
The propose is to activate the button above.

Jump on the cloud,
activate the button down here is a good start
`, -140, -50)
  content.text.hTextAlign = 'left'
  prompt.addButton(
    `Go!`,
    0,
    -150,
    () => {
      log('Yes')
      prompt.close()
    },
    ButtonStyles.E
  )
}
