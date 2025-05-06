import React, { useState, useEffect, useRef } from "react";
import {
  Html5Qrcode,
  Html5QrcodeScanner,
  Html5QrcodeResult,
} from "html5-qrcode";
import { Button, Modal } from "antd";
import { useModal } from "@refinedev/antd";

interface QrCodeScannerProps {
  onResult: (result: string) => void;
  handleClose: boolean;
  fps?: number;
  qrbox?: number;
  disableFlip?: boolean;
  aspectRatio?: number;
}

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({
  onResult,
  handleClose,
  fps = 10,
  qrbox = 250,
  disableFlip = false,
  aspectRatio,
  
}) => {
  const [scanning, setScanning] = useState(false);
  const [stop, setStop] = useState(false);

  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

  
  // const handleClose = () => {
  //   setScanning(false)

  // };

  useEffect(() => {
    const initScanner = async () => {
      if (!scannerRef.current) return;

      const config = {
        fps,
        qrbox,
        disableFlip,
        aspectRatio,
      };

      const scanner = new Html5QrcodeScanner(
        scannerRef.current.id,
        config,
        /* verbose= */ false
      );

      html5QrcodeScannerRef.current = scanner;

      const onScanSuccess = (
        decodedText: string,
        decodedResult: Html5QrcodeResult
      ) => {
        onResult(decodedText);
        scanner.clear();
        setScanning(false);
      };

      const onScanFailure = (error: string) => {
        console.warn(`QR code scan failed: ${error}`);
      };

      try {
        await scanner.render(onScanSuccess, onScanFailure);
        setScanning(true);
      } catch (error) {
        console.error("Error starting scanner:", error);
      }
    };

    if (scanning) {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear();
      }
      setScanning(false);
    } else {
      initScanner();
    }

    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear();
      }
    };
  }, [onResult, handleClose, stop]);

  return (
    <div>
     
        <div id="reader" ref={scannerRef} />
          <Button onClick={() => setScanning(true)}>Start Scanning</Button>
     
          <Button onClick={() => setStop(false)}>Stop Scanning</Button>

        
    </div>
  );
};

export default QrCodeScanner;
