import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Success = () => {
    const navigate = useNavigate();
    const ticketRef = useRef();

    // 1. Confetti Animation (Page load aagumbothu varum)
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, []);

    // 2. Countdown Timer (3 hours starts now)
    const [timeLeft, setTimeLeft] = useState(10800); 
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (s) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return `${h}h ${m}m ${sec}s`;
    };

    // 3. 📥 PDF DOWNLOAD LOGIC
    const downloadTicket = () => {
        const element = ticketRef.current;
        html2canvas(element, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
            pdf.save(`Ticket_${localStorage.getItem('selectedMovie')}.pdf`);
        });
    };

    // 4. FETCH DATA (Movie, User, Date, Phone)
    const movieName = localStorage.getItem('selectedMovie') || "MOVIE NAME";
    const userName = localStorage.getItem('bookedUser') || "Guest User";
    const mobile = localStorage.getItem('bookedMobile') || "Not Provided";
    const totalPaid = localStorage.getItem('totalAmount') || "150"; // Default value
    
    // 📅 DATE FIX: Inga dhaan namba current date-ah set panrom
    const bookingDate = new Date().toLocaleDateString(); // Example: 22/03/2026
    const bookingTime = "06:30 PM"; // Neenga fixed-ah kooda vekkalaam

    const ticketId = "TIC" + Math.floor(100000 + Math.random() * 900000);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}`;

    return (
        <div style={{ padding: '20px', background: '#0f0f0f', color: 'white', minHeight: '100vh', textAlign: 'center', fontFamily: 'Arial' }}>
            
            <h1 style={{ color: '#28a745' }}>🎉 Booking Confirmed! 🎉</h1>

            <div style={{ background: '#1a1a1a', padding: '10px', borderRadius: '10px', maxWidth: '380px', margin: '15px auto', border: '1px solid #ffc107' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#ffc107' }}>SHOW STARTS IN</p>
                <h2 style={{ margin: '5px 0' }}>{formatTime(timeLeft)}</h2>
            </div>

            {/* --- 🎟️ THE TICKET CARD --- */}
            <div ref={ticketRef} style={{ background: 'white', color: 'black', maxWidth: '380px', margin: '20px auto', borderRadius: '20px', overflow: 'hidden', textAlign: 'left', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <div style={{ background: '#e50914', color: 'white', padding: '15px', fontWeight: 'bold', textAlign: 'center' }}>E-TICKET</div>
                
                <div style={{ padding: '25px' }}>
                    <center><h2 style={{ margin: '0 0 15px 0', color: '#e50914', textTransform: 'uppercase' }}>{movieName}</h2></center>
                    
                    <div style={{ borderBottom: '1px dashed #ccc', paddingBottom: '10px', marginBottom: '15px' }}>
                        <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>PASSENGER NAME</p>
                        <h3 style={{ margin: 0 }}>{userName}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div><p style={{ margin: 0, fontSize: '11px', color: '#888' }}>DATE</p><p style={{ margin: 0, fontWeight: 'bold' }}>{bookingDate}</p></div>
                        <div><p style={{ margin: 0, fontSize: '11px', color: '#888' }}>TIME</p><p style={{ margin: 0, fontWeight: 'bold' }}>{bookingTime}</p></div>
                        <div><p style={{ margin: 0, fontSize: '11px', color: '#888' }}>MOBILE</p><p style={{ margin: 0, fontWeight: 'bold' }}>{mobile}</p></div>
                        <div><p style={{ margin: 0, fontSize: '11px', color: '#888' }}>PAID</p><p style={{ margin: 0, fontWeight: 'bold', color: '#28a745' }}>₹{totalPaid}</p></div>
                    </div>

                    <center style={{ borderTop: '1px dashed #ccc', paddingTop: '15px' }}>
                        <img src={qrUrl} alt="QR" style={{ width: '120px' }} />
                        <p style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>Ticket ID: {ticketId}</p>
                    </center>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px', margin: '0 auto' }}>
                <button onClick={downloadTicket} style={{ padding: '15px', background: '#ffc107', color: 'black', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>
                    📥 Download Ticket (PDF)
                </button>
                <button onClick={() => navigate('/')} style={{ padding: '15px', background: '#e50914', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Back to Movies
                </button>
            </div>
        </div>
    );
};

export default Success;