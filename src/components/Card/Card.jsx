import React from "react";
import { StyleNameProduct, WrraperDisscountText, WrraperCard, WrraperPriceText, WrraperReportText, WrapperStyleTextSell } from "./styled";
import { StarFilled } from "@ant-design/icons"
const Card = (props) => {
    const { countInstock, description, type, discount, image, name, price, rating, selled } = props

    return (
        <WrraperCard
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={image} />}
        >
            <StyleNameProduct>
                {name}
            </StyleNameProduct>
            <WrraperReportText>
                <span>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                </span>
                <WrapperStyleTextSell>| Đã bán {selled || 0}+</WrapperStyleTextSell>
            </WrraperReportText>
            <WrraperPriceText>
                <span style={{ marginRight: '8px' }}>{price.toLocaleString()} vnd</span>
                <WrraperDisscountText>
                    - {discount || 5}%
                </WrraperDisscountText>
            </WrraperPriceText>
        </WrraperCard>
    );
}

export default Card;