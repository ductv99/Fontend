import React, { useEffect, useMemo, useState } from "react";
import { WrapperFooterItem, WrapperStatus, WrapperContainer, WrapperItemOrder, WrapperHeaderItem, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './styled';
import { useQuery } from "@tanstack/react-query";
import * as OrderService from '../../service/OrderService'
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { convertPrice } from "../../untils";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const MyOrderPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id, state?.access_token);
        return res.data;
    };
    const queryOrder = useQuery({
        queryKey: ['order'],
        queryFn: fetchMyOrder,
    });

    if (state?.id && state?.access_token) {
        queryOrder()
    }
    const { isPending, data } = queryOrder
    const handleCanceOrder = () => {

    }
    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`)
    }
    console.log("order", data)
    const renderProduct = (data) => {
        return data?.map((order) => {
            return <WrapperHeaderItem key={order?._id}>
                <img src={order?.image}
                    style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        border: '1px solid rgb(238, 238, 238)',
                        padding: '2px'
                    }}
                />
                <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginLeft: '10px',
                    marginTop: '20px'
                }}>{order?.name}</div>
                <span style={{ fontSize: '13px', color: '#242424', marginTop: '20px', marginLeft: 'auto' }}>{order?.color}</span>
                <span style={{ fontSize: '13px', color: '#242424', marginTop: '20px', marginLeft: 'auto' }}>{order?.size}</span>
                <span style={{ fontSize: '13px', color: '#242424', marginTop: '20px', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
        })
    }
    return (
        <Loading isPending={isPending}>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h4>Đơn hàng của tôi</h4>
                    <WrapperListOrder>
                        {data?.map((order) => {
                            return (
                                <WrapperItemOrder key={order?._id}>
                                    <WrapperStatus>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>
                                            <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                                            <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</span>
                                        </div>
                                    </WrapperStatus>
                                    {renderProduct(order?.orderItems)}
                                    <WrapperFooterItem>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                            >{convertPrice(order?.totalPrice)}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <ButtonComponent
                                                onClick={() => handleCanceOrder(order)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                label={'Hủy đơn hàng'}
                                                styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                            <ButtonComponent
                                                onClick={() => handleDetailsOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                label={'Xem chi tiết'}
                                                styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                        </div>
                                    </WrapperFooterItem>
                                </WrapperItemOrder>
                            )
                        })}
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </Loading>
    );
}

export default MyOrderPage;