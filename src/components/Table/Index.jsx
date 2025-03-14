import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

export const Table = ({ colums, data }) => {
    const [info, setInfo] = useState(data)

    useEffect(() => {
        setInfo(data)
    }, [data])

    return (
        <DataGrid
            columns={colums}
            rows={info}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 7 }
                }
            }}
        />
    )
}