import * as React from 'react';
import './defaultpage.css';
import mainPic from '../Images/mainPic.jpg';
export function DefaultPage() {
    return (
        <div >
            <div className="defaultPageBox ">
                <div className="card mainCard" >
                    <img src={mainPic} className="card-img-top cardImage" alt="MainPic" />
                    <div className="card-body">
                        <h5 className="card-title ctitle">Welcome to Star Wars</h5>
                        <h5 className="card-title ctitle">Dashboard</h5>
                        <p className="cardQuotes">Star Wars is an American epic space opera multimedia franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}