// Ce composant permet d'aller à la page d'ajout de nouvelles données
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      position: 'absolute',
      right: 2,
      top: 100,
      textDecoration: 'none'
    }
  }
}));

export default function ButtonAdd() {
  const classes = useStyles();
  return (
    <>
      <Link to="/form/post" className={classes.root}>
        <Button variant="contained" color="primary">
          AJOUTER
        </Button>
      </Link>
    </>
  );
}
