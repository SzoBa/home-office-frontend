import React from "react";
import { Route, Switch } from "react-router-dom";

export default function AboutContainer() {
  return (
    <div className="full_width_container">
      <AboutContent />
      <Switch>
        <Route path="/about/impressum" component={Impressum} />
        <Route path="/about/policy" component={Policy} />
        <Route path="/about/about" component={About} />
        <Route path="/about/contact" component={Contact} />
      </Switch>
    </div>
  );
}

const Impressum = () => {
  return (
    <div>
      <span>Impressum Here</span>
    </div>
  );
};

const Policy = () => {
  return (
    <div>
      <span>Policy Here</span>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <span>About Here</span>
    </div>
  );
};

const Contact = () => {
  return (
    <div>
      <span>Contact Here</span>
    </div>
  );
};

const AboutContent = () => {
  return <div>This is the about page main content</div>;
};
