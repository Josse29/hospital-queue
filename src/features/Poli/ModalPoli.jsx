import { useEffect, useState } from "react";
import { Button, Modal } from "../../components";
import { getPoliAPI } from "../../services/poli";
import ListPoli from "./ListPoli";
import DeletePoli from "./DeletePoli";
import UpdatePoli from "./UpdatePoli";
import SearchPoli from "./SearchPoli";

const ModalPoli = (props) => {
  const { openPoli, setOpenPoli, getPoliQueue } = props;
  const [poli, setPoli] = useState([]);
  const [method, setMethod] = useState("read");
  const [data, setData] = useState({
    PoliId: "",
    PoliName: "",
    PoliCode: "",
    Red: 200,
    Green: 200,
    Blue: 200,
  });
  const [loading, setLoading] = useState(false);
  const getPoli = async () => {
    setLoading(true);
    try {
      const response = await getPoliAPI("");
      setPoli(response.data);
    } catch (error) {
      throw error;
    } finally {
      setMethod("read");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (openPoli && method === "read") {
      getPoli();
    }
  }, [openPoli]);
  return (
    <Modal openModal={openPoli} width="w-[550px]">
      <Modal.Header
        headerText="Poli"
        className={`${method === "delete" ? "bg-red-500" : "bg-sky-600"}`}
      />
      {/* read */}
      {method === "read" && (
        <>
          <Modal.Body>
            {/* search */}
            <div className="mb-3">
              <SearchPoli setPoli={setPoli} />
            </div>
            {loading && (
              <div className="text-2xl text-center my-10 italic">
                Loading....
              </div>
            )}
            {!loading && (
              <>
                {/* poli existed */}
                {poli.length >= 1 && (
                  <>
                    {poli.map((el) => (
                      <ListPoli
                        key={el._id}
                        poliId={el._id}
                        poliName={el.PoliName}
                        poliCode={el.PoliCode}
                        poliColor={el.PoliColor}
                        setMethod={setMethod}
                        setData={setData}
                      />
                    ))}
                  </>
                )}
                {/* poli existed */}
                {poli.length < 1 && (
                  <div className="h-[200px] flex">
                    <div className="m-auto text-2xl text-slate-600 italic font-bold ">
                      Poli is Empty..
                    </div>
                  </div>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              title="Done"
              type="button"
              onClick={() => setOpenPoli(false)}
              className="bg-sky-500 hover:bg-sky-600 hover:ring-sky-600"
            />
          </Modal.Footer>
        </>
      )}
      {/* update */}
      {method === "update" && (
        <UpdatePoli
          getPoliQueue={getPoliQueue}
          data={data}
          setData={setData}
          setOpenPoli={setOpenPoli}
          setMethod={setMethod}
          method={method}
        />
      )}
      {/* delete */}
      {method === "delete" && (
        <DeletePoli
          getPoliQueue={getPoliQueue}
          data={data}
          setData={setData}
          setOpenPoli={setOpenPoli}
          setMethod={setMethod}
          method={method}
        />
      )}
    </Modal>
  );
};

export default ModalPoli;
