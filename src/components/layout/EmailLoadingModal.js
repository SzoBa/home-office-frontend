import React from "react";
import EmailLoadingSvgComponent from "../layout/EmailLoadingSvg";

const EmailLoadingModal = () => {
  return (
    <div className="loading_container">
      <div className="loader">
        <div>
          <ul>
            <li>
              <EmailLoadingSvgComponent />
            </li>
            <li>
              <EmailLoadingSvgComponent />
            </li>
            <li>
              <EmailLoadingSvgComponent />
            </li>
            <li>
              <EmailLoadingSvgComponent />
            </li>
            <li>
              <EmailLoadingSvgComponent />
            </li>
            <li>
              <EmailLoadingSvgComponent />
            </li>
          </ul>
        </div>
        <span>Loading</span>
      </div>
    </div>
  );
};

export default EmailLoadingModal;
