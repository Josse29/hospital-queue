import React, { useEffect } from "react";
import { Button, Modal } from "../../components";

const ModalPrintQueue = (props) => {
  const { openPrint, setOpenPrint, printQueue } = props;
  return (
    <Modal openModal={openPrint} width="w-[380px]">
      <Modal.Header headerText="Print" className="bg-teal-600" />
      <Modal.Body>
        <div className="p-4">
          <div className="text-6xl text-center mb-3">{printQueue.Code}</div>
          <div className="text-center text-xl mb-2">
            Nomor Antrian {printQueue.No} ke {printQueue.PoliName}
          </div>
          <div className="text-center text-md mb-1">
            Tanggal : {printQueue.Date}
          </div>
          <div className="text-center text-md mb-1">
            Waktu : {printQueue.Time}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          title="Done"
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => setOpenPrint(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPrintQueue;
