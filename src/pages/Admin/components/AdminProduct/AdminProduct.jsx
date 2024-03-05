import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./styled"
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Select, Space } from "antd";
import AdminTable from "../AdminTable/AdminTable";
import InputComponent from "../../../../components/InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../../../untils";
import { useMutationHook } from '../../../../hook/userMutationHook'
import * as ProductService from '../../../../service/ProductService'
import Loading from "../../../../components/Loading/Loading";
import * as message from '../../../../components/Message/Message'
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../../../components/DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../../../../components/ModalComponent/ModalComponent";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [typeSelect, setTypeSelect] = useState('')
    const user = useSelector((state) => state?.user)
    const [isModalOpenDelele, setIsModalOpenDelele] = useState(false)
    // const [searchText, setSearchText] = useState('');
    // const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInStock: '',
        type: '',
        newType: ''
    })

    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInStock: '',
        type: '',
    })

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
            const res = ProductService.updateProduct(id, { ...rests }, access_token)
            return res
        },
    )
    const mutationDelete = useMutationHook(
        (data) => {
            const { id, access_token, } = data
            const res = ProductService.deleteProduct(id, access_token)
            return res
        },
    )
    const mutationDeleteMany = useMutationHook(
        (data) => {
            const { access_token, ...ids } = data
            const res = ProductService.deleteManyProduct(ids, access_token)
            return res
        },
    )

    const { isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDelete, isPending: isPendingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = mutationDelete
    const { data: dataDeleteMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany } = mutationDeleteMany

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
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            countInStock: stateProduct.countInStock,
            type: stateProduct.type === "add_type" ? stateProduct.newType : stateProduct.type
        }
        mutation.mutate(params)
        setIsModalOpen(false);
        queryProduct.refetch()
        // console.log('onFinish', stateProduct)
    }
    const { isPending, isSuccess, isError } = mutation


    useEffect(() => {
        if (isSuccess) {
            handleCancel()
            message.success()
            // queryProduct.refetch()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    useEffect(() => {
        if (isSuccessDeleteMany && dataDeleteMany?.status === "success") {
            handleCancel()
            message.success()
            // queryProduct.refetch()
        } else if (isErrorDeleteMany) {
            message.error()
        }
    }, [isSuccessDeleteMany])

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
    const handleDeleteManyProduct = (ids) => {
        // console.log("idDelete", _id)
        mutationDeleteMany.mutate({ ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch()
                }
            }
        )
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
    const fetchProductAllType = async () => {
        const res = await ProductService.getAllProductType()
        return res
    }

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
    });

    const queryProductType = useQuery({
        queryKey: ['products-Type'],
        queryFn: fetchProductAllType,
    });
    // console.log("type", queryProductType)

    const { isLoading, data: products } = queryProduct



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
    useEffect(() => {
        if (isSuccessUpdated) {
            handleCloseDrawer()
            message.success()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])

    useEffect(() => {
        if (dataDelete?.status === "success") {
            handleCancelDelete()
            message.success()
        } else if (isErrorDelete) {
            message.error()
        }
    }, [isSuccessDelete])

    //when click data not set firt time 
    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsPendingUpdate(true)
            fetchGetDetailProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    useEffect(() => {
        form.setFieldsValue(stateProductDetail)
        // console.log("eff", stateProductDetail)
    }, [form, stateProductDetail])


    // console.log("data", stateProductDetail)
    const handleDetailProduct = () => {
        // if (rowSelected) {
        //     setIsPendingUpdate(true)
        //     fetchGetDetailProduct(rowSelected)
        // }
        setIsOpenDrawer(true)

    }

    const onUpdateProduct = () => {

        const {
            name,
            price,
            description,
            rating,
            image,
            countInStock,
            type,
        } = stateProductDetail;

        mutationUpdate.mutate({
            id: rowSelected,
            name,
            price,
            description,
            rating,
            image,
            countInStock,
            type,
            token: user?.access_token,
        }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        }
        );
    }

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelele(false)
    }

    const DeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch()
                }
            }
        )
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => { setIsModalOpenDelele(true) }} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailProduct} />
            </div>
        )
    }
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Lọc
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Xóa
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    });
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'type',
            sorter: (a, b) => a.type - b.type
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
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
            </div>
            <div style={{ marginTop: '20px' }}>
                <AdminTable
                    columns={columns}
                    data={dataTable}
                    isLoading={isLoading}
                    handleDeleteMany={handleDeleteManyProduct}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id)
                            }
                        }
                    }}
                />
            </div>

            <ModalComponent forceRender title="Tạo sản phẩm mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            <Select
                                name="type"
                                value={stateProduct.type}
                                // style={{ width: 120 }}
                                onChange={handleChangeSelect}
                                options={renderOptions(queryProductType?.data?.data)}
                            />
                        </Form.Item>
                        {stateProduct.type === 'add_type' && (
                            <Form.Item
                                label='Loại sản phẩm mới'
                                name="newType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập loại sản phẩm',
                                    },
                                ]}
                            >
                                {stateProduct.type === 'add_type' && <InputComponent
                                    value={stateProduct.newType} onChange={handleOnchange}
                                    name="newType" />}
                            </Form.Item>
                        )}

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
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả',
                                },
                            ]}
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
            </ModalComponent>
            <DrawerComponent title="Cập nhật sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="520px" >
                <Loading isPending={isPendingUpdate || isPendingUpdated}>
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
                        onFinish={onUpdateProduct}
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
            <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelele} onCancel={handleCancelDelete} onOk={DeleteProduct}>
                <Loading isPending={isPendingDelete}>
                    <>
                        Bạn có chắc chắn muốn xóa ?
                    </>
                </Loading>
            </ModalComponent>

        </div >
    );
}

export default AdminProduct;