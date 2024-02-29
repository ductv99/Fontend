import React from "react";
// import { Checkbox, Rate } from 'antd'
import { WrapperLabelText, WrapperContent, WrapperTextValue } from './styled'

const Navbar = () => {
    const category = ['ct1', 'ct2', 'ct3']
    return (
        <div>
            <WrapperLabelText>
                Danh mục sản phẩm
            </WrapperLabelText>
            <WrapperContent>
                {category.map((item) => {
                    return (
                        <WrapperTextValue>
                            {item}
                        </WrapperTextValue>
                    )
                })}
            </WrapperContent>
        </div>
    );
}

export default Navbar;