import { Col, Image, Row } from "antd";
import React from "react";
import imageTest from '../../assets/images/imageTest.jpeg'
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons"
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import {
    WrapperStyleImageSmall,
    WrapperStyleColImage,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperAddressProduct,
    WrapperQualityProduct,
    WrapperInputNumber
} from './styled'

const ProductDetails = () => {
    const onChange = () => { }
    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height: '100%' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <Image src={imageTest} alt='product' preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageTest} alt='product' preview="false" />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageTest} alt='product' preview="false" />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageTest} alt='product' preview="false" />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageTest} alt='product' preview="false" />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageTest} alt='product' preview="false" />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage>
                        <WrapperStyleImageSmall src={imageTest} alt='product' preview="false" />
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperStyleNameProduct>Sach abc adsg</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                    <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        200.000 vnd
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến </span>
                    <span className='address'>dia chi abc</span> -
                    <span className='change-address'>Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                    <div style={{ marginBottom: '6px' }}>Số lượng: </div>
                    <WrapperQualityProduct>
                        <div>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </div>
                    </WrapperQualityProduct>
                </div>
                <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
                    <div>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            // onClick={handleAddOrderProduct}
                            label={'Chọn mua'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                        {/* {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>} */}
                    </div>
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13, 92, 182)',
                            borderRadius: '4px'
                        }}
                        label={'Mua trả sau'}
                        styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                    ></ButtonComponent>
                </div>
            </Col>
        </Row>
    );
}

export default ProductDetails;