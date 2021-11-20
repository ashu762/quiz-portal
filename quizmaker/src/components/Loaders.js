import React from "react";
import { Spinner } from "react-bootstrap";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import "../index.css";
const Loaders = () => {
  return (
    <div className="loader">
      <Segment>
        <Dimmer active inverted>
          <Loader size="large" className="margin-top"></Loader>
        </Dimmer>
        <Spinner animation="border" variant="info" size="lg" />
      </Segment>
    </div>
  );
};

export default Loaders;
