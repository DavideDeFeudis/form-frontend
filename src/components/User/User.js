import React from "react";

export default function User({ user }) {
  return (
    <li className="list-group-item">
      Anrede: {user.anrede}
      <br />
      Name: {user.name}
      <br />
      Email: {user.email}
      <br />
      Anfrage: {user.anfrage}
      <br />
      {user.beschreibungstext && (
        <span>Beschreibungstext: {user.beschreibungstext}</span>
      )}
    </li>
  );
}
