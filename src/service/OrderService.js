import { axiosJWT } from "./UserService"


export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_KEY}/order/create/${data.user}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}


export const getOrderByUserId = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/get-detail-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const cancelOrder = async (id, access_token, orderItems, userId) => {
    const orderId = id
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/order/cancel-order/${userId}`, { orderId, orderItems }, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}