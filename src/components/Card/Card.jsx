import React from "react";
import { StyleNameProduct, WrraperDisscountText, WrraperCard, WrraperPriceText, WrraperReportText, WrapperStyleTextSell } from "./styled";
import { StarFilled } from "@ant-design/icons"
const Card = () => {
    return (
        <WrraperCard
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <StyleNameProduct>
                product1
            </StyleNameProduct>
            <WrraperReportText>
                <span>
                    <span>4.96</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                </span>
                <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
            </WrraperReportText>
            <WrraperPriceText>
                <span style={{ marginRight: '8px' }}>100.000 vnd</span>
                <WrraperDisscountText>
                    -5%
                </WrraperDisscountText>
            </WrraperPriceText>
        </WrraperCard>
    );
}

export default Card;