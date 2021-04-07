// ce composant permet l'jout de nouvelles données en BDD
import axios from 'axios';
import { useFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { string } from 'prop-types';
import Card from '@material-ui/core/Card';
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  root: {
    margin: 15,
    width: '25ch'
  },
  card: {
    margin: 15,
    backgroundColor: '#F6F6F6',
    padding: '10px'
  },
  select: {
    margin: 1,
    width: '25ch'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

// Ces variables sont les options des élements "SELECT" pour le formulaire
const ratingOption = [
  {
    value: '1',
    label: 1
  },
  {
    value: '2',
    label: 2
  },
  {
    value: '3',
    label: 3
  },
  {
    value: '4',
    label: 4
  },
  {
    value: '5',
    label: 5
  }
];
const warrantyYearsOption = [
  {
    value: '1',
    label: 1
  },
  {
    value: '2',
    label: 2
  },
  {
    value: '3',
    label: 3
  },
  {
    value: '4',
    label: 4
  },
  {
    value: '5',
    label: 5
  }
];
const availableOption = [
  {
    value: true,
    label: 'Oui'
  },
  {
    value: false,
    label: 'Non'
  }
];

function FormItem({ history }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const classes = useStyles();
  const token = localStorage.getItem('token');

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      price: undefined,
      rating: undefined,
      warranty_years: undefined,
      available: true
    },
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      const res = {
        name: values.name,
        type: values.type,
        price: parseFloat(values.price),
        rating: parseFloat(values.rating),
        warranty_years: parseFloat(values.warranty_years),
        available: (values.available === 'true')
      };
      axios.post('http://localhost:5000/api/object', res, axiosConfig)
        .then((reponse) => reponse)
        .then(() => {
          setSuccessMessage(true);
          setTimeout(() => {
            setSuccessMessage(false);
            history.push('/');
          }, 2000);
        }).catch(() => {
          setErrorMessage(true);
          setTimeout(() => {
            setErrorMessage(false);
          }, 2000);
        });
    }
  });

  return (
    <div
      className={classes.container}
    >
      <h1>Ajouter un objet</h1>
      <Card className={classes.card}>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
        >
          <TextField
            id="name"
            name="name"
            label="Nom"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={classes.root}
          />
          <TextField
            id="type"
            name="type"
            label="Type"
            value={formik.values.type}
            onChange={formik.handleChange}
            className={classes.root}
          />
          <TextField
            id="price"
            name="price"
            label="Prix (€)"
            value={formik.values.price}
            onChange={formik.handleChange}
            className={classes.root}
          />
          <TextField
            id="rating"
            name="rating"
            select
            label="Note"
            value={formik.values.rating}
            onChange={formik.handleChange}
            className={classes.select}
          >
            {ratingOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="warranty_years"
            name="warranty_years"
            select
            label="Années de garantie"
            value={formik.values.warranty_years}
            onChange={formik.handleChange}
            className={classes.select}
          >
            {warrantyYearsOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="available"
            name="available"
            select
            label="Disponible"
            value={formik.values.available}
            onChange={formik.handleChange}
            className={classes.select}
          >
            {availableOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button color="primary" variant="contained" type="submit" className={classes.root}>
            Envoyer
          </Button>
        </form>
      </Card>
      {/* Snackbar afficher un message succes/erreur à l'utilisateur à l'envoi du formulaire */}
      {successMessage
        ? (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open="true"
            message="Object bien enregistré !"
            action={(
              <>
                <IconButton size="small" aria-label="close" color="primary">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            )}
          />
        ) : <p /> }
      {errorMessage
        ? (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open="true"
            message="Erreur lors de la sauvegarde !"
            action={(
              <>
                <IconButton size="small" aria-label="close" color="secondary">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            )}
          />
        ) : <p /> }
    </div>
  );
}

FormItem.propTypes = {
  history: string.isRequired
};

export default withRouter(FormItem);
