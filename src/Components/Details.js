import * as React from 'react';
import './details.css';
import cross from "../MenuIcons/ic_Close.svg";
import img from "../Images/mainPic.jpg"


export function Details({ first, second, third, title, firstTag, secondTag, thirdTag, onClose }) {


    return (
        <div className={"SelectedBox "}>
            <div className={`topBar text-white gap-x-4 flex item-center relative cursor-pointer   duration-300   mt-2  `}>

                <span className={`  text-white font-medium  duration-300 flex-1 `}>{title} Details</span>
                <span className={` absolute  duration-300 right-3 pt-1  hover:rotate-90 right-0`} onClick={onClose}><img src={cross} alt={'closeLogo'}/></span>
            </div>
            <p className={`imgLabel`}>Image</p>
            <img src={img} alt={"Selected Img"} className={"SelectedIng"} />
            <div className={`text-white mt-3 `}>
                <h2 className={'textLabel'}>{firstTag}</h2>
                <h2 className={`textBox`} >{first}</h2>
                <h2 className={'textLabel'}>{secondTag}</h2>
                <h2 className={`textBox`}  >{second}</h2>
                <h2 className={'textLabel'}>{thirdTag}</h2>
                <h2 className={`textBox`} >{third}</h2>
            </div>
            <div className={`bottomBar`}>
                <h2 className={`bottomBut duration-300  text-white`} onClick={onClose}>Close</h2>
            </div>
        </div>
    );
}