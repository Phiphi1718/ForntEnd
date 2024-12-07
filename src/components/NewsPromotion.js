import React from "react";
import "./NewsPromotion.css";

const newsData = [
    {
        id: 1,
        img: "https://storage.googleapis.com/a1aa/image/WV0dcyqfzsyEGypenr0zeNU3e0S4Wp22CsaceWoffvyUR3X5JA.jpg",
        text: "ƯU ĐÃI HỘI VIÊN - TẶNG COUPON MIỄN PHÍ SẢN PHẨM MỚI BST...",
        views: 7570,
    },
    {
        id: 2,
        img: "https://storage.googleapis.com/a1aa/image/UwxsCpig2hr8KV1o1kX5a4U1qlvAeWnNk6mAdweUCC0cuvyTA.jpg",
        text: "HAPPY HALLOWEEN - TẶNG COUPON MUA 1 TẶNG 1",
        views: 2633,
    },
    {
        id: 3,
        img: "https://storage.googleapis.com/a1aa/image/CMPh2iQVli4kFpsnCrHP9R2E519U2mUSWCi8RDAE8GYn7r8E.jpg",
        text: "ƯU ĐÃI CHO HỘI VIÊN - TẶNG COUPON MUA 1 TẶNG 1 KHI MUA...",
        views: 5898,
    },
    {
        id: 4,
        img: "https://storage.googleapis.com/a1aa/image/Sx7LDITaFYZHBhtk6TgyYTMvQnbRQzHfzhzysn2qEZsQ3X5JA.jpg",
        text: "ƯU ĐÃI BÁNH TRUNG THU ĐẾN 15% DÀNH RIÊNG CHO HỘI VIÊN",
        views: 2874,
    },
    {
        id: 5,
        img: "https://storage.googleapis.com/a1aa/image/SOPgKi6GxcLuCJ9uBLeZ8ePVgbneZntJYvFpO33lYZRIdfKPB.jpg",
        text: "PHÚC LONG THÊM TUỔI MỚI, HỘI VIÊN CÓ THÊM QUÀ!",
        views: 7075,
    },
    {
        id: 6,
        img: "https://storage.googleapis.com/a1aa/image/vEW4hZMBDzZsAJEisAChlqPGOO4Kfef1yPgDK80NyWke5eVeE.jpg",
        text: "PHÚC LONG NIÊN - THƯỞNG MINH NGUYỆT",
        views: 3572,
    },
];

const Card = ({ img, text, views }) => {
    return (
        <div className="card">
            <img src={img} alt={text} />
            <div className="card-content">
                <p>{text}</p>
            </div>
            <div className="card-footer">
                <div className="views">
                    <img
                        src="view.png" // Thay bằng đường dẫn icon con mắt của bạn
                        alt="Eye Icon"
                        className="eye-icon"
                    />
                    {views}
                </div>
            </div>
        </div>
    );
};


const NewsPromotion = () => {
    return (
        <div className="container">
            <div className="headersale">
                <h1>Tin tức &amp; Khuyến mãi</h1>
                <p>Tin tức &amp; Khuyến mãi của TPQP Coffee</p>
            </div>
            <div className="grid">
                {newsData.map((news) => (
                    <Card key={news.id} {...news} />
                ))}
            </div>
        </div>
    );
};

export default NewsPromotion;
