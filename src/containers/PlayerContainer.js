import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

const PlayerContainer = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); 

    const fetchPlayers = async (page) => {
        try {
            const response = await fetch(`https://www.balldontlie.io/api/v1/players?page=${page}&per_page=25`);
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
        // You can perform a search based on the searchTerm here
        // For example, you can filter the players based on the search term
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
                <div>
                    <div>
                    <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="player-box-container">
                        {players.map((player) => (
                            <div key={player.id} className="player-box">
                                <h2>{player.first_name} {player.last_name}</h2>
                                <p><strong>Position:</strong> {player.position}</p>
                                <p><strong>Team:</strong> {player.team.full_name}</p>
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


