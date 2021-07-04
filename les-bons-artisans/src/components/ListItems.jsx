import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item';
import ButtonAdd from './ButtonAdd';

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
  const getItems = async () => {
    const res = await axios.get('http://localhost:5000/api/object', axiosConfig);
    setItems(res.data);
  };
  useEffect(async () => {
    getItems();
  }, []);

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
          {items.length === 0 && (
            // eslint-disable-next-line max-len
            <p>On dirait bien que la boutique est vide, n&apos;hésites pas à ajouter des articles.</p>)}
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
