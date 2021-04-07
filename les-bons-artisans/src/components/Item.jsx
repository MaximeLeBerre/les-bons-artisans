import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import green from '@material-ui/core/colors/green';
import deepOrange from '@material-ui/core/colors/deepOrange';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 15
  },
  palette: {
    primary: {
      main: green
    },
    secondary: {
      main: deepOrange
    }
  }
});

export default function Item({
  id,
  name,
  type,
  price,
  rating,
  warrantyYears,
  available
}) {
  const classes = useStyles();
  const token = localStorage.getItem('token');

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const deleteObject = () => {
    axios.delete(`http://localhost:5000/api/object/${id}`, axiosConfig);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            <p>
              Type :
              {type}
            </p>
            <p>
              Prix :
              {price}
            </p>
            <p>
              Note :
              {rating}
            </p>
            <p>
              Années de garantie :
              {warrantyYears}
            </p>
            <p>
              Disponible :
              {available ? (
                <Badge
                  color="primary"
                  variant="dot"
                />
              ) : (
                <Badge
                  color="secondary"
                  variant="dot"
                />
              )}
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/details/${id}`} style={{ textDecoration: 'none' }}>
          <Button size="small" color="primary">
            Modifier
          </Button>
        </Link>
        <Button size="small" color="secondary" onClick={deleteObject}>
          Supprimer
        </Button>
      </CardActions>
    </Card>
  );
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  warrantyYears: PropTypes.number.isRequired,
  available: PropTypes.bool.isRequired
};
