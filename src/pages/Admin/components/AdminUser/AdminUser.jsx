import React from "react";
import { WrapperHeader, WrapperUploadFile } from "./styled"
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from "antd";
import AdminTable from "../AdminTable/AdminTable";
const AdminUser = () => {
    return (
        <div>
            <WrapperHeader>
                Quản lý người dùng
            </WrapperHeader>
            <div>
                <Button style={{ width: '150px', height: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                    <PlusCircleOutlined style={{ fontSize: '60px' }} />
                </Button>
                <div style={{ marginTop: '20px' }}> <AdminTable /></div>
            </div>
        </div>
    );
}

export default AdminUser;