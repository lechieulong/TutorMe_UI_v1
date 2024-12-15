
import Papa from "papaparse";

export const handleExport = (data) => {
    console.log(data);
    const csvData = Papa.unparse(data); // Chuyển dữ liệu sang CSV
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };