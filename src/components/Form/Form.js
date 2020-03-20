import React, { useState, useEffect } from "react";
import "./Form.scss";
import SpinnerModal from "../SpinnerModal/SpinnerModal";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    // fetch(`${process.env.REACT_APP_BACKEND_HOST}/user`, {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
    // .then(response => response.json())
    // .then(json => {
    //     console.log(json)
    //     setLoading(false)
    //     setFeedback(json.success ? 'Ihre Anfrage wurde erfolgreich gesendet.' : 'Fehler beim Senden Ihrer Anfrage.')
    //     // setFormData(initialState)

    // })
    // .catch(err => {
    //     console.log('Fehler beim Senden Ihrer Anfrage:', err)
    //     setLoading(false)
    //     setFeedback('Fehler beim Senden Ihrer Anfrage.')
    // })
  };

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // beschreibungstext

  // useEffect(() => {
  //     if (formData.anfrage === 'Option 2') {
  //         setIsVisible(true)
  //     } else {
  //         setIsVisible(false)
  //         // setFormData({
  //         //     ...formData,
  //         //     beschreibungstext: '' // clear field if user selects option 1 or 3 after having filled it
  //         // })
  //     }
  // }, []) // need state for anfrage? and for text to clear it?

  // const handleChange = e => {
  //     const isCheckBox = e.target.type === 'checkbox'
  //     setFormData({
  //         ...formData,
  //         [e.target.name]: isCheckBox ? e.target.checked : e.target.value
  //     })
  //     if (feedback) setFeedback('')
  // }

  // const handleSubmit = e => {
  //     e.preventDefault()
  //     setLoading(true)
  //     sendFormData()
  // }

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
            ref={register({
              required: "Pflichtfeld."
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
            ref={register({
              required: "Pflichtfeld.",
              minLength: {
                value: 2,
                message: "Name muss mindestens 8 Zeichen lang sein."
              } // pattern="(.|\s)*\S(.|\s)*"
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
            ref={register({
              required: "Pflichtfeld.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Geben Sie bitte eine gültige E-Mail-Adresse an."
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
            ref={register({
              required: "Pflichtfeld."
            })}
          >
            <option value="">--Auswählen--</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        {errors.anfrage && <p className="error">{errors.anfrage.message}</p>}
        </div>
        {isVisible && (
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
                required: "Pflichtfeld."
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
              ref={register({
                required: "Pflichtfeld."
              })}
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              Mit dem Absenden stimme ich den Datenschutzbestimmungen zu.
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
          <p className="my-3">{feedback}</p>
        </div>
      </form>
      <SpinnerModal loading={loading} fullScreen />
    </div>
  );
}
