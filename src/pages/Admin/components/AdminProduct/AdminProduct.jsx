import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./styled"
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Form } from "antd";
import AdminTable from "../AdminTable/AdminTable";
import InputComponent from "../../../../components/InputComponent/InputComponent";
import { getBase64 } from "../../../../untils";
import { useMutationHook } from '../../../../hook/userMutationHook'
import * as ProductService from '../../../../service/ProductService'
import Loading from "../../../../components/Loading/Loading";
import * as message from '../../../../components/Message/Message'
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../../../components/DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const user = useSelector((state) => state?.user)

    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInstock: '',
        type: '',
    })

    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInstock: '',
        type: '',
    })

    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const mutation = useMutationHook(
        data => {
            // const { ...rest } = data
            ProductService.createProduct(data)
        }
    )

    const mutationUpdate = useMutationHook(
        (data) => {
            // console.log("dataaa", data)
            const {
                id,
                access_token,
                ...rests } = data
            ProductService.updateProduct(id, rests, access_token)
        }
    )

    const { isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value
        })
    }

    const [form] = Form.useForm()

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            countInStock: '',
            type: ''
        })
        form.resetFields()
    };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetail({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            countInStock: '',
            type: ''
        })
        form.resetFields()
    };

    const onFinish = () => {
        mutation.mutate(stateProduct)
        // console.log('onFinish', stateProduct)
    }
    const { isPending, isSuccess, isError } = mutation
    // const { isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

    useEffect(() => {
        if (isSuccess) {
            handleCancel()
            message.success()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview
        })
    }
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct()

        return res
    }
    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
    });

    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {
            ...product, key: product._id
        }
    })
    const fetchGetDetailProduct = async (rowSelected) => {
        const res = await ProductService.getDetailProduct(rowSelected)
        if (res?.data) {
            setStateProductDetail({
                name: res.data.name,
                price: res.data.price,
                description: res.data.description,
                rating: res.data.rating,
                image: res.data.image,
                countInStock: res.data.countInStock,
                type: res.data.type
            })
        }
        setIsPendingUpdate(false)
    }



    // console.log("data", stateProductDetail)
    const handleDetailProduct = () => {
        if (rowSelected) {
            setIsPendingUpdate(true)
            fetchGetDetailProduct(rowSelected)
            setIsOpenDrawer(true)
        }

    }


    const onUpdataProduct = () => {

        const {
            name,
            price,
            description,
            rating,
            image,
            countInstock,
            type,
        } = stateProductDetail;

        mutationUpdate.mutate({
            id: rowSelected,
            name,
            price,
            description,
            rating,
            image,
            countInstock,
            type,
            token: user?.access_token,
        });
    }
    useEffect(() => {
        if (isSuccessUpdated) {
            handleCloseDrawer()
            message.success()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])

    //when click data not set firt time 
    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailProduct(rowSelected)
        }
    }, [rowSelected])

    useEffect(() => {
        form.setFieldsValue(stateProductDetail)
        // console.log("eff", stateProductDetail)
    }, [form, stateProductDetail])


    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailProduct} />
            </div>
        )
    }
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'type',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    // console.log("res", data)
    return (
        <div>
            <WrapperHeader>
                Quản lý sản phẩm
            </WrapperHeader>
            <div>
                <Button style={{ width: '150px', height: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircleOutlined style={{ fontSize: '60px' }} />
                </Button>
                <div style={{ marginTop: '20px' }}>
                    <AdminTable
                        columns={columns}
                        data={dataTable}
                        isLoading={isLoading}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    setRowSelected(record._id)
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <Modal title="Tạo sản phẩm mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isPending={isPending}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProduct.name} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập loại sản phẩm',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProduct.type} onChange={handleOnchange} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Hàng trong kho"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá tiền',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProduct.price} onChange={handleOnchange} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Đánh giá"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền đánh giá',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProduct.rating} onChange={handleOnchange} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả sản phẩm"
                            name="description"
                        >
                            <InputComponent value={setStateProduct.description} onChange={handleOnchange} name="description" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ảnh'
                                }
                            ]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button >Select File</Button>
                                {/* icon={<UploadOutlined />} */}
                                {
                                    stateProduct?.image && (<img src={stateProduct?.image}
                                        alt="product"
                                        style={{
                                            height: '60px', width: '60px',
                                            borderRadius: '50%', objectFit: 'cover',
                                            marginLeft: '10px'
                                        }} />)
                                }
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 20,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
            <DrawerComponent title="Cập nhật sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="520px" >
                <Loading isPending={isPendingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onUpdataProduct}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProductDetail.name} onChange={handleOnchangeDetail} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập loại sản phẩm',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProductDetail.type} onChange={handleOnchangeDetail} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Hàng trong kho"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProductDetail.countInStock} onChange={handleOnchangeDetail} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá tiền',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProductDetail.price} onChange={handleOnchangeDetail} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Đánh giá"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền đánh giá',
                                },
                            ]}
                        >
                            <InputComponent value={setStateProductDetail.rating} onChange={handleOnchangeDetail} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả sản phẩm"
                            name="description"
                        >
                            <InputComponent value={setStateProductDetail.description} onChange={handleOnchangeDetail} name="description" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ảnh'
                                }
                            ]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetail} maxCount={1}>
                                <Button >Select File</Button>
                                {
                                    stateProductDetail?.image && (<img src={stateProductDetail?.image}
                                        alt="product"
                                        style={{
                                            height: '60px', width: '60px',
                                            borderRadius: '50%', objectFit: 'cover',
                                            marginLeft: '10px'
                                        }} />)
                                }
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 20,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
        </div >
    );
}

export default AdminProduct;