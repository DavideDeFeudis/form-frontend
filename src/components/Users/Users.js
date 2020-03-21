import React from "react";
import User from "../User/User";
import loadingGif from "../../images/load.gif";
import { useHttp } from "../../hooks/http";
import "./Users.scss";

export default function Users() {
  let [isLoading, fetchedData] = useHttp();
  let content = (
    <div className="text-center">
      <img
        src={loadingGif}
        width="40"
        height="40"
        alt="Users werden geladen..."
      />
      <p className="mt-3">Users werden geladen...</p>
    </div>
  );
  if (!isLoading && fetchedData && fetchedData.length > 0) {
    content = fetchedData.map(user => <User key={user._id} user={user} />);
  } else if (!isLoading && !fetchedData) {
    content = <p className="text-center my-5">Ein Fehler ist aufgetreten</p>;
  } else if (!isLoading && fetchedData.length === 0) {
    content = <p className="text-center my-5">Derzeit sind keine Benutzer vorhanden</p>;
  }
  return (
    <div className="users-container">
      <ul className="list-group">{content}</ul>
    </div>
  );
}
