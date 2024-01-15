// src/components/DataList.tsx
import React, { useState, useEffect } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserData {
  [userId: number]: Post[];
}

const DataList: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({});
  const [selectedItems, setSelectedItems] = useState<{ [postId: number]: boolean }>({});

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();

        // Organize data based on userId
        const organizedData: UserData = {};

        data.forEach((item: Post) => {
          const userId = item.userId;

          if (!organizedData[userId]) {
            organizedData[userId] = [];
          }

          organizedData[userId].push(item);
        });

        setUserData(organizedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  const handleToggleUser = (userId: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = { ...prevSelectedItems };

      userData[userId]?.forEach((post: Post) => {
        updatedItems[post.id] = !updatedItems[post.id];
      });

      return updatedItems;
    });
  };

  const handleToggleItem = (postId: number) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [postId]: !prevSelectedItems[postId],
    }));
  };

  return (
    <div>
      <h2>Data List</h2>
      {Object.entries(userData).map(([userId, userPosts]) => (
        <div key={userId}>
          <input
            type="checkbox"
            checked={userPosts.every((post: Post) => selectedItems[post.id])}
            onChange={() => handleToggleUser(Number(userId))}
          />
          <span
            style={{
              cursor: 'pointer',
              fontSize: '1.2rem', // Adjust the font size for the user ID
            }}
          >
            User ID: {userId}
          </span>
          <ul style={{ fontSize: '1rem' }}> {/* Adjust the font size for the list items */}
            {userPosts.map((post: Post) => (
              <li key={post.id}>
                <input
                  type="checkbox"
                  checked={selectedItems[post.id] || false}
                  onChange={() => handleToggleItem(post.id)}
                />
                <strong>Title:</strong> {post.title}
                <br />
                <strong>Body:</strong> {post.body}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DataList;
