import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/fontawesome-free-brands";
import { faEnvelope } from "@fortawesome/fontawesome-free-solid";

export class NotFound extends React.Component<{}, {}> {
  public render() {
    return <section id="notfound" className="hero is-medium is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            404 Not Found.
          </h1>
          <h2 className="subtitle">
            Sorry about that there bubs, we can't find what you're looking for.
          </h2>
        </div>
      </div>
    </section>;
  }
}
