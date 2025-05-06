import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface BarcodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanSuccess }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeScannerRef = useRef<Html5QrcodeScanner | null>(null);


  useEffect(() => {
    const initializeScanner = () => {
        if (!scannerRef.current) return;

        html5QrCodeScannerRef.current = new Html5QrcodeScanner(
            scannerRef.current.id,
            { fps: 10, qrbox: 250 },
            false
        );

        html5QrCodeScannerRef.current.render(
            (decodedText, decodedResult) => {
                onScanSuccess(decodedText);
                if (html5QrCodeScannerRef.current) {
                    html5QrCodeScannerRef.current.clear();
                }
                
            },
            (errorMessage) => {
                console.error(`Error scanning: ${errorMessage}`);
            }
        );
    };

    initializeScanner();

    return () => {
        if (html5QrCodeScannerRef.current) {
            html5QrCodeScannerRef.current.clear();
        }
    };
  }, [onScanSuccess]);


  return <div id="reader" ref={scannerRef}></div>;
};

export default BarcodeScanner;