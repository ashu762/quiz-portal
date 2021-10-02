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

        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      </Segment>
    </div>
  );
};

export default Loaders;
