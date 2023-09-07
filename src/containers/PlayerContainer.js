import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

const PlayerContainer = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
 

    const fetchPlayers = async (page) => {
        try {
            const response = await fetch(`https://www.balldontlie.io/api/v1/players?page=${page}&per_page=100`);
            const jsonData = await response.json();
            const sortedPlayers = jsonData.data.sort((a, b) => {
                // Compare players by last name
                return a.last_name.localeCompare(b.last_name);
            });
            setPlayers(sortedPlayers);
            setTotalPages(jsonData.meta.total_pages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching players:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        const filteredPlayers = players.filter((player) =>
          `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setPlayers(filteredPlayers);
      };

    useEffect(() => {
        fetchPlayers(currentPage);
    }, []);

    const loadNextPage = () => {
        if (currentPage < totalPages) {
            fetchPlayers(currentPage + 1);
        }
    };

    const loadPreviousPage = () => {
        if (currentPage > 1) {
            fetchPlayers(currentPage - 1);
        }
    };

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="player-container">
                    <h1>NBA Players</h1>
                    <div className="search-bar">
                    <img
                        src="/logo/nba-logo2.png" 
                        alt="NBA Logo"
                        className="image-nba"
                    />
                    <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="player-box-container">
                        {players.map((player) => (
                            <div key={player.id} className="player-box">
                                <h2>{player.first_name} {player.last_name}</h2>
                                <p><strong>Height:</strong> {player.height_feet}"{player.height_inches}</p>
                                <p><strong>Position:</strong> {player.position}</p>
                                <p><strong>Team:</strong> {player.team.full_name}</p>
                                <img
                                    src="/logo/imagesball.png" 
                                    alt="Ball Logo"
                                    className="image-ball"
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <button onClick={loadPreviousPage} disabled={currentPage === 1}>
                            Load Previous
                        </button>
                        <button onClick={loadNextPage} disabled={currentPage === totalPages}>
                            Load Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PlayerContainer;


