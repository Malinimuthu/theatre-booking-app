import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/movies/' + id)
            .then(res => setMovie(res.data))
            .catch(err => console.log("Details Error:", err));
    }, [id]);

    if (!movie) return <h2 style={{ color: 'white', textAlign: 'center' }}>Loading Movie...</h2>;

    // YouTube Search Link Logic
    const watchTrailer = () => {
        const query = `${movie.title} official trailer`;
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    };

    return (
        <div style={{ textAlign: 'center', padding: '40px', background: '#111', color: 'white', minHeight: '100vh' }}>
            <h1 style={{ fontSize: '40px', color: '#e50914' }}>{movie.title}</h1>
            
            <img 
                src={movie.image} 
                alt={movie.title} 
                style={{ width: '280px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 0 15px red' }} 
            />

            <div style={{ maxWidth: '700px', margin: '0 auto', background: '#222', padding: '25px', borderRadius: '15px' }}>
                <h3 style={{ color: '#ffc107' }}>Genre: {movie.genre || "Action / Drama"}</h3>
                
                {/* Movie Description */}
                <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#ccc', marginBottom: '25px' }}>
                    {movie.description || "Loading description..."}
                </p>

                {/* --- BUTTONS SECTION --- */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    
                    {/* YouTube Button */}
                    <button 
                        onClick={watchTrailer}
                        style={{ 
                            padding: '12px 25px', 
                            background: '#ff0000', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span>▶️</span> Watch Trailer
                    </button>

                    {/* Book Seats Button */}
                    <button 
                        onClick={() => navigate('/book/' + movie._id)}
                        style={{ 
                            padding: '12px 25px', 
                            background: '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        🎟️ Book Seats
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;