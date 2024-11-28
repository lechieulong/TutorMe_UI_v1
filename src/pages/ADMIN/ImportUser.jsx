import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { FaFileDownload } from "react-icons/fa";

const ImportUser = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fileURL = '/files/ImportUser.xlsx';
                const response = await fetch(fileURL);
                const blob = await response.blob();
                const ab = await blob.arrayBuffer();
                const wb = XLSX.read(ab, { type: 'array' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(ws);
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching file:", error.message);
            }
        };
    
        fetchData();
    }, []);

    //Download file từ <a/> - thêm download vào thẻ
    const downloadFile = () => {
        const link = document.createElement('a');
        link.href = '/files/ImportUser.xlsx';
        link.setAttribute('download', 'ImportUser.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="flex items-center justify-end space-x-2 mb-2">
                <button className="p-2 rounded-lg hover:bg-gray-200 transition" onClick={downloadFile}>
                    <FaFileDownload className="text-red-500 text-2xl" />
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Import User</button>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key) => (
                            <th key={key} className="border px-4 py-2">{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex} className="border px-4 py-2">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ImportUser;
