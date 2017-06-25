import React, { Component } from "react"
import namer from "color-namer"
import { extract } from "./colorUtils.js"
import logo from "./logo.svg"
import "./App.css"

const arffHeader = `@RELATION personagem 

@ATTRIBUTE Vibrant NUMERIC 
@ATTRIBUTE Muted NUMERIC 
@ATTRIBUTE DarkVibrant NUMERIC 
@ATTRIBUTE DarkMuted NUMERIC 
@ATTRIBUTE LightVibrant NUMERIC 
@ATTRIBUTE LightMuted NUMERIC 
@ATTRIBUTE classe NUMERIC

@DATA
`

class App extends Component {
  constructor() {
    super()
    this.state = { result: "Escolha as imagens" }
  }

  onChangeImages = event => {
    this.setState({ result: "Carregando..." })

    const files = Array.from(event.target.files)

    const classificar = i => (files[i].name.startsWith("bart") ? 0 : 1)

    Promise.all(files.map(extract))
      .then(palletes => palletes.map((pallete, i) => [pallete, classificar(i)]))
      .then(a => a.join("\n"))
      .then(result => this.setState({ result: arffHeader + result }))
      .catch(err => console.log(`Ocorreu o seguinte erro: ${err}`))
  }

  render() {
    return (
      <div className="App">
        <h1>Image Extractor</h1>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={this.onChangeImages}
        />
        <textarea value={this.state.result} disabled={true} />
      </div>
    )
  }
}

export default App
