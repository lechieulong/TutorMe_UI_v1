import React, { useEffect } from 'react';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net';

const DataTable = () => {
  useEffect(() => {
    $('#example').DataTable();
  }, []);

  return (
    <div className="p-4 w-full">
      <table id="example" className="display w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Age</th>
            <th>Start date</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>61</td>
            <td>2011/04/25</td>
            <td>$320,800</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
