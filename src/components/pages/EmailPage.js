import React, { useState } from "react";
import { useSelector } from "react-redux";
import UseGetData from "../../hooks/UseGet";
import * as ENV from "../files/ENV.json";

export default function EmailPage() {
  const user = useSelector((state) => state.login);
  const mailsData = UseGetData(
    ENV.mailsWithOptions + "?q=in:inbox",
    user.sanctum_token
  )[1];

  return (
    <div>
      {mailsData.messages
        ? mailsData.messages.map((mail, index) => <p key={index}>{mail.id}</p>)
        : "Loading"}
    </div>
  );
}
