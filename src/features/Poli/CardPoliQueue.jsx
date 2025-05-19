import React from "react";
import { Card } from "../../components";
import TablePoliQueue from "./TablePoliQueue";
import BtnDownloadPoliQueue from "./BtnDownloadPoliQueue";

const CardPoliQueue = (props) => {
  const { poliId, poliName, poliColor, poliQueue } = props;
  return (
    <Card className="mb-6">
      <Card.Header
        headerTitle={poliName}
        style={{ backgroundColor: `rgb(${poliColor})` }}
      />
      <Card.Body>
        <div className="flex justify-end mb-3">
          <BtnDownloadPoliQueue poliId={poliId} />
        </div>
        <div className="overflow-x-auto">
          <TablePoliQueue poliId={poliId} poliQueue={poliQueue} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPoliQueue;
