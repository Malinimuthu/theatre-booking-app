import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // 💡 1. URL correct-ah irukkanu paarunga (5000 or your port)
                const res = await axios.get('http://localhost:5000/api/movies');
                console.log("Movies Data:", res.data); // Inspect-la data varudha nu check panna
                setMovies(res.data);
            } catch (err) {
                console.error("Error fetching movies:", err);
            }
        };
        fetchMovies();
    }, []);

    const handleMovieSelect = (movie) => {
        localStorage.setItem('selectedMovie', movie.title);
        navigate(`/movie/${movie._id}`);
    };

    return (
        <div style={{ padding: '40px', background: '#0f0f0f', color: 'white', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#e50914', marginBottom: '40px' }}>LATEST RELEASES</h1>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '25px', 
                maxWidth: '1200px', 
                margin: '0 auto' 
            }}>
                {movies.map((movie) => (
                    <div 
                        key={movie._id} 
                        onClick={() => handleMovieSelect(movie)} 
                        style={{ background: '#1a1a1a', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #333' }}
                    >
                        {/* 🖼️ POSTER FIX: Namma DB-la enna name-la poster irukkunu check panrom */}
                        <img 
                            src={movie.poster || movie.image || movie.imageUrl || movie.img} 
                            alt={movie.title} 
                            style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
                            onError={(e) => { 
                                // Image load aagala na indha placeholder image varum
                                e.target.src = "https://via.placeholder.com/300x450?text=No+Poster+Found"; 
                            }}
                        />
                        <div style={{ padding: '15px', textAlign: 'center' }}>
                            <h4 style={{ margin: 0 }}>{movie.title}</h4>
                            <p style={{ color: '#888', fontSize: '12px' }}>{movie.genre}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;