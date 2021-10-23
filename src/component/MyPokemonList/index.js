import React from "react";
import { Row, Col } from "antd";
import "./myPokemonList.css";

import Card from "../Card";

const MyPokemonList = ({ myPokemonListData, onDelete }) => {
  return (
    <div>
      <Row className="myPokelist">
        {myPokemonListData.map((item) => (
          <Col md={12} key={item.id}>
            {<Card pokemonData={item} onDelete={onDelete} condition="delete" />}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyPokemonList;
