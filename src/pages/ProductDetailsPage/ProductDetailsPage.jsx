import React from "react";
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <div style={{ padding: '0 120px', background: '#efefef', height: '1000px' }}>
            <h5><span style={{ cursor: "pointer", fontWeight: 'bold' }} onClick={() => { navigate("/") }}>Trang chủ</span> {'>>'} Chi tiết sản phẩm</h5>
            <ProductDetails idProduct={id} />
        </div>
    );
}

export default ProductDetailsPage
// width: 100 %; background - color: ;