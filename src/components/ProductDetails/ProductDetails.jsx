import React, { useState } from "react";
import { Col, Image, Row } from "antd";
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
import { useSelector } from "react-redux";
import * as ProductService from '../../service/ProductService'
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";



const ProductDetails = ({ idProduct }) => {
    const [numberProduct, setNumberProduct] = useState(0)
    const user = useSelector((state) => state?.user)
    const onChange = (value) => {
        setNumberProduct(Number(value))
    }

    const fetchGetDetailProduct = async (idProduct) => {
        const id = idProduct?.queryKey && idProduct.queryKey[1]
        const res = await ProductService.getDetailProduct(id)
        return res.data
    }
    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumberProduct(numberProduct + 1)
        }
        else if (type === 'decrease' && numberProduct > 0) {
            setNumberProduct(numberProduct - 1)
        }
    }

    const { isLoading, data: productDetail } = useQuery({
        queryKey: ['productDetail', idProduct],
        queryFn: fetchGetDetailProduct,
        enabled: !!idProduct
    });
    const renderStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<StarFilled key={i} style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />);
        }
        return stars;
    };


    return (
        <Loading isPending={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height: 'fit-content' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetail?.image} alt='product' preview={false} style={{ width: "400px", height: "500px" }} />
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
                    <WrapperStyleNameProduct>{productDetail?.name}</WrapperStyleNameProduct>
                    <div>
                        {renderStars(productDetail?.rating)}
                        <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>
                            {productDetail?.price} vnd
                        </WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'>{user?.address}</span> -
                        <span className='change-address'>Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '6px' }}>Số lượng: </div>
                        <WrapperQualityProduct>
                            <div>
                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                    <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                                </button>
                                <WrapperInputNumber onChange={onChange} size="small" defaultValue={0} value={numberProduct} />
                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')} >
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
        </Loading>
    );
}

export default ProductDetails;