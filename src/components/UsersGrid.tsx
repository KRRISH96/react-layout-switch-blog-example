import React from 'react';
import { UsersListProps } from './App';

function UsersGrid({ users, activeLayout }: UsersListProps) {
  return (
    <div className="user-grid-container">
      <div className="user-cards__list">
        {users.map(({ id, name, username, company }) => (
          <div key={`${username}-${id}`} className="user-card card">
            <h3 className="user-name">
              <p>{name}</p>
            </h3>
            <p className="company-name">
              Company: <span>{company.name}</span>
            </p>
            <span className="user-posts-link">
              <button>View Posts</button>
            </span>
          </div>
        ))}
        {!users.length && <h3>No users matching search term....</h3>}
      </div>
    </div>
  );
}

export default UsersGrid;
