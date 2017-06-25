import Vibrant from "node-vibrant"
import namer from "color-namer"
import colors from "color-namer/lib/colors/basic"

const getNumber = ({ hex }) => colors.findIndex(color => color.hex === hex)

const getColorNumber = color =>
  getNumber(namer(color ? color.getRgb() : defaultColor).basic[0])

const defaultColor = [122, 122, 122]

export const extract = file =>
  new Promise((fulfill, reject) => {
    const reader = new FileReader()
    reader.onload = e =>
      Vibrant.from(e.target.result)
        .getPalette()
        .then(pallete => [
          getColorNumber(pallete.Vibrant),
          getColorNumber(pallete.Muted),
          getColorNumber(pallete.DarkVibrant),
          getColorNumber(pallete.DarkMuted),
          getColorNumber(pallete.LightVibrant),
          getColorNumber(pallete.LightMuted)
        ])
        .then(fulfill)
        .catch(reject)

    reader.readAsDataURL(file)
  })
