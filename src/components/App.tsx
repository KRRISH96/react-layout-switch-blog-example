import React from 'react';
import { useFetch } from '../hooks/useFetch';
import UsersTable from './UsersTable';
import LayoutSwitch from './LayoutSwitch';
import UsersGrid from './UsersGrid';
import { LAYOUT_OPTIONS } from '../constants';
import './App.scss';

export interface UserData {
  id: number;
  name: string;
  username: string;
  company: Company;
}

interface Company {
  id: number;
  name: string;
}

const layoutOptionValues = Object.values(LAYOUT_OPTIONS);

export interface UsersListProps {
  users: UserData[];
  activeLayout: typeof layoutOptionValues[number];
}

function App() {
  const {
    response: { data: users },
    error,
    loading,
  } = useFetch<UserData[]>('/users');

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <main className="container app">
      <h2>Users</h2>
      {loading && <h3>Loading Users...</h3>}
      {users !== null ? (
        <LayoutSwitch defaultLayout={LAYOUT_OPTIONS.grid}>
          <LayoutSwitch.Options>
            <LayoutSwitch.Button
              layoutPreference={LAYOUT_OPTIONS.table}
              title="Table Layout"
            >
              <p>Hello Table</p>
            </LayoutSwitch.Button>
            <LayoutSwitch.Button
              layoutPreference={LAYOUT_OPTIONS.grid}
              title="Grid Layout"
            >
              <p>Hello Grid</p>
            </LayoutSwitch.Button>
          </LayoutSwitch.Options>
          <LayoutSwitch.Content>
            <UsersTable activeLayout={LAYOUT_OPTIONS.table} users={users} />
            <UsersGrid activeLayout={LAYOUT_OPTIONS.grid} users={users} />
          </LayoutSwitch.Content>
        </LayoutSwitch>
      ) : (
        <h3>No Users Found</h3>
      )}
    </main>
  );
}

export default App;
