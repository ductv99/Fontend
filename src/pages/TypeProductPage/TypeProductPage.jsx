import React from "react";
import Navbar from '../../components/Navbar/Navbar'
import Card from "../../components/Card/Card";
import { WrapperProducts, WrapperNavbar } from "./styled"
import { Row, Pagination, Col } from "antd";

const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)' }}>
            <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                    <WrapperNavbar span={4}>
                        <Navbar />
                    </WrapperNavbar>
                    <Col span={20}>
                        <WrapperProducts >
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </WrapperProducts>
                        <Pagination showQuickJumper defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default TypeProductPage;