import React, { useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

let html5QrCode;
var lastResult;

const QuickResponse = (props) => {
  const [toggleVisibility, setToggleVisibility] = useState(true);

  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader", {
      // Use this flag to turn on the feature.
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
    });
  });

  let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.7; // 70%
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);

    setToggleVisibility(!toggleVisibility);
    return {
      width: qrboxSize,
      height: qrboxSize,
    };
  };

  const handleClickAdvanced = () => {
    try {
      console.log(1);
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        if (decodedText !== lastResult) {
          lastResult = decodedText;
          props.handleQuickResponse(decodedResult);
          // Handle on success condition with the decoded message.

          console.log(`Scan result ${decodedText}`, decodedResult);
        }
      };
      html5QrCode
        .start(
          { facingMode: "environment" },

          {
            fps: 30,
            qrbox: qrboxFunction,
          },

          qrCodeSuccessCallback
          // (errorMessage) => {
          //   console.log("Err1",errorMessage)
          // }
        )
        .catch((err) => console.log("Error4", err));
    } catch (err) {
      console.log("error3", err);
    }
  };

  const handleStop = () => {
    try {
      setToggleVisibility(!toggleVisibility);

      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      html5QrCode.clear();
      console.log("Error2", err);
    }
  };

  return (
    <>
      <div    style={{ position: "relative" }}>
        <div className="mx-auto" style={{ height: "50%", width: "50%" }}>
          <div id="reader" width="100%" />
        </div>
        <div  className="mx-auto"  style={{ width: "10%" , marginTop: "5px" }}>
          {toggleVisibility ? (
            <button
              onClick={() => handleClickAdvanced()}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Scanning
            </button>
          ) : (
            <button
              onClick={() => handleStop()}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Stop Scanning
            </button>
          )}
        </div>
      </div>
    </>
    // <div style={{ position: "relative" }}>
    //   <div id="reader" width="100%" />
    // </div>
  );
};
export default QuickResponse;
