import * as React from 'react';
import warning from '../MenuIcons/alert-circle.svg';
import './deleteComponents.css';

export function DeleteComponent({ onClose }) {
    return (
        <div className="popup-container">
            <div className="popup">
                <div className={`bg-white deleteMain`}>
                    <div className={`warnDiv`}>
                        <img src={warning} className={`warnImg`} alt={'warningimg'} />
                    </div>
                    <h2>Caution!</h2>
                    <p>Are you sure you want to Delete <span>Name</span></p>
                    <div className={`flex Delbuttons`}>
                        <span className={`calBut`} onClick={onClose}>Cancel</span>
                        <span className={`delBut`} onClick={onClose}>Yes</span>
                    </div>
                </div>

            </div>

        </div>


    );
}