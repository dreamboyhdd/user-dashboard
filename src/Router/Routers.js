import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Sidebar, Navbars, ListUser } from "../Components";


export const Routers = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Sidebar} />
      <Route path="/" component={Navbars} />
      <Switch>
        <Route exact path="/user-list" component={ListUser} />
      </Switch>
    </BrowserRouter>
  );
};
