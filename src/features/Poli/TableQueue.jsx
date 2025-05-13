import React, { useState } from "react";
import { Button, Table } from "../../components";
import { FaBell } from "react-icons/fa6";

const TableQueue = (props) => {
  const { poliQueue } = props;
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
              className={`${(i + 1) % 2 !== 0 ? "bg-slate-200" : ""}`}
            >
              <Table.BodyCol title={el.No} className="text-center" />
              <Table.BodyCol title={el.Date} />
              <Table.BodyCol title={el.Time} className="text-center" />
              <Table.BodyCol title={el.PoliName} />
              <Table.BodyCol title={el.PoliCode} />
              <Table.BodyCol
                title={
                  <Button
                    title={<FaBell />}
                    className="bg-amber-600 hover:bg-amber-700 hover:ring-amber-700"
                  />
                }
                className="text-center"
              />
            </Table.BodyRow>
          ))}
      </Table.Body>
    </Table>
  );
};

export default TableQueue;
