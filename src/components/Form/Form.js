import React, { useState } from 'react'
import './Form.scss';
import SpinnerModal from '../SpinnerModal/SpinnerModal'

export default function ContactForm() {
    const initialState = {
        anrede: '',
        name: '',
        email: '',
        anfrage: '',
        datenschutz: ''
    }
    const [formData, setFormData] = useState(initialState)

    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        const isCheckBox = e.target.type === 'checkbox'
        setFormData({
            ...formData,
            [e.target.name]: isCheckBox ? e.target.checked : e.target.value
        })
        if (feedback) setFeedback('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        sendFormData()
    }

    const sendFormData = () => {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/contact`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {
                setLoading(false)
                setFeedback(json.success ? 'Ihre Nachricht wurde erfolgreich gesendet' : 'Fehler beim Senden Ihrer Nachricht')
                setFormData(initialState)
            })
            .catch(err => {
                setLoading(false)
                setFeedback('Fehler beim Senden Ihrer Nachricht')
            })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputAnrede" className="label">Anrede*</label>
                    <input name="anrede" type="text" className="form-control" id="inputAnrede" placeholder="Anrede" onChange={handleChange} value={formData.anrede} required />
                </div>
                <div className="form-group">
                    <label htmlFor="inputName" className="label">Name*</label>
                    <input name="name" type="text" className="form-control" id="inputName" placeholder="Name" onChange={handleChange} value={formData.name} required />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail" className="label">Email*</label>
                    <input name="email" type="email" className="form-control" id="inputEmail" placeholder="Email" onChange={handleChange} value={formData.email} required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1" className="label">Anfrage*</label>
                    <select name="anfrage" className="form-control" id="exampleFormControlSelect1" onChange={handleChange} value={formData.anfrage} required>
                        <option value="">--Wählen Sie bitte eine Option--</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <div className="">Datenschutz Zustimmung*</div>
                    <div className="form-check">
                        <input name="datenschutz" className="form-check-input" type="checkbox" id="gridCheck1" onChange={handleChange} value={formData.datenschutz} required />
                        <label className="form-check-label" htmlFor="gridCheck1">Mit dem Absenden stimme ich den Datenschutzbestimmungen zu.</label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-secondary">Absenden</button>
                    <p className='my-3'>{feedback}</p>
                </div>
            </form>
            <SpinnerModal loading={loading} fullScreen />
        </div >
    )
}
