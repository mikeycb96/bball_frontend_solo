const Player = ({ player }) => {
    return (
        <div className="player">
            <h4>{player.first_name} {player.last_name}</h4>
            <p>Position: {player.position}</p>
            <p>Team: {player.team.full_name}</p>
        </div>
    );
};

export default Player;