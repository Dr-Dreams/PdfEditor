import axios from "axios";
import { useRef, useState } from "react";

export default function PdfViewerComponent() {
  const containerRef = useRef(null);
  const [isdata, setIsData] = useState(false);
  const [message, setMessage] = useState(null);
  const [pdfInstance, setPdfInstance] = useState(null);

  const loadPdf = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/file", {
        responseType: "blob",
      });

      const blob = await response.data;

      const documentBlobObjectUrl = URL.createObjectURL(blob);
      const container = containerRef.current;
      const PSPDFKit = await import("pspdfkit");

      PSPDFKit.unload(container);

      const instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: documentBlobObjectUrl,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
      setIsData(true);
      setPdfInstance(instance);
      setMessage("");
      return () => PSPDFKit && PSPDFKit.unload(container);
    } catch (error) {
      console.error("error loading pdf :", error);

      document
        .getElementById("message")
        .classList.remove("dark:text-green-500");
      document.getElementById("message").classList.add("dark:text-red-500");
      setMessage("Failed to load Pdf 😔");
    }
  };

  const savePdf = async () => {
    if (!isdata || !pdfInstance) {
      document
        .getElementById("message")
        .classList.remove("dark:text-green-500");
      document.getElementById("message").classList.add("dark:text-red-500");
      setMessage("File save failed. No PDF data available.");
      return;
    }

    try {
      const modifiedPdfBlob = await pdfInstance.exportPDF();
      const arrayBuffer = await new Response(modifiedPdfBlob).arrayBuffer();

      const uint8Array = new Uint8Array(arrayBuffer);

      const response = await axios.put(
        "http://localhost:8081/api/v1/file",
        {
          pdfData: Array.from(uint8Array),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("PDF saved successfully");
        document
          .getElementById("message")
          .classList.remove("dark:text-red-500");
        document.getElementById("message").classList.add("dark:text-green-500");
        setMessage("PDF saved successfully 👍");
      } else {
        console.error("Failed to save PDF");
        document
          .getElementById("message")
          .classList.remove("dark:text-green-500");
        document.getElementById("message").classList.add("dark:text-red-500");
        setMessage("Failed to save PDF 😔");
      }
    } catch (error) {
      console.error("Failed to save PDF :", error);
      document
        .getElementById("message")
        .classList.remove("dark:text-green-500");
      document.getElementById("message").classList.add("dark:text-red-500");
      setMessage("Failed to save PDF 😔");
    }
  };

  return (
    <div className="flex-wrap text-center justify-center items-center my-10">


      <button
        onClick={loadPdf}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        LOAD Pdf
      </button>
      <button
        onClick={savePdf}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        SAVE Pdf
      </button>

      <div id="message" className="text-3xl font-extrabold dark:text-red-500">
        {message}
      </div>

      <div
        className="m-auto"
        ref={containerRef}
        style={{ width: "80%", height: "100vh" }}
      />
    </div>
  );
}
