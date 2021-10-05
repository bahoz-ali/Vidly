import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm"
function App() {
  return (
    <div>
      <NavBar/>
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Redirect from="/" exact to="/movies"></Redirect>
          <Redirect to="not-found"></Redirect>
        </Switch>
      </main>
    </div>
  );
}

export default App;
