import { render } from '@testing-library/react';
import React, { Component } from 'react';
const endpoint = 'https://api.giphy.com/v1/gifs/trending?api_key='
const apiKey = '9DLRs2tXKNegCRfJCg5U7eYaVqvjyoqj'
let url = endpoint + apiKey


class Features extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      titles: [],
      gifsRandom: [],
      titlesRandom: []
    }
  }

  apiCall(url, handler) {
    fetch(url)
      .then(response => response.json())
      .then(data => handler(data))
      .catch(error => console.log(error))
  }



  componentDidMount() {
    this.apiCall(url, this.guardarGifs)
  }

  guardarGifs = (data) => {
    //#btn is defined in Navigation.js
    let btn = document.querySelector('#btn')
    console.log(btn)


    let titlesArray = data.data.map((element) => {
      return element.title
    })
    let gifsArray = data.data.map((element => {
      return element.images.downsized.url
    }))

    //Create random array 12 numbers without repeat
    function generateRandomArray(length, max) {
      return Array(length).fill().map(() => Math.round(Math.random() * max))

    }

    let randomArray = generateRandomArray(12, 50)
    console.log(randomArray)

    let titlesRandomArray = randomArray.map((element => titlesArray[element]))
    let gifsRandomArray = randomArray.map((element => gifsArray[element]))

    console.log(gifsRandomArray)

    this.setState(
      {
        titles: titlesArray,
        gifs: gifsArray,
        gifsRandom: gifsRandomArray,
        titlesRandom: titlesRandomArray
      }
    )

  }

  componentDidUpdate() {

  }




  render() {

    let content
    if (this.state.gifs === []) {
      content = <p>Cargando...</p>
    } else {
      content = this.state.gifsRandom.map((element, index) =>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <img className="card-img-top" src={`${element}`} alt="" />
            <div className="card-body">
              <h4 className="card-title">{this.state.titlesRandom[index]}</h4>
            </div>
          </div>
        </div>

      )
    }




    return (
      <div className="container">

        <div className="row text-center">



          {content}

        </div>

      </div>
    )

  }
}

export default Features