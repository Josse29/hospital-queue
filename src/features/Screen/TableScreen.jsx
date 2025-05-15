import { FaTv } from "react-icons/fa";
import { Table } from "../../components";
import { FaPencil, FaPrint, FaTrashCan } from "react-icons/fa6";

const BtnActionPoli = (props) => {
  const { btnPrint, btnTv, btnUpdate, btnDelete, ...rest } = props;
  return (
    <div className="flex justify-center gap-2">
      <button
        className="bg-amber-600 hover:bg-amber-700 hover:ring-amber-700 hover:ring-2 hover:border-2 hover:border-[#dddddd] max-w-fit py-2 px-4 rounded-md cursor-pointer"
        onClick={btnPrint}
      >
        <FaPrint className="text-xl text-white" />
      </button>
      <button
        className="bg-green-600 hover:bg-green-700 hover:ring-green-700 hover:ring-2 hover:border-2 hover:border-[#dddddd] max-w-fit py-2 px-4 rounded-md cursor-pointer"
        onClick={btnTv}
      >
        <FaTv className="text-xl text-white" />
      </button>
      <button
        className="bg-sky-600 hover:bg-sky-700 hover:ring-sky-500 hover:ring-2 hover:border-2 hover:border-[#dddddd] max-w-fit py-2 px-4 rounded-md cursor-pointer"
        onClick={btnUpdate}
      >
        <FaPencil className="text-xl text-white" />
      </button>
      <button
        className="bg-red-700 hover:bg-red-800 hover:ring-red-500 hover:ring-2 hover:border-2 hover:border-[#dddddd] max-w-fit py-2 px-4 rounded-md cursor-pointer"
        onClick={btnDelete}
      >
        <FaTrashCan className="text-xl text-white" />
      </button>
    </div>
  );
};
const ListPoli = (props) => {
  const { listScreenPoli } = props;
  return (
    <>
      {listScreenPoli.length >= 1 && (
        <ul className="list-disc">
          {listScreenPoli.map((el) => (
            <li key={el._id}>{el.PoliName}</li>
          ))}
        </ul>
      )}
      {listScreenPoli.length < 1 && (
        <div className="italic text-slate-600 text-center">
          List is Empty....
        </div>
      )}
    </>
  );
};
const TableScreen = (props) => {
  const { screen, setDataScreen, setDeleteScreen, setUpdateScreen } = props;
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
              <Table.BodyCol
                title={
                  <BtnActionPoli
                    // btnPrint
                    btnPrint={() => {
                      window.open(`/take-queue/${el._id}`, "_blank");
                    }}
                    // btnTv
                    btnTv={() => {
                      window.open(`/screen/${el._id}`, "_blank");
                    }}
                    // delete
                    btnDelete={() => {
                      setDataScreen({
                        ScreenId: el._id,
                        ScreenName: el.ScreenName,
                      });
                      setDeleteScreen(true);
                    }}
                    // update
                    btnUpdate={() => {
                      setDataScreen({
                        ScreenId: el._id,
                        ScreenPoliSelected: el.ScreenPoli,
                        ScreenName: el.ScreenName,
                        ScreenInfo: el.ScreenInfo,
                      });
                      setUpdateScreen(true);
                    }}
                  />
                }
              />
            </Table.BodyRow>
          ))}
        {screen.length < 1 && (
          <Table.BodyRow className="bg-slate-300">
            <Table.BodyCol
              colSpan="4"
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
