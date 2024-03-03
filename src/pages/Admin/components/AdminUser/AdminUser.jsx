import React, { useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./styled"
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from "antd";
import AdminTable from "../AdminTable/AdminTable";


const AdminUser = () => {
    const [rowSelected, setRowSelected] = useState('')
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => { }} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={() => { }} />
            </div>
        )
    }
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'type',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    return (
        <div>
            <WrapperHeader>
                Quản lý người dùng
            </WrapperHeader>
            <div>
                <Button style={{ width: '150px', height: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                    <PlusCircleOutlined style={{ fontSize: '60px' }} />
                </Button>
                <div style={{ marginTop: '20px' }}>
                    <AdminTable
                        columns={columns}
                        // data={dataTable}
                        // isLoading={isLoading}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    setRowSelected(record._id)
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminUser;