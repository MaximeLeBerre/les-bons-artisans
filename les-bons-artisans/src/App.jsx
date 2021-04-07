import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListItem from './components/ListItems';
import ItemDetails from './components/ItemDetails';
import Navbar from './components/Navbar';
import FormItem from './components/FormItem';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <ListItem />
          </Route>
          <Route path="/details/:id">
            <ItemDetails />
          </Route>
          <Route path="/form/post">
            <FormItem />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
