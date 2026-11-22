import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import GoodsCard from './components/GoodsCard';

const goods = [
    { id: 1, title: 'Кросівки',  price: 2499, image: '/images/product1.jpg' },
    { id: 2, title: 'Рюкзак',    price: 1299, image: '/images/product2.jpg' },
    { id: 3, title: 'Годинник',  price: 3999, image: '/images/product3.jpg' },
    { id: 4, title: 'Навушники', price: 1899, image: '/images/product4.jpg' },
    { id: 5, title: 'Футболка',  price: 599,  image: '/images/product5.jpg' },
    { id: 6, title: 'Сумка',     price: 1599, image: '/images/product6.jpg' }
];

function App() {
    return (
        <div className="app">
            {}
            <Header fio="Криштофор Денис Русланович" />
            <Content />

            {}
            <h2>Галерея товарів</h2>
            <div className="goods">
                {goods.map(g => (
                    <GoodsCard key={g.id} title={g.title} price={g.price} image={g.image} />
                ))}
            </div>
        </div>
    );
}

export default App;
