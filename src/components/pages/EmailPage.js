import React, { useState } from "react";
import EmailTable from "../layout/EmailTable";

export default function EmailPage() {
  const [writeEmail, setWriteEmail] = useState(false);

  return (
    <div className="email_container">
      <button
        onClick={() => {
          setWriteEmail(!writeEmail);
        }}
      >
        Write
      </button>
      {writeEmail ? <div>Csoki</div> : <EmailTable />}
    </div>
  );
}
