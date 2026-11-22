import React from 'react';

function GoodsCard({ image, title, price }) {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <h4>{title}</h4>
            <p className="price">{price} грн</p>
        </div>
    );
}

export default GoodsCard;
