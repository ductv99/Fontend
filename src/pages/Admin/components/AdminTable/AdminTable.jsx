import React from "react";
import { Table } from 'antd';
import Loading from "../../../../components/Loading/Loading";
const AdminTable = (props) => {
    const { selectionType = 'checkbox', data = [], columns = [], isLoading = false } = props

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div>
            <Loading isPending={isLoading}>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {
                    ...props
                    }
                />
            </Loading>
        </div>
    );
}

export default AdminTable;