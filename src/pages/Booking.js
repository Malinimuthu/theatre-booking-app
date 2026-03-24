import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // --- STATES ---
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userName, setUserName] = useState("");
    const [mobile, setMobile] = useState("");

    // --- LOGIC: SEAT SELECTION ---
    const toggleSeat = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    // --- LOGIC: PREMIUM PRICING ---
    const calculateTotal = () => {
        let total = 0;
        selectedSeats.forEach(seatId => {
            if (seatId <= 20) total += 250; // Gold Seats
            else total += 150; // Silver Seats
        });
        return total;
    };

    // --- LOGIC: CONFIRM BUTTON ---
    const handleConfirm = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat!");
            return;
        }
        if (!userName || !mobile) {
            alert("Please enter Name and Mobile Number!");
            return;
        }

    
        localStorage.setItem('bookedUser', userName);
        localStorage.setItem('bookedMobile', mobile);
        localStorage.setItem('totalAmount', calculateTotal());
        
        navigate('/snacks'); 
    };

    return (
        <div style={{ padding: '40px', background: '#0f0f0f', color: 'white', minHeight: '100vh', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2 style={{ color: '#ffc107', letterSpacing: '2px' }}>BOOK YOUR TICKETS</h2>
            
            {/* Screen UI */}
            <div style={{ margin: '30px auto', maxWidth: '500px' }}>
                <p style={{ fontSize: '11px', color: '#888', marginBottom: '5px' }}>SCREEN THIS WAY</p>
                <div style={{ height: '4px', background: '#e50914', borderRadius: '10px', boxShadow: '0 5px 15px rgba(229, 9, 20, 0.6)' }}></div>
            </div>

            {/* Seat Grid */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(8, 1fr)', 
                gap: '12px', 
                maxWidth: '400px', 
                margin: '0 auto',
                background: '#1a1a1a',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid #333'
            }}>
                {[...Array(40)].map((_, index) => {
                    const seatId = index + 1;
                    const isSelected = selectedSeats.includes(seatId);
                    const isPremium = seatId <= 20;

                    return (
                        <div 
                            key={seatId}
                            onClick={() => toggleSeat(seatId)}
                            style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '6px 6px 12px 12px',
                                cursor: 'pointer',
                                background: isSelected ? '#28a745' : (isPremium ? '#ffc107' : '#444'),
                                color: isPremium && !isSelected ? 'black' : 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                transition: '0.3s'
                            }}
                        >
                            {isPremium && <span style={{fontSize: '8px'}}>👑</span>}
                            {seatId}
                        </div>
                    );
                })}
            </div>

            {/* User Info Form */}
            <div style={{ 
                marginTop: '30px', 
                padding: '20px', 
                background: '#1a1a1a', 
                borderRadius: '15px', 
                maxWidth: '400px', 
                margin: '30px auto',
                border: '1px solid #333',
                textAlign: 'left'
            }}>
                <h4 style={{ color: '#ffc107', marginTop: 0 }}>👤 Passenger Details</h4>
                <input 
                    type="text" 
                    placeholder="Enter Name" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ width: '93%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
                <input 
                    type="text" 
                    placeholder="Mobile Number" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={{ width: '93%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            {/* Summary & Button */}
            <div style={{ marginTop: '20px', background: 'linear-gradient(to bottom, #222, #111)', padding: '25px', borderRadius: '15px', maxWidth: '400px', margin: '0 auto', border: '1px solid #333' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                    <span>Seats: {selectedSeats.length}</span>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>Total: ₹{calculateTotal()}</span>
                </div>
                
                <button 
                    onClick={handleConfirm}
                    style={{ 
                        marginTop: '10px', 
                        width: '100%',
                        padding: '15px', 
                        background: '#e50914', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '50px', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        boxShadow: '0 4px 10px rgba(229, 9, 20, 0.3)'
                    }}
                >
                    PROCEED TO SNACKS ➡️
                </button>
            </div>
        </div>
    );
};

export default Booking;