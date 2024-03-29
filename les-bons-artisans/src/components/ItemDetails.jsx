import { useParams, withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import { string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textfield: {
    margin: 15,
    width: '25ch'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});
function ItemDetails({ history }) {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const classes = useStyles();
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const [item, setItem] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/object/${id}`, axiosConfig).then((res) => {
      console.log(res.data);
      setItem(res.data);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/object/${id}`, item, axiosConfig)
      .then((reponse) => reponse);
    history.push('/');
  };

  if (!item) return null;

  return (
    <>
      <div
        className={classes.container}
      >
        <h1>Modifier un object</h1>
        <form
          onSubmit={handleSubmit}
          className={classes.container}
        >
          <TextField
            id="name"
            name="name"
            label="Nom"
            type="text"
            value={item.name}
            onChange={handleInputChange}
            style={{
              margin: 15,
              width: '25ch'
            }}
          />
          <TextField
            id="type"
            name="type"
            label="Type"
            type="text"
            defaultValue={item.type}
            onChange={handleInputChange}
            className={classes.textfield}
          />
          <TextField
            id="price"
            name="price"
            label="Prix"
            type="number"
            value={item.price}
            onChange={handleInputChange}
            className={classes.textfield}
          />
          <FormControl>
            <FormLabel>Note</FormLabel>
            <Select
              name="rating"
              value={item.rating}
              onChange={handleInputChange}
              className={classes.textfield}
            >
              <MenuItem key="1" value="1">1</MenuItem>
              <MenuItem key="2" value="2">2</MenuItem>
              <MenuItem key="3" value="3">3</MenuItem>
              <MenuItem key="4" value="4">4</MenuItem>
              <MenuItem key="5" value="5">5</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Années de garantie</FormLabel>
            <Select
              name="warranty_years"
              value={item.warranty_years}
              onChange={handleInputChange}
              className={classes.textfield}
            >
              <MenuItem key="1" value="1">1</MenuItem>
              <MenuItem key="2" value="2">2</MenuItem>
              <MenuItem key="3" value="3">3</MenuItem>
              <MenuItem key="4" value="4">4</MenuItem>
              <MenuItem key="5" value="5">5</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Disponible</FormLabel>
            <Select
              name="available"
              value={item.available}
              onChange={handleInputChange}
              className={classes.textfield}
            >
              <MenuItem key="true" value="true">Oui</MenuItem>
              <MenuItem key="false" value="false">Non</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.textfield}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

ItemDetails.propTypes = {
  history: string.isRequired
};

export default withRouter(ItemDetails);
