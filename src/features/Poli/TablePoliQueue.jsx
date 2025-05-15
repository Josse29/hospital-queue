import React, { useState } from "react";
import { Table } from "../../components";
import BtnRingQueue from "./BtnRingQueue";

const TablePoliQueue = (props) => {
  const { poliId, poliQueue } = props;
  return (
    <Table>
      <Table.HeadRow>
        <Table.HeadCol title="No" className="w-[80px]" />
        <Table.HeadCol title="Date" className="w-[120px]" />
        <Table.HeadCol title="Time" className="w-[100px]" />
        <Table.HeadCol title="Poli Name" className="w-[180px]" />
        <Table.HeadCol title="Poli Code" className="w-[180px]" />
        <Table.HeadCol title="Queue Ring" className="w-[180px]" />
      </Table.HeadRow>
      <Table.Body>
        {poliQueue.length >= 1 &&
          poliQueue.map((el, i) => (
            <Table.BodyRow
              key={i}
              className={`${(i + 1) % 2 !== 0 ? "bg-slate-200" : ""}`}
            >
              <Table.BodyCol title={el.No} className="text-center" />
              <Table.BodyCol title={el.Date} />
              <Table.BodyCol title={el.Time} className="text-center" />
              <Table.BodyCol title={el.PoliName} />
              <Table.BodyCol title={el.Code} className="text-center" />
              <Table.BodyCol
                title={<BtnRingQueue data={el} poliId={poliId} />}
                className="text-center"
              />
            </Table.BodyRow>
          ))}
        {poliQueue.length < 1 && (
          <Table.BodyRow className="bg-slate-200">
            <Table.BodyCol
              title="Queue is Empty..."
              className="text-center italic"
              colSpan="6"
            />
          </Table.BodyRow>
        )}
      </Table.Body>
    </Table>
  );
};

export default TablePoliQueue;
