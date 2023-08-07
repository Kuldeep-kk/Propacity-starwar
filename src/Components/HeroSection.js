import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './herosection.css';
import { SideNav } from "./SideNav";
import { DefaultPage } from "./DefaultPage";
import { ParticularPage } from "./ParticularPage";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { TopBar } from "./TopBar";
import { RxCross2 } from "react-icons/rx";
export function HeroSection() {
    const [dataFromChild, setDataFromChild] = useState([]);
    const [path, setPath] = useState();
    const [location, setLocation] = useState('');
    const [spLoading, setSpLoading] = useState(true);
    const handleDataFromChild = (data, path, loc, load) => {
        setDataFromChild(data);
        setPath(path);
        setLocation(loc);
        setSpLoading(false);
    };
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (value) => {
        setInputValue(value);
    };
    const [menuShow, setMenuShow] = useState(true);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const closeMenufn = () => {
        setMenuShow(false);
    }
    return (
        <div>
            <div className={`topBarFixed`}><TopBar onChangeInput={handleInputChange} /></div>
            {!menuShow && screenWidth < 768 ? (<div className={'menuButton'} onClick={() => { setMenuShow(true) }}>Menu</div>) : (<div></div>)}
            <div className="row sideBar">
                {screenWidth < 768 ? (<>
                    {menuShow ? (<>
                                    <RxCross2 className={`crossButton`} size={35} onClick={closeMenufn} />
                                    <div className=" col-md-3 col-lg-3  sideNav ">
                                        <SideNav sendDataToParent={handleDataFromChild} />
                                    </div>
                                </>)
                                : (<div></div>)}
                                </>) :
                                (<div className=" col-md-3 col-lg-3  sideNav ">
                                    <SideNav sendDataToParent={handleDataFromChild} />
                                 </div>)}
                    <div className="col-sm-12 col-md-9 col-lg-9   HeroSectionMain ">
                    <Routes>
                        <Route path='/' element={<div className={`defaultDiv`}><DefaultPage /></div>} />
                        <Route path='/particularpage' element={
                            spLoading ? (<div className={`lg:mt-72 sm:mt-40`}> <CircleLoader className={`m-auto `} color="#CB1A80" size={120} /> </div>) : (<>
                                <ParticularPage dataFromChild={dataFromChild} path={path} location={location} load={spLoading} inputValue={inputValue} />
                            </>)
                        } />
                    </Routes>
                </div>
            </div>


        </div>
    );
}