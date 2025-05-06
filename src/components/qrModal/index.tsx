import BarcodeScanner from "@components/barCodeScanner";
import QrCodeScanner from "@components/qrScanner";
import { useModal } from "@refinedev/antd";
import { Button, Modal } from "antd";
import React, { useState } from "react";

type Props = {};

export const QrModal = (props: Props) => {
  const { show, modalProps, close} = useModal();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanning, setscanning] = useState(false);

  const handleScanResult = (result: string) => {
    setScanResult(result);
    console.log("Scanned QR code:", result);
  };

  const handleClose = () => {
    setScanResult(null);
    setscanning(false)
    console.log('handleClose',scanning);
    
  };

  return (
    <div>
      <Button size="middle" onClick={() => {
        setScanResult(null) 
        show()
      }
    }>
        Scan
      </Button>

      <Modal {...modalProps} onClose={handleClose}>
        <QrCodeScanner onResult={handleScanResult} handleClose={scanning}/>

        {/* <BarcodeScanner onScanSuccess={handleScanResult} /> */}
        {scanResult && <p>Scan Result: {scanResult}</p>}
      </Modal>
    </div>
  );
};
