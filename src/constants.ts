// API
export const API_BASE_URL: string = 'https://jsonplaceholder.typicode.com';

interface LayoutOptions {
  table: string;
  grid: string;
}
// Layouts
export const LAYOUT_OPTIONS: Readonly<LayoutOptions> = {
  table: 'table',
  grid: 'grid',
};
