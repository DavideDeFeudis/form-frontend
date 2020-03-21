import React, { useState } from "react";
import "./Form.scss";
import SpinnerModal from "../SpinnerModal/SpinnerModal";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Form() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const anfrage = watch("anfrage");
  const onFocus = () => {
    if (response) setResponse(null);
  };
  const onSubmit = formData => {
    setLoading(true);
    setTimeout(() => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_HOST}/user`, formData, {
          timeout: 7000
        })
        .then(res => {
          setLoading(false);
          if (res.data.success) {
            reset();
            setResponse("success");
          } else {
            setResponse("fail");
          }
        })
        .catch(err => {
          setLoading(false);
          setResponse("fail");
        });
    }, 2000);
  };
  let feedback = null;
  if (response === "success") {
    feedback = (
      <p className="my-3 success">Ihre Anfrage wurde erfolgreich gesendet!</p>
    );
  } else if (response === "fail") {
    feedback = <p className="my-3 fail">Fehler beim Senden Ihrer Anfrage!</p>;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="anrede" className="label">
            Anrede*
          </label>
          <select
            name="anrede"
            className="form-control"
            id="anrede"
            onFocus={onFocus}
            ref={register({
              required: "Pflichtfeld"
            })}
          >
            <option value="">--Auswählen--</option>
            <option>Frau</option>
            <option>Herr</option>
          </select>
          {errors.anrede && <p className="error">{errors.anrede.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="inputName" className="label">
            Name*
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Name"
            onFocus={onFocus}
            ref={register({
              required: "Pflichtfeld",
              minLength: {
                value: 2,
                message: "Name muss mindestens 8 Zeichen lang sein"
              },
              pattern: {
                value: /(.|\s)*\S(.|\s)*/,
                message: "Dieses Feld darf nicht nur Leerzeichen enthalten"
              }
            })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="label">
            Email*
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="E-Mail"
            onFocus={onFocus}
            ref={register({
              required: "Pflichtfeld",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Geben Sie bitte eine gültige E-Mail-Adresse an"
              }
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="anfrage" className="label">
            Anfrage*
          </label>
          <select
            name="anfrage"
            className="form-control"
            id="anfrage"
            value={anfrage}
            onFocus={onFocus}
            ref={register({
              required: "Pflichtfeld"
            })}
          >
            <option value="">--Auswählen--</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          {errors.anfrage && <p className="error">{errors.anfrage.message}</p>}
        </div>
        {anfrage === "Option 2" && (
          <div className="form-group">
            <label htmlFor="inputBeschreibungstext" className="label">
              Beschreibungstext
            </label>
            <input
              name="beschreibungstext"
              type="text"
              className="form-control"
              id="inputBeschreibungstext"
              placeholder="Beschreibungstext"
              ref={register({
                required: "Pflichtfeld",
                pattern: {
                  value: /(.|\s)*\S(.|\s)*/,
                  message: "Dieses Feld darf nicht nur Leerzeichen enthalten"
                }
              })}
            />
            {errors.beschreibungstext && (
              <p className="error">{errors.beschreibungstext.message}</p>
            )}
          </div>
        )}
        <div className="form-group">
          <div className="">Datenschutz Zustimmung*</div>
          <div className="form-check">
            <input
              name="datenschutz"
              className="form-check-input"
              type="checkbox"
              id="gridCheck1"
              onFocus={onFocus}
              ref={register({
                required: "Sie müssen zustimmen"
              })}
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              Mit dem Absenden stimme ich den Datenschutzbestimmungen zu
            </label>
          </div>
          {errors.datenschutz && (
            <p className="error">{errors.datenschutz.message}</p>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-secondary">
            Absenden
          </button>
          {feedback}
        </div>
      </form>
      <SpinnerModal loading={loading} />
    </div>
  );
}
