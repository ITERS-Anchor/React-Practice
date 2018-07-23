import React from 'react';
import Clock from './clock';

const locations = [
  { id: '1', name: 'Sydney', timezone: 'Australia/Sydney' },
  { id: '2', name: 'New York', timezone: 'America/New_York' },
  { id: '3', name: 'London', timezone: 'Europe/London' },
  { id: '4', name: 'Seoul', timezone: 'Asia/Seoul' },
];
export default function WorldClockWall() {
  return (
    <div className="row" >
      {locations.map(city =>
        <Clock key={city.id} city={city} />,
      )}
    </div>
  );
}
