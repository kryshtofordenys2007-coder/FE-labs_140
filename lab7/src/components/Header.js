import React, { useState } from 'react';

const schemes = [
    { backgroundColor: '#ffeb3b', color: '#b71c1c' },
    { backgroundColor: '#1a237e', color: '#ffffff' }
];

function Header(props) {
    const [clicks, setClicks] = useState(0);
    const style = clicks === 0 ? {} : schemes[(clicks - 1) % schemes.length];

    return (
        <h2 style={style} onClick={() => setClicks(clicks + 1)} className="clickable">
            {props.fio}
        </h2>
    );
}

export default Header;
