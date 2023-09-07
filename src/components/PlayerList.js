import Player from "./Player";

const PlayerList = ({ players }) => {
    const playersComponents = players.map((player) => {
        return <Player key={player.id} player={player} />;
    });

    return <div id="player-list">{playerComponents}</div>;
};

export default PlayerList;