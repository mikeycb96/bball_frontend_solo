import PlayerList from "../components/PlayerList";
import { useState, useEffect } from "react";

const PlayerContainer = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPlayers = async (page) => {
        try {
            const response = await fetch(`https://www.balldontlie.io/api/v1/players?page=${page}&per_page=25`);
            const jsonData = await response.json();
            setPlayers(jsonData.data);
            setTotalPages(jsonData.meta.total_pages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching players:", error);
        } finally {
            setLoading(false);
        }
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


