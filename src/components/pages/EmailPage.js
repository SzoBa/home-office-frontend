import React from "react";
import { useSelector } from "react-redux";
import EmailTable from "../layout/EmailTable";
import EmailWrite from "../layout/EmailWrite";

export default function EmailPage() {
  const writeReadEmail = useSelector((state) => state.writeReadEmail);

  return (
    <div className="email_container">
      {writeReadEmail ? <EmailWrite /> : <EmailTable />}
    </div>
  );
}
