import { useFormik } from 'formik';
import { withRouter, Link } from 'react-router-dom';
import { string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  textField: {
    margin: 15,
    width: '25ch'
  },
  link: {
    textDecoration: 'none'
  }
});

const Login = ({ history }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      axios.post('http://localhost:5000/api/auth/login', values)
        .then((response) => response.data.token)
        .then((response) => localStorage.setItem('token', response))
        .then(() => history.push('/'));
    }
  });

  return (
    <div
      className={classes.container}
    >
      <h1>Se connecter</h1>
      <form
        onSubmit={formik.handleSubmit}
        className={classes.form}
      >
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          className={classes.textField}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          className={classes.textField}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          className={classes.textField}
        >
          Se connecter
        </Button>
      </form>
      <Link to="/signup" className={classes.link}>
        <Button color="primary" variant="contained">Inscription</Button>
      </Link>
    </div>
  );
};

Login.propTypes = {
  history: string.isRequired
};

export default withRouter(Login);
