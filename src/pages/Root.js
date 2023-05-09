import Header from "../components/Header";

import { Fragment } from "react";
import { Outlet } from "react-router";

function Root() {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}

export default Root;
