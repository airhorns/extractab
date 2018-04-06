import * as React from "react";
import * as _ from "lodash";
import * as logo from "images/color_logo_transparent.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";

import { TabHandle } from "./api";

interface IServerSideFeatureData {
  order: number;
  title: string;
  handle: TabHandle;
}

export class Header extends React.Component<{}, {}> {
  public render() {
    const sortedTabLinks = _.sortBy((window as any).FEATURED_TABS as IServerSideFeatureData[], "order");
    const featuredTabLinks = sortedTabLinks.map((data) => {
      return <a className="navbar-link" key={data.handle} href={"/t/" + data.handle}>{data.title}</a>;
    });

    return <div className="navbar-container">
      <div className="container">
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={logo} className="logo" alt="Extractab" />
            </a>

            <div className="navbar-burger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <a className="button is-warning" href="/t/new">
                      <span className="icon">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      <span>New Tab</span>
                    </a>
                  </p>
                </div>
              </div>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Featured Tabs
                </a>

                <div className="navbar-dropdown">
                  {featuredTabLinks}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>;
  }
}
