import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct, WrapperProducts, WrapperButtonMore } from "./styled";
import Banner from "../../components/Banner/Banner";
import Card from "../../components/Card/Card";

const HomePage = () => {
    const category = ['category 1', 'category 2', 'category 3']
    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {category.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div >

            <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
                <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
                    <Banner />
                    <WrapperProducts>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </WrapperProducts>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore label="Xem thêm" type="outline"
                            styleButton={{
                                border: `1px solid rgb(11,116,229)`, color: 'rgb(11,116,229',
                                width: '240px', height: '38px', borderRadius: '4px'
                            }}
                            styleTextButton={{ fontWeight: 500 }}
                        />
                    </div>
                </div >
            </div>
        </>
    );
}

export default HomePage