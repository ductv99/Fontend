import React from "react";
import { Badge, Col, Popover } from 'antd';
import { useState, useEffect } from 'react';
import { WrapperHeader, WrapperTextHeader, WrraperTextHeaderSmall, WrapperContentPopup, WrraperAccountHeader } from './styled'
import { UserOutlined, ShoppingCartOutlined, CaretDownOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import *as UserService from "../../service/UserService"
import { useDispatch } from 'react-redux'
import { resetUser } from "../../redux/slides/userSile";
import Loading from "../Loading/Loading";



const Header = ({ isHisddensearch = false, isHisddenCart = false }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const [userName, setUserName] = useState('')
    const [imageUser, setImageUser] = useState('')

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const handleNavLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        localStorage.clear()
        dispatch(resetUser())
        navigate('/')
        setLoading(false)

    }
    
    useEffect(() => {
        setUserName(user?.name)
        setImageUser(user?.avatar)
    }, [user?.name, user?.avatar])



    const content = (
        <div>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate("/system/admin")}>
                    Quản lý hệ thống
                </WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => navigate("/profile-user")}>
                Chỉnh sửa thông tin
            </WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>
                Đăng xuất
            </WrapperContentPopup>
        </div>
    );
    return (
        <div style={{ heiht: '100%', width: '100%', display: 'flex', background: 'rgb(26,148,255)', justifyContent: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHisddensearch && isHisddenCart ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader onClick={() => navigate('/')}>
                        LD Store
                    </WrapperTextHeader>
                </Col>
                {!isHisddensearch && <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        bordered={false}
                        textbutton="Tìm kiếm"
                        placeholder="input search text"
                    // backgroundColorButton="#5a20c1"
                    />
                </Col>}
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <Loading isPending={loading}>
                        <WrraperAccountHeader>
                            {imageUser ? (
                                <img src={imageUser} style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '3-px' }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger='click' >
                                        <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavLogin} style={{ cursor: 'pointer' }}>
                                    <span>Đăng nhập/Đăng ký</span>
                                    <div>
                                        <span>Tài khoản</span>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrraperAccountHeader>
                    </Loading>
                    {!isHisddenCart && <div>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>
                        <WrraperTextHeaderSmall>Giỏ hàng</WrraperTextHeaderSmall>
                    </div>}

                </Col>
            </WrapperHeader>
        </div>);
}

export default Header;