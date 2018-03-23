import * as React from "react";
import * as logo from "images/color_logo_transparent.svg";

export class Header extends React.Component<{}, {}> {
  public render() {
    return <nav className="navbar">
      <div className="container">
        <a className="navbar-item" href="/">
          <img src={logo} className="logo" alt="Extractab" />
        </a>
      </div>
    </nav>;
  }
}
