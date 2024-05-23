import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import mdata from "../../salaries.json";
import "./BasicTable.css";
const BasicTable = () => {
  const data = useMemo(() => mdata, []);

  const columns = [
    {
      header: "Work Year",
      accessorKey: "work_year",
    },
    {
      header: "Experience Level",
      accessorKey: "experience_level",
    },
    {
      header: "Employment Type",
      accessorKey: "employment_type",
    },
    {
      header: "Job Title",
      accessorKey: "job_title",
    },
    {
      header: "Salary",
      accessorKey: "salary",
    },
    {
      header: "Salary Currency",
      accessorKey: "salary_currency",
    },
    {
      header: "Salary In USD",
      accessorKey: "salary_in_usd",
    },
    {
      header: "Employee Residence",
      accessorKey: "employee_residence",
    },
    {
      header: "Remote Ratio",
      accessorKey: "remote_ratio",
    },
    {
      header: "Company Location",
      accessorKey: "company_location",
    },
    {
      header: "Company Size",
      accessorKey: "company_size",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div className="t1">
      <input type="text" value={filtering} onChange={(e) => e.target.value} />
      <table className="t2">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder ? null : (
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: "⬆️", desc: "⬇️" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => {
            table.setPageIndex(0);
          }}
        >
          First Page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
        >
          Previous Page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
        >
          Next Page
        </button>
        <button
          onClick={() => {
            table.setPageIndex(table.getPageCount - 1);
          }}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
