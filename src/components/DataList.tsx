import React, { useEffect, useState } from 'react';
import { Grid, Checkbox, Typography, Button } from '@mui/material';
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
    const fetchData = async () => {
      setTimeout(() => {
        setFetchedData(data);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleToggleCategory = (category: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleCheckAllItems = (category: string) => {
    setCheckAllItems((prevCheckAllItems) => !prevCheckAllItems);
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
    <Grid container xs={4} direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Data List</Typography>
      </Grid>
      {fetchedData.map((item, index) => {
        const category = Object.keys(item)[0];
        const isExpanded = expandedCategory === category;
        const totalItems = item[category].length;

        return (
          <Grid item key={index}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Checkbox
                checked={checkAllItems && isExpanded}
                onChange={() => handleCheckAllItems(category)}
              />
              <Typography variant="h6">
                {category} ({totalItems})
              </Typography>
              <Button onClick={() => handleToggleCategory(category)}>
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
            </Grid>
            {isExpanded && (
              <ul>
                {item[category].map((subItem, subIndex) => (
                  <li className='list' key={subIndex}>
                    <Grid container alignItems="center">
                      <Checkbox
                        checked={checkedItems[subItem]}
                        onChange={() => handleCheckSubItem(subItem)}
                      />
                      <Typography>{subItem}</Typography>
                    </Grid>
                  </li>
                ))}
              </ul>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DataList;
