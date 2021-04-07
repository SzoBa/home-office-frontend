import React from "react";
import { Route, Switch, Link } from "react-router-dom";

export default function AboutContainer() {
  return (
    <div className="full_width_container">
      <div id="content_div_about">
        <AboutContent />
        <Switch>
          <Route path="/about/impressum" component={Impressum} />
          <Route path="/about/policy" component={Policy} />
          <Route path="/about/about" component={About} />
          <Route path="/about/contact" component={Contact} />
        </Switch>
      </div>
    </div>
  );
}

const Impressum = () => {
  return (
    <div className="about_inner_content">
      <h3>IMPRESSUM</h3>
      <div>
        <div>Company: Balázs Szolcsánszki for fun :D</div>
        <div>Creator: Balázs Szolcsánszki</div>
        <div>API: http://homeoffice.com</div>
        <div>Web: localhost:3000 :D</div>
      </div>
    </div>
  );
};

const Policy = () => {
  return (
    <div className="about_inner_content">
      <h3>POLICY</h3>
      <div>
        <div>This page is under development...</div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="about_inner_content">
      <h3>ABOUT</h3>
      <div>
        <div>Design: Balázs Szolcsánszki</div>
        <div>Front-end: Balázs Szolcsánszki</div>
        <div>Back-end: Balázs Szolcsánszki</div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="about_inner_content">
      <h3>CONTACT</h3>
      <div>
        <div>Name: Balázs Szolcsánszki</div>
        <div>E-mail: bszolcsan@gmail.com</div>
        <div>Tel.: +3670/287-53-38</div>
        <div>LinkedIn: </div>
      </div>
    </div>
  );
};

const AboutContent = () => {
  return <h2>INFORMATION</h2>;
};
