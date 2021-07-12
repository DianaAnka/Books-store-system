import React from "react";
import { UserProps } from "../type";

type Props = UserProps;

const User: React.FC<Props> = ({ user }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h1>{user.name}</h1>
        <span>{user.email}</span>
      </div>
      <div className="Card--button">
      </div>
    </div>
  );
};

export default User;
