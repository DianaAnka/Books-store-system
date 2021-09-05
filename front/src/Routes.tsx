import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import PublicRoute from "./components/publicRoute";
import HomePage from "./pages/homePage/homePage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

const Routes = () => (
  <Router>
    <Switch>
      <PublicRoute path="/sign-in" component={Login} />
      <PublicRoute path="/sign-up" component={Register} />
      <Route path="/home-page" component={HomePage} />
    </Switch>
  </Router>
);

export default Routes;
