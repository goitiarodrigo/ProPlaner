import styles from './DynamicTable.module.scss'
import { Table } from "react-bootstrap";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
  } from "react-table";
import { angleDown, angleUp } from '@/assets/svgs'
import GlobalFilter from '@/components/globalFilter/GlobalFilter'
import Paginated from '@/components/paginated/Paginated';

interface IRow {
    user_id: string;
    user_name: string;
    user_email: string;
    user_open: JSX.Element;
}

interface IColumns {
    Header: string;
    accessor: string;
}

interface IProps {
    columns: IColumns[],
    rowData: IRow[]
}

const DynamicTable = ({columns, rowData}: IProps) => {

    const tableInstance = useTable(
        {
          columns: columns,
          data: rowData,
        },
        useGlobalFilter,
        useSortBy,
    );

    const {
        headerGroups,
        getTableBodyProps,
        prepareRow,
        state,
        setGlobalFilter,
        rows,
      } = tableInstance;

    const { globalFilter } = state;
    return (
        <>
            <div className={styles.manipulate_data}>
                <Paginated  pageQuantity={5}/>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className={styles.table}>
                <Table
                    role='table'
                    responsive
                    className={`table-borderless text-nowrap ${styles.inside_table}`}
                >
                    <thead className={styles.thead_container}>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={column.className}
                                >
                                    <span className={styles.table_title}>
                                        {column.render("Header")}
                                    </span>
                                    <span>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <span style={{ position: "absolute" }}>
                                                {angleUp}
                                            </span>
                                        ) : (
                                            <span style={{ position: "absolute" }}>
                                                {angleDown}
                                            </span>
                                        )
                                    ) : (
                                        ""
                                    )}
                                    </span>
                                </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className={styles.tbody_container} {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                    <td title={cell.value} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default DynamicTable