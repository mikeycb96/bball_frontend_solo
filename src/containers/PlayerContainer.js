import { useState, useEffect } from "react";

const PlayerContainer = () => {
    const [players, setPlayers] = useState([]);

    const fetchPlayers = async () => {
        const response = await fetch("https://www.balldontlie.io/api/v1/players");
        const jsonData = await response.json();
        setPets(jsonData);
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <>
        
            <PlayerList players={players} />
        </>
    );

}

export default PlayerContainer;