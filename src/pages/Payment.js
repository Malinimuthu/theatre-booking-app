import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    const [method, setMethod] = useState('upi');

    const handlePay = () => {
        alert("Payment Processing... Please wait!");
        setTimeout(() => {
            navigate('/success'); // Payment success aana success page-ku pogum
        }, 2000);
    };

    return (
        <div style={{ padding: '40px', background: '#111', color: 'white', minHeight: '100vh', textAlign: 'center' }}>
            <h2 style={{ color: '#ffc107' }}>Choose Payment Method 💳</h2>
            
            <div style={{ maxWidth: '400px', margin: '30px auto', background: '#222', padding: '20px', borderRadius: '15px' }}>
                <div 
                    onClick={() => setMethod('upi')}
                    style={{ padding: '15px', border: method === 'upi' ? '2px solid #28a745' : '1px solid #444', borderRadius: '10px', marginBottom: '15px', cursor: 'pointer' }}
                >
                    <span style={{ fontSize: '20px' }}>📱 UPI (GPay / PhonePe)</span>
                </div>

                <div 
                    onClick={() => setMethod('card')}
                    style={{ padding: '15px', border: method === 'card' ? '2px solid #28a745' : '1px solid #444', borderRadius: '10px', cursor: 'pointer' }}
                >
                    <span style={{ fontSize: '20px' }}>💳 Credit / Debit Card</span>
                </div>

                {method === 'card' && (
                    <div style={{ marginTop: '20px' }}>
                        <input type="text" placeholder="Card Number" style={{ width: '90%', padding: '10px', marginBottom: '10px' }} />
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <input type="text" placeholder="MM/YY" style={{ width: '40%', padding: '10px' }} />
                            <input type="password" placeholder="CVV" style={{ width: '40%', padding: '10px' }} />
                        </div>
                    </div>
                )}

                <button 
                    onClick={handlePay}
                    style={{ marginTop: '30px', width: '100%', padding: '15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}
                >
                    PAY NOW ➡️
                </button>
            </div>
        </div>
    );
};

export default Payment;