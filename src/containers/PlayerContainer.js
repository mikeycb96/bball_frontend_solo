import PlayerList from "../components/PlayerList";
import { useState, useEffect } from "react";

const PlayerContainer = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPlayers = async () => {
        try {
            const response = await fetch("https://www.balldontlie.io/api/v1/players");
            const jsonData = await response.json();
            setPlayers(jsonData.data); 
            setLoading(false);
        } catch (error) {
            console.error("Error getting players:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <PlayerList players={players} />
            )}
        </>
    );
}

export default PlayerContainer;


