import React from "react";
import { useSelector } from "react-redux";
import EmailTable from "../layout/EmailTable";
import EmailWriteForm from "../layout/EmailWriteForm";

export default function EmailPage() {
  const writeReadEmail = useSelector((state) => state.writeReadEmail);

  return (
    <div className="email_container">
      {writeReadEmail ? <EmailWriteForm /> : <EmailTable />}
    </div>
  );
}
