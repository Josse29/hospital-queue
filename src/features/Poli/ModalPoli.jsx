import React, { useEffect, useState } from "react";
import { Button, InputSearch, Modal } from "../../components";
import { deletePoliAPI, getPoliAPI, updatePoliAPI } from "../../services/poli";
import ListPoli from "./ListPoli";
import DeletePoli from "./DeletePoli";
import { ButtonIcon } from "../../components";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdatePoli from "./UpdatePoli";

const ModalPoli = (props) => {
  const { openPoli, setOpenPoli } = props;
  const [poli, setPoli] = useState([]);
  const [method, setMethod] = useState("read");
  const [data, setData] = useState({
    PoliId: "",
    PoliName: "",
    PoliCode: "",
    Red: 125,
    Green: 0,
    Blue: 255,
  });
  const [loading, setLoading] = useState(false);
  const getPoli = async () => {
    setLoading(true);
    try {
      const response = await getPoliAPI();
      setPoli(response.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const cbAction = async (msg) => {
    Swal.fire({
      title: msg.data.msg,
      icon: "success",
    });
    await getPoli();
    setMethod("read");
    setOpenPoli(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { PoliId, PoliName, PoliCode, PoliColor, Red, Green, Blue } = data;
    try {
      if (method === "delete") {
        const msg = await deletePoliAPI(PoliId);
        await cbAction(msg);
      }
      if (method === "update") {
        const data = {
          PoliId,
          PoliName,
          PoliCode,
          PoliColor: `${Red},${Green},${Blue}`,
        };
        const msg = await updatePoliAPI(data);
        await cbAction(msg);
      }
    } catch (error) {
      Swal.fire({
        title: error.response.data.errMsg,
        icon: "error",
      });
    }
  };
  useEffect(() => {
    getPoli();
  }, [openPoli]);
  return (
    <Modal openModal={openPoli} width="w-[550px]">
      <Modal.Header
        headerText="Poli"
        className={`${method === "delete" ? "bg-red-500" : "bg-sky-600"}`}
      />
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {loading && <div>loading....</div>}
          {!loading && (
            <>
              {/* read */}
              {method === "read" && (
                <>
                  {poli.length >= 1 && (
                    <>
                      {/* search */}
                      <div className="mb-3">
                        <InputSearch>
                          <InputSearch.Input
                            placeholder="Input Keyword Poli...."
                            className="focus:outline-sky-600 w-full"
                          />
                          <InputSearch.Btn className="bg-sky-500 hover:bg-sky-600" />
                        </InputSearch>
                      </div>
                      {/* list */}
                      <ListPoli
                        poli={poli}
                        setMethod={setMethod}
                        setData={setData}
                      />
                    </>
                  )}
                  {poli.length < 1 && (
                    <div className="h-[200px] flex">
                      <div className="m-auto text-2xl text-slate-600 italic font-bold ">
                        Poli is Empty..
                      </div>
                    </div>
                  )}
                </>
              )}
              {/* delete */}
              {method === "delete" && <DeletePoli data={data} />}
              {/* update */}
              {method === "update" && (
                <UpdatePoli data={data} setData={setData} />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {method === "read" && (
            <Button
              title="Done"
              type="button"
              onClick={() => setOpenPoli(false)}
              className="bg-sky-500 hover:bg-sky-600 hover:ring-sky-600"
            />
          )}
          {method === "update" && (
            <>
              <Button
                title="Cancel"
                type="button"
                onClick={() => setMethod("read")}
                className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-600"
              />
              <Button
                title="Done"
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 hover:ring-sky-600"
              />
            </>
          )}
          {method === "delete" && (
            <>
              <ButtonIcon
                title="No"
                icon={<FaTimes />}
                onClick={() => setMethod("read")}
                type="button"
                className="bg-slate-500 hover:bg-slate-600 hover:ring-slate-600"
              />
              <ButtonIcon
                title="Yes"
                icon={<FaCheck />}
                type="submit"
                className="bg-red-500 hover:bg-red-600 hover:ring-red-600"
              />
            </>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalPoli;
