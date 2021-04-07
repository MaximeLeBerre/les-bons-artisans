import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item';
import ButtonAdd from './Button';

const useStyles = makeStyles({
  title: {
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5%'
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  containerMessage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  }
});

function ListItem() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');
  const classes = useStyles();

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/object', axiosConfig).then((res) => {
      const data = res.data;
      setItems(data);
    });
  }, [items]);

  return (
    <>
      {token
        ? (
          <>
            <h1 className={classes.title}>Liste des objets</h1>
            <ButtonAdd />
          </>
        ) : (
          <div className={classes.containerMessage}>
            <h1 className={classes.title}>Bienvenue, connectez-vous !</h1>
          </div>
        )}
      <div
        className={classes.container}
      >
        <div className={classes.subContainer}>
          {items.map((item) => (
            <Item
              key={item._id + 1}
              id={item._id}
              name={item.name}
              type={item.type}
              price={item.price}
              rating={item.rating}
              warrantyYears={item.warranty_years}
              available={item.available}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListItem;
