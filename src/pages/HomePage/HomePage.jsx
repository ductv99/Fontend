import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct, WrapperProducts, WrapperButtonMore } from "./styled";
import Banner from "../../components/Banner/Banner";
import Card from "../../components/Card/Card";
import { useQuery } from "@tanstack/react-query";
import *  as ProductService from "../../service/ProductService"
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useDebounce } from "../../hook/useDebounce";

const HomePage = () => {
    const category = ['category 1', 'category 2', 'category 3']
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const [loading, setLoading] = useState(false)

    const [limit, setLimit] = useState(6)

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]

        // const regex = new RegExp(search, "i");
        const res = await ProductService.getAllProduct(search, limit)
        return res

    }

    const { isLoading, data: products, iskeepPreviousData } = useQuery({
        queryKey: ['products', limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true
    });


    return (
        <Loading isPending={loading || isLoading}>
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
                <div id="container" style={{ height: '1000px', width: '1280px', margin: '0 auto' }}>
                    <Banner />
                    <WrapperProducts>
                        {products?.data?.map((product) => {
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
                                    id={product._id}
                                />
                            )
                        })}
                    </WrapperProducts>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore
                            hidden={products?.total === products?.data?.length || products?.totalPage === 1}
                            label={iskeepPreviousData ? "Đang tải" : "Xem thêm"}
                            type="outline"
                            onClick={() => {
                                setLimit((prev) => prev + 6)
                            }}
                            styleButton={{
                                border: `1px solid rgb(11,116,229)`, color: 'rgb(11,116,229',
                                width: '240px', height: '38px', borderRadius: '4px',
                                color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11,116,229)'}`
                            }}
                            styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && "#fff" }}
                        />
                    </div>
                </div >
            </div>
        </Loading>
    );
}

export default HomePage