import React from "react";
import { Card } from "../../components";
import TableQueue from "./TableQueue";

const CardPoli = (props) => {
  const { poliName, poliColor, poliQueue } = props;
  return (
    <Card className="mb-3">
      <Card.Header
        headerTitle={poliName}
        style={{ backgroundColor: `rgb(${poliColor})` }}
      />
      <Card.Body>
        <TableQueue poliQueue={poliQueue} />
      </Card.Body>
    </Card>
  );
};

export default CardPoli;
