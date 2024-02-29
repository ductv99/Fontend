import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct, WrapperProducts, WrapperButtonMore } from "./styled";
import Banner from "../../components/Banner/Banner";
import Card from "../../components/Card/Card";
import { useQuery } from "@tanstack/react-query";
import *  as ProductService from "../../service/ProductService"

const HomePage = () => {
    const category = ['category 1', 'category 2', 'category 3']
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct()
        // console.log("res", res)
        return res
    }
    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        // retry: 3,
        // retryDelay: 1000,
    });
    // console.log("data", products)
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
                        {products?.data.map((product) => {
                            return (
                                <Card key={product._id}
                                    countInstock={product.countInstock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    selled={product.selled}
                                    discount={product.discount}
                                    type={product.type}
                                />
                            )
                        })}
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