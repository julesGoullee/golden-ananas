export default (canvas) => {
  const manaIcon = new UIImage(canvas, new Texture('https://res.cloudinary.com/dp7csktyw/image/upload/v1599551264/manaLogo_gaqetc.png') )
  manaIcon.visible = false
  manaIcon.name = 'mana-icon'
  manaIcon.width = '32px'
  manaIcon.height = '32px'
  manaIcon.positionY = -100
  manaIcon.positionX = 110
  manaIcon.sourceWidth = 320
  manaIcon.sourceHeight = 320
  manaIcon.isPointerBlocker = false

  return manaIcon
}
