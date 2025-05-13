import React from "react";
import { ButtonIcon, Card } from "../../components";
import TablePoliQueue from "./TablePoliQueue";
import { FaDownload } from "react-icons/fa6";

const CardPoliQueue = (props) => {
  const { poliName, poliColor, poliQueue } = props;
  return (
    <Card className="mb-6">
      <Card.Header
        headerTitle={poliName}
        style={{ backgroundColor: `rgb(${poliColor})` }}
      />
      <Card.Body>
        <div className="flex justify-end mb-3">
          <ButtonIcon
            title="Download"
            icon={<FaDownload />}
            className="bg-teal-500 hover:bg-teal-600 hover:ring-teal-700"
          />
        </div>
        <TablePoliQueue poliQueue={poliQueue} />
      </Card.Body>
    </Card>
  );
};

export default CardPoliQueue;
