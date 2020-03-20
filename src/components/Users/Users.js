import React from "react";
import User from "../User/User";
import loadingGif from "../../images/load.gif";
import { useHttp } from "../../hooks/http";
import "./Users.scss";

export default function Users() {
  const url = process.env.REACT_APP_BACKEND_HOST + "/users";
  const [isLoading, fetchedData] = useHttp(url, []);

  let content = (
    <div className="fetching-spinner container text-center">
      <img src={loadingGif} width="40" height="40" alt="Users werden geladen..." />
      <p className="mt-3">Users werden geladen...</p>
    </div>
  );
  const usersList = fetchedData
    ? fetchedData.map(user => {
        return <User key={user._id} user={user} />;
      })
    : [];
  if (!isLoading && fetchedData && fetchedData.length > 0) {
    content = usersList;
  } else if (!isLoading && !fetchedData) {
    content = <p className="my-5">Ein Fehler ist aufgetreten</p>;
  } else if (!isLoading && fetchedData.length === 0) {
    content = <p className="my-5">Derzeit sind keine Benutzer vorhanden</p>;
  }
  return (
    <div className="wrapper">
      <div className="users-container">{content}</div>
    </div>
  );
}
