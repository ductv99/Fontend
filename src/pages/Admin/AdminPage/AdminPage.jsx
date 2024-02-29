import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getItem } from "../../../untils";
import Header from "../../../components/Header/Header";
import AdminUser from "../components/AdminUser/AdminUser";
import AdminProduct from "../components/AdminProduct/AdminProduct";

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />)
    ];
    const [slectedKey, setSelectedKey] = useState('');


    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />
            case 'product':
                return <AdminProduct />
            default:
                return <></>
        }


    }


    const handleClick = ({ key }) => {
        setSelectedKey(key)
    }
    return (
        <>
            <Header isHisddensearch isHisddenCart />
            <div style={{ display: 'flex' }}>
                < Menu
                    mode="inline"
                    style={{
                        width: 256,
                        height: '100vh',
                        boxShadow: '1px 1px 2px #ccc'
                    }
                    }
                    items={items}
                    onClick={handleClick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(slectedKey)}
                </div>

            </div>
        </>
    );
}

export default AdminPage;