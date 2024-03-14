import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [
    ],
    orderItemsSelected: [
    ],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSilde = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInstock) {
                    itemOrder.amount += orderItem?.amount
                    state.isSucessOrder = true
                    state.isErrorOrder = false
                }
            } else {
                state.orderItems.push(orderItem)
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemsOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            if (itemsOrderSelected) {
                itemOrder.amount++
                itemsOrderSelected.amount++
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemsOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            if (itemsOrderSelected && itemOrder.amount > 0) {
                itemOrder.amount--
                itemsOrderSelected.amount--
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const itemsOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct)
            state.orderItems = itemOrder
            state.orderItemsSelected = itemsOrderSelected
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const itemsOrderSelected = state?.orderItemsSelected?.filter((item) => !listChecked.includes(item.product))
            state.orderItems = itemOrder
            state.orderItemsSelected = itemsOrderSelected
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected = []
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order)
                }
            })
            state.orderItemsSelected = orderSelected
        },
        resetCart: (state) => {
            state.orderItems = []
            state.orderItemsSelected = []
        }
    }
})

export const { addOrderProduct, selectedOrder, resetCart, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct } = orderSilde.actions
export default orderSilde.reducer