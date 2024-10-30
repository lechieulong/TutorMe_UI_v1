import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TableInput = ({ control, skill, partIndex, sectionIndex }) => {
  // Use useFieldArray to manage the rows of the table
  const {
    fields: rows,
    append,
    remove,
  } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.tableData`,
    control,
  });

  // Function to add a new row
  const addRow = () => {
    const newRow = { cells: Array(rows[0]?.cells.length).fill({ cell: "" }) }; // Add a new row with empty cells
    append(newRow); // Append the new row to the field array
  };

  // Function to remove a row
  const removeRow = (rowIndex) => {
    remove(rowIndex); // Directly remove the row from the field array
  };

  // Function to add a column to each row
  const addColumn = () => {
    rows.forEach((_, rowIndex) => {
      const newCell = { cell: "" }; // Create a new cell object
      const currentCells = rows[rowIndex]?.cells || []; // Get current cells or an empty array
      currentCells.push(newCell); // Append the new cell to the current row's cells

      // Re-append the updated row with the new cell
      const updatedRow = { cells: currentCells };
      remove(rowIndex); // Remove the existing row
      append(updatedRow); // Add the updated row
    });
  };

  // Function to remove a column from each row
  const removeColumn = (colIndex) => {
    rows.forEach((row, rowIndex) => {
      const updatedCells = row.cells.filter((_, index) => index !== colIndex); // Remove the cell at colIndex
      const updatedRow = { cells: updatedCells };
      remove(rowIndex); // Remove the existing row
      append(updatedRow); // Add the updated row
    });
  };

  return (
    <div>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            {rows.length > 0 &&
              rows[0]?.cells.map((_, colIndex) => (
                <th key={colIndex} className="border p-2">
                  <div className="flex items-center justify-between">
                    <span>Column {colIndex + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeColumn(colIndex)}
                      className="text-red-500"
                      title="Remove Column"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </th>
              ))}
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id}>
              {row.cells.map((cell, colIndex) => (
                <td key={colIndex} className="border p-2">
                  <Controller
                    name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.tableData.${rowIndex}.cells.${colIndex}.cell`}
                    control={control}
                    defaultValue={cell.cell || ""}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="border p-1 w-full"
                        placeholder="Enter value"
                      />
                    )}
                  />
                </td>
              ))}
              <td>
                <button
                  type="button"
                  onClick={() => removeRow(rowIndex)}
                  className="text-red-500"
                  title="Remove Row"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2">
        <button
          type="button"
          onClick={addRow}
          className="bg-blue-500 text-white p-1 rounded mr-2"
        >
          Add Row
        </button>
        <button
          type="button"
          onClick={addColumn}
          className="bg-blue-500 text-white p-1 rounded"
        >
          Add Column
        </button>
      </div>
    </div>
  );
};

export default TableInput;
