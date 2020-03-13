import React from "react";
import './SpinnerModal.scss';
import loadingGif from '../../images/load.gif'

export default function SpinnerModal({ loading }) {
    if (!loading) {
        return null;
    } else {
        return (
            <div className='modal-container'>
                <img src={loadingGif} width='45' height='45' alt="Bitte warten Sie..." />
            </div>
        );
    }
}
