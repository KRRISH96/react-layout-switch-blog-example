import React from 'react';
import { UsersListProps } from './App';

function UsersTable({ users }: UsersListProps) {
  return (
    <div className="users-table-container">
      <table className="users-table">
        <thead className="users-table__head">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="users-table__body">
          {users.map(({ id, name, username, company }) => (
            <tr key={`${username}-${id}`}>
              <td>{id}</td>
              <td>
                <p>{name}</p>
              </td>
              <td>
                <p>{company.name}</p>
              </td>
              <td>
                <button>View Posts</button>
              </td>
            </tr>
          ))}
          {!users.length && (
            <tr>
              <td colSpan={4}>No users....</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
