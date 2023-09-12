import React from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
const DataTableComp = ({
    data = () => { },
    columns = () => { },
}) => {

    return (
        <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"
            filterable={true}   
            previousText='<'
            nextText= '>'
            loadingText= 'Loading...'
            noDataText= 'No data'
            pageText= 'Page'
            ofText= 'of'
            rowsText= 'row'
        />
    )
}

export const DataTable = React.memo(DataTableComp)