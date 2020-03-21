import React from "react";
import User from "../User/User";
import { useHttp } from "../../hooks/http";
import "./Users.scss";
import SpinnerModal from "../SpinnerModal/SpinnerModal";

export default function Users() {
  let [loading, fetchedData] = useHttp();
  let content = <SpinnerModal loading={loading} />;
  if (!loading && fetchedData && fetchedData.length > 0) {
    content = fetchedData.map(user => <User key={user._id} user={user} />);
  } else if (!loading && !fetchedData) {
    content = <p className="text-center my-5">Ein Fehler ist aufgetreten</p>;
  } else if (!loading && fetchedData.length === 0) {
    content = (
      <p className="text-center my-5">Derzeit sind keine Benutzer vorhanden</p>
    );
  }
  return (
    <div className="users-container">
      <ul className="list-group">{content}</ul>
    </div>
  );
}
