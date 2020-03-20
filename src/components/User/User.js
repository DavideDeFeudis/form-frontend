import React from "react";

export default function User({ user }) {
  return (
    <p>
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
    </p>
  );
}
