import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/fontawesome-free-brands";
import { faEnvelope } from "@fortawesome/fontawesome-free-solid";

export class Footer extends React.Component<{}, {}> {
  public render() {
    return <footer className="footer">
      <div className="container">
        <p>
          Made in 🇨🇦
          <span className="item-break">•</span>
          <a href="mailto:harry@harry.me">
          <FontAwesomeIcon icon={faEnvelope} />
          feedback
          </a>
          <span className="item-break">•</span>
          <a href="https://github.com/airhorns/extractab">
          <FontAwesomeIcon icon={faGithubSquare} />
          source
          </a>
        </p>
      </div>
    </footer>;
  }
}
