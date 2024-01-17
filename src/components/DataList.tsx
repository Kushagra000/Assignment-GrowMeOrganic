import React, { useEffect, useState } from 'react';
import data from './data'; // Adjust the path as per your project structure

interface CheckedItems {
  [key: string]: boolean;
}

const DataList: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<Array<{ [key: string]: string[] }>>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [checkAllItems, setCheckAllItems] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  useEffect(() => {
    // Simulating an asynchronous data fetch (replace this with your actual data fetching logic)
    const fetchData = async () => {
      // Assuming your data is fetched from an API or some asynchronous source
      // For now, using a timeout to simulate asynchronous behavior
      setTimeout(() => {
        setFetchedData(data);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleToggleCategory = (category: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === category ? null : category));
    // setCheckAllItems(false); // Uncheck "Check All" when toggling individual categories
  };

  const handleCheckAllItems = (category: string) => {
    setCheckAllItems((prevCheckAllItems) => !prevCheckAllItems);
    // setExpandedCategory(checkAllItems ? null : category);
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      fetchedData.forEach((item) => {
        const currentCategory = Object.keys(item)[0];
        if (currentCategory === category) {
          item[currentCategory].forEach((subItem) => {
            newCheckedItems[subItem] = !checkAllItems;
          });
        }
      });
      return newCheckedItems;
    });
  };
  

  const handleCheckSubItem = (subItem: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [subItem]: !prevCheckedItems[subItem],
    }));
  };

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {fetchedData.map((item, index) => {
          const category = Object.keys(item)[0];
          const isExpanded = expandedCategory === category;
          const totalItems = item[category].length;

          return (
            <li key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={checkAllItems && isExpanded}
                    onChange={() => handleCheckAllItems(category)}
                  />
                  <strong>
                    {category} ({totalItems})
                  </strong>
                </label>
                <button onClick={() => handleToggleCategory(category)}>
                  {isExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              {isExpanded && (
                <ul>
                  {item[category].map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <label>
                        <input
                          type="checkbox"
                          checked={checkedItems[subItem]}
                          onChange={() => handleCheckSubItem(subItem)}
                        />
                        {subItem}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DataList;