import React from "react";
import { Input } from "antd"
const InputComponent = ({ size, placeholder, bordered, style, ...rest }) => {
    return (
        <Input
            size={size}
            placeholder={placeholder}
            bordered={bordered}
            style={style}
            {...rest}
        />
    );
}

export default InputComponent;