import React, { Component } from "react";
import "./App.css";

import Footer from "./component/Footer";
import Modal from "./component/Modal";
import MyPokemonList from "./component/MyPokemonList";

const axios = require("axios");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      pokemonList: [],
      pokemonData: [],
      myPokemonList: [],
    };
  }

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3030/api/cards");
    let cardData = [];
    data.cards.forEach((item) => {
      const calData = this.calculateData(item);
      cardData = [...cardData, calData];
    });
    this.setState({
      pokemonList: cardData,
      pokemonData: cardData,
    });
  }

  calculateData = ({ id, imageUrl, name, hp, attacks, weaknesses }) => {
    const hpData = hp >= 100 ? 100 : Number(hp) ? hp : 0;
    const strengthData =
      attacks?.length === 2 ? 100 : attacks?.length === 1 ? 50 : 0;
    const weaknessData = weaknesses?.length === 1 ? 100 : 0;
    const damageData = this.calculateDamage(attacks ? attacks : []);
    const happinessData =
      (hpData / 10 + damageData / 10 + weaknessData / 100 + 10) / 5;

    const calData = {
      id,
      imageUrl,
      name,
      hp: hpData,
      strength: strengthData,
      weakness: weaknessData,
      damage: damageData,
      happiness: happinessData,
    };
    return calData;
  };

  calculateDamage = (attacks) => {
    let totalDamage = 0;
    for (let item of attacks) {
      totalDamage =
        totalDamage + parseInt(item.damage) ? parseInt(item.damage) : 0;
    }
    return totalDamage;
  };

  handleModal = (status) => {
    this.setState({
      isOpen: !status,
    });
  };

  onSearch = (value) => {
    const pokemonSearchData = this.state.pokemonList.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({
      pokemonData: pokemonSearchData,
    });
  };

  onAdd = (value) => {
    const myPokemonData = this.state.pokemonList.find(({ id }) => id === value);
    const newPokemonListData = this.state.pokemonList.filter(
      ({ id }) => id !== value
    );
    const newPokemonSearchData = this.state.pokemonData.filter(
      ({ id }) => id !== value
    );

    this.setState({
      myPokemonList: [...this.state.myPokemonList, myPokemonData],
      pokemonList: newPokemonListData,
      pokemonData: newPokemonSearchData,
    });
  };

  onDelete = (value) => {
    const myDeletePokemonData = this.state.myPokemonList.filter(
      ({ id }) => id === value
    );
    const myPokemonData = this.state.myPokemonList.filter(
      ({ id }) => id !== value
    );

    this.setState({
      myPokemonList: myPokemonData,
      pokemonList: [...this.state.pokemonList, myDeletePokemonData[0]],
      pokemonData: [...this.state.pokemonData, myDeletePokemonData[0]],
    });
  };

  render() {
    return (
      <div className="App">
        <div className="title">My Pokedex</div>
        <div>
          <MyPokemonList
            myPokemonListData={this.state.myPokemonList}
            onDelete={this.onDelete}
          />
        </div>
        <Footer onhandleModal={this.handleModal} status={this.state.isOpen} />
        <Modal
          onhandleModal={this.handleModal}
          onSearch={this.onSearch}
          onAdd={this.onAdd}
          status={this.state.isOpen}
          pokemonData={this.state.pokemonData}
        />
      </div>
    );
  }
}

export default App;
