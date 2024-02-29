import React from "react";

const Banner = () => {
    const bannerStyle = {
        width: "1080px",
        padding: "2rem",
        paddingTop: "2rem",
        backgroundColor: "rgb(26, 148, 255)",
        color: "#fff",
        borderRadius: "0.5rem",
        margin: "auto"
        // margin: "10px auto 0",
    };

    const headingStyle = {
        textAlign: "center",
        fontSize: "6rem",
        color: "#fff",
        letterSpacing: "0.2rem",
        fontWeight: "bold",
        marginBottom: "2rem",
    };

    const promoTextStyle = {
        textAlign: "center",
        fontSize: "3rem",
        marginTop: "2rem",
        marginBottom: "0",
    };

    const discountStyle = {
        color: "#FFD700",
    };

    return (
        <div style={bannerStyle}>
            <div>
                <div>
                    <h2 style={headingStyle}>
                        Giảm sâu đến
                        <br />
                        <span style={discountStyle}>50%</span> cho tất cả các sản phẩm
                    </h2>
                    <div style={promoTextStyle}>
                        <span>Miễn phí vận chuyển!</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;