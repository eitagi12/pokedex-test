import React from "react";
import { Modal, Input } from "antd";

import Card from "../Card";

const suffix = (
  <div style={{ textAlign: "right" }}>
    <img src="search.png" width="20%" alt="search-logo" />
  </div>
);

const PokedexList = ({
  onhandleModal,
  onSearch,
  onAdd,
  status,
  pokemonData,
}) => {
  return (
    <Modal
      visible={status}
      footer={null}
      closable={false}
      onCancel={() => onhandleModal(true)}
      width={"45%"}
      bodyStyle={{ height: "675px", overflow: "scroll" }}
    >
      <div>
        <Input
          placeholder="Find Pokemon"
          onChange={(e) => onSearch(e.target.value)}
          suffix={suffix}
        />
        {pokemonData.map((item) => (
          <div key={item.id}>
            {<Card pokemonData={item} onAdd={onAdd} condition="add" />}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default PokedexList;
