// src/components/DataTable.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Post from '../models/Post';

const DataTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 2 },
    { field: 'body', headerName: 'Body', flex: 3 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={posts}
        columns={columns}
        checkboxSelection
        pagination
        // pageSize={5}
        autoPageSize
      />
    </div>
  );
};

export default DataTable;
