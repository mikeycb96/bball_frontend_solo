import React from 'react';

const PlayerList = ({ players }) => {
  return (
    <div>
      <h1>Player List</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <strong>Name:</strong> {player.first_name} {player.last_name} <br />
            <strong>Position:</strong> {player.position} <br />
            <strong>Team:</strong> {player.team.full_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
