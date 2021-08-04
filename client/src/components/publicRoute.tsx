import React from "react";
import { Route, Redirect } from "react-router-dom";
import useStore from "../store";

const PublicRoute: React.FC<{
  component: React.FC;
  path: string;
}> = (props) => {
  const store = useStore((state) => state);
  console.log();

  return !store.user?.isLogged ? (
    <Route path={props.path} component={props.component} />
  ) : (
    <Redirect to="/homePage" />
  );
};
export default PublicRoute;
