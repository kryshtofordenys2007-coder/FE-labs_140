import React from 'react';
import Image from './Image';

const schemes = [
    { backgroundColor: '#ffeb3b', color: '#b71c1c' },
    { backgroundColor: '#1a237e', color: '#ffffff' }
];

const STEP = 50;
const START_WIDTH = 400;

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            birthClicks: 0, 
            images: [START_WIDTH]
        };
    }

    handleBirthClick = () => {
        this.setState(prev => ({ birthClicks: prev.birthClicks + 1 }));
    };

    add = () => this.setState(prev => ({ images: [...prev.images, START_WIDTH] }));

    change = (delta) => this.setState(prev => {
        if (prev.images.length === 0) return null;
        const images = [...prev.images];
        const last = images.length - 1;
        images[last] = Math.max(STEP, images[last] + delta);
        return { images };
    });

    remove = () => this.setState(prev => ({ images: prev.images.slice(0, -1) }));

    render() {
        const { birthClicks, images } = this.state;
        const birthStyle = birthClicks === 0 ? {} : schemes[(birthClicks - 1) % schemes.length];

        return (
            <div>
                <p style={birthStyle} onClick={this.handleBirthClick} className="clickable">
                    Дата і місце народження: 09 січня 2007 року, м. Звенигородка.
                </p>
                <p>Освіта: школа — ЗЗСО ім. Тараса Шевченка, м. Звенигородка; університет — КПІ ім. Ігоря Сікорського.</p>

                <h3>Хобі</h3>
                <ul>
                    <li>Риболовля</li>
                    <li>Волейбол</li>
                    <li>Комп'ютерні ігри</li>
                    <li>Одяг</li>
                </ul>

                <h3>Моє улюблене місто — Звенигородка</h3>
                {images.map((w, i) => (
                    <div key={i}><Image src="/images/city.jpg" width={w} alt="Фото міста" /></div>
                ))}

                <div className="buttons">
                    <button onClick={this.add}>Додати</button>
                    <button onClick={() => this.change(STEP)}>Збільшити</button>
                    <button onClick={() => this.change(-STEP)}>Зменшити</button>
                    <button onClick={this.remove}>Видалити</button>
                </div>
            </div>
        );
    }
}

export default Content;
