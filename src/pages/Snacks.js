import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Snacks = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState({});
    
    const menu = [
        { id: 1, name: 'Popcorn (L)', price: 180, icon: '🍿' },
        { id: 2, name: 'Pepsi', price: 90, icon: '🥤' },
        { id: 3, name: 'Puff', price: 50, icon: '🥐' },
        { id: 4, name: 'Water Bottle', price: 40, icon: '💧' }
    ];

    const handleQty = (id, change) => {
        setCart(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + change)
        }));
    };

    const total = menu.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

    return (
        <div style={{ padding: '30px', background: '#111', color: 'white', minHeight: '100vh', textAlign: 'center' }}>
            <h2 style={{ color: '#ffc107' }}>Add Some Snacks? 🍿</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {menu.map(item => (
                    <div key={item.id} style={{ background: '#222', padding: '15px', borderRadius: '10px', border: '1px solid #333' }}>
                        <div style={{ fontSize: '30px' }}>{item.icon}</div>
                        <h4>{item.name}</h4>
                        <p style={{ color: '#28a745' }}>₹{item.price}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <button onClick={() => handleQty(item.id, -1)} style={{ width: '30px' }}>-</button>
                            <span>{cart[item.id] || 0}</span>
                            <button onClick={() => handleQty(item.id, 1)} style={{ width: '30px' }}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '30px', padding: '20px', borderTop: '2px solid #333' }}>
                <h3>Snacks Total: ₹{total}</h3>
                <button 
                    onClick={() => navigate('/payment')}
                    style={{ padding: '15px 30px', background: '#e50914', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Go to Payment ➡️
                    
                </button>
            </div>
        </div>
    );
};

export default Snacks;