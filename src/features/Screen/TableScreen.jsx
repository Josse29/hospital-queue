import React, { useEffect, useState } from "react";
import { ButtonAction, Table } from "../../components";

const ListPoli = (props) => {
  const { listScreenPoli } = props;
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(listScreenPoli);
  }, []);
  return (
    <>
      {list.length >= 1 && (
        <ul className="list-disc">
          {list.map((el) => (
            <li key={el._id}>{el.PoliName}</li>
          ))}
        </ul>
      )}
      {list.length < 1 && (
        <div className="italic text-slate-600 text-center">
          List is Empty....
        </div>
      )}
    </>
  );
};
const TableScreen = (props) => {
  const { screen } = props;
  return (
    <Table>
      <Table.HeadRow>
        <Table.HeadCol title="No" className="w-[80px]" />
        <Table.HeadCol title="Screen Name" className="w-[190px]" />
        <Table.HeadCol title="Screen Poli" className="w-[190px]" />
        <Table.HeadCol title="Actions" className="w-[190px]" />
      </Table.HeadRow>
      <Table.Body>
        {screen.length >= 1 &&
          screen.map((el, i) => (
            <Table.BodyRow
              key={el._id}
              className={`${(i + 1) % 2 !== 0 ? "bg-slate-300" : ""}`}
            >
              <Table.BodyCol title={i + 1} className="text-center" />
              <Table.BodyCol title={el.ScreenName} />
              <Table.BodyCol
                title={<ListPoli listScreenPoli={el.ScreenPoli} />}
              />
              <Table.BodyCol title={<ButtonAction />} />
            </Table.BodyRow>
          ))}
        {screen.length < 1 && (
          <Table.BodyRow className="bg-slate-300">
            <Table.BodyCol
              colspan="4"
              title="Screen is not Found"
              className="text-center italic font-bold"
            />
          </Table.BodyRow>
        )}
      </Table.Body>
    </Table>
  );
};

export default TableScreen;
