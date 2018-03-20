import * as React from "react";

export class Header extends React.Component<{}, {}> {
  public render() {
    return <nav className="navbar">
      <div className="container">
        <h2>EXTRACTAB</h2>
      </div>
    </nav>;
  }
}
