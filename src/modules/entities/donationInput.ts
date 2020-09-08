export default (canvas) => {

  const donationInput = new UIInputText(canvas)
  donationInput.visible = false
  donationInput.width = '100px'
  donationInput.vAlign = 'bottom'
  donationInput.hAlign = 'center'
  donationInput.positionY = '200px'
  donationInput.positionX = '35px'
  const padding = 10
  donationInput.paddingTop = padding
  donationInput.paddingBottom = padding
  donationInput.paddingLeft = padding
  donationInput.paddingRight = padding
  donationInput.vTextAlign = 'center'
  donationInput.fontSize = 20
  donationInput.color = Color4.White()
  donationInput.placeholderColor = Color4.White()
  donationInput.focusedBackground = Color4.Gray()

  return donationInput
}
