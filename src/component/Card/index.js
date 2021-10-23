import React from "react";
import { Progress, Row, Col } from "antd";
import "./card.css";

const Card = ({
  pokemonData,
  onAdd = () => {},
  onDelete = () => {},
  condition,
}) => {
  const Happiness = ({ total }) => {
    return (
      <div className="happyness-body">
        {Array.from(new Array(total)).map((value, i) => (
          <span key={i} className="img-happy">
            <img
              key={`happiness${i}`}
              src="cute.png"
              width="15%"
              alt="cute-logo"
            />
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="card" style={{ margin: "10px" }}>
        <Row className="listBody">
          <Col md={8}>
            <img
              src={pokemonData.imageUrl}
              width="70%"
              alt={pokemonData.name}
            />
          </Col>
          <Col md={15}>
            <div className="name">{pokemonData.name}</div>
            <Row>
              <Col className="title-detail" md={6}>
                HP
              </Col>
              <Col md={18}>
                <div style={{ paddingTop: "3px" }}>
                  <Progress
                    strokeColor="#f3701a"
                    strokeWidth="30px"
                    percent={pokemonData.hp}
                    showInfo={false}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="title-detail" md={6}>
                STR
              </Col>
              <Col md={18}>
                <div style={{ paddingTop: "3px" }}>
                  <Progress
                    strokeColor="#f3701a"
                    strokeWidth="25px"
                    percent={pokemonData.strength}
                    showInfo={false}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="title-detail" md={6}>
                WEAK
              </Col>
              <Col md={18}>
                <div style={{ paddingTop: "3px" }}>
                  <Progress
                    strokeColor="#f3701a"
                    strokeWidth="30px"
                    percent={pokemonData.weakness}
                    showInfo={false}
                  />
                </div>
              </Col>
            </Row>

            <Happiness total={Math.round(pokemonData.happiness)} />
          </Col>
          <Col className="addSection" md={1}>
            <div
              className="add-btn"
              onClick={() =>
                condition === "add"
                  ? onAdd(pokemonData.id)
                  : onDelete(pokemonData.id)
              }
            >
              {condition === "add" ? "Add" : "X"}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Card;
