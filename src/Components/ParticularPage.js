import * as React from 'react';
import mainPic from "../Images/mainPic.jpg";
import GridIcon from "../Images/View grid.svg";
import listIcon from "../Images/View list.svg";
import moreIcon from "../MenuIcons/ic_More.svg";
import './particularpage.css'
import { useEffect, useState } from "react";
import Alien from '../MenuIcons/Alien.svg';
import CarProfile from '../MenuIcons/CarProfile.svg';
import FilmReel from '../MenuIcons/FilmReel.svg';
import Planet from '../MenuIcons/Planet.svg';
import Rocket from '../MenuIcons/RocketLaunch.svg';
import Users from '../MenuIcons/Users.svg';
import view from '../DropDownMenuIcon/Frame.svg';
import download from '../DropDownMenuIcon/download.svg';
import rename from '../DropDownMenuIcon/rename.svg';
import share from '../DropDownMenuIcon/share.svg';
import move from '../DropDownMenuIcon/move.svg';
import mprivate from '../DropDownMenuIcon/private.svg';
import delicon from '../DropDownMenuIcon/delete.svg';
import { CircleLoader } from "react-spinners";
import { Details } from "./Details";
import { DeleteComponent } from "./DeleteComponent";
import movieImg from "../Images/films.jpg";
import peopleImg from '../Images/people.jpg';
import planetImg from '../Images/planets.jpg';
import speciesImg from '../Images/species.jpg';
import starshipsImg from '../Images/starships.jpg';
import vehicleImg from '../Images/vehicles.jpg';






export function ParticularPage({ dataFromChild, path, location, load, inputValue }) {

    const [isGridSelectedLayout, setIsGridSelectedLayout] = useState(true);
    const [tabName, setTabName] = useState('');
    const [icon, setIcon] = useState(FilmReel);
    const [dataImg,setDataImg]=useState(mainPic);

    const [firstCol, setFirstCol] = useState('');
    const [secondCol, setSecondCol] = useState('');
    const [thirdCol, setThirdCol] = useState('');

    const fetchData = () => {

        if (location === '/films') {

            setTabName('Films');
            setIcon(FilmReel);
            setFirstCol('Name');
            setSecondCol('Director');
            setThirdCol('Release Date')
            setDataImg(movieImg);

        } else if (location === '/planets') {
            setIcon(Planet);
            setTabName('Planets');
            setFirstCol('Name');
            setSecondCol('Terrain');
            setThirdCol('Population');
            setDataImg(planetImg);
        }
        else if (location === '/people') {
            setIcon(Users);
            setTabName('People');
            setFirstCol('Name');
            setSecondCol('Gender');
            setThirdCol('Birth Year');
            setDataImg(peopleImg);
        }
        else if (location === '/starships') {
            setIcon(Rocket);
            setTabName('Starships');
            setFirstCol('Name');
            setSecondCol('Manufacturer');
            setThirdCol('Starship Class');
            setDataImg(starshipsImg);
        }
        else if (location === '/species') {
            setIcon(Alien);
            setTabName('Species');
            setFirstCol('Name');
            setSecondCol('Classification');
            setThirdCol('Language');
            setDataImg(speciesImg);
        }
        else if (location === '/vehicles') {
            setIcon(CarProfile);
            setTabName('Vehicles');
            setFirstCol('Name');
            setSecondCol('model');
            setThirdCol('Vehicle Class');
            setDataImg(vehicleImg);
        }
    };


    useEffect(() => {
        fetchData();
    }, [fetchData, location]);

    const [isMoreClick, setIsMoreClick] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const getMoreOption = (getname) => {
        setIsMoreClick(!isMoreClick);
        setSelectedItem(getname);
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsMoreClick(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [detailView, setDetailView] = useState(false);
    const [firstData, setFirstData] = useState('');
    const [secondData, setSecondData] = useState('');
    const [thirdData, setThirdData] = useState('');
    const handleDetailView = (data) => {
        setFirstData(dataFromChild[data].first);
        setSecondData(dataFromChild[data].second);
        setThirdData(dataFromChild[data].third);
        setDetailView(!detailView);
    }
    const handleSidebarClose = () => {
        setDetailView(false);
    };

    const [delPopOpen, setDelPopOpen] = useState(false);
    const openDeletePop = () => {
        setDelPopOpen(!delPopOpen);
    }
    const handlePopDel = () => {
        setIsMoreClick(false);
        setDelPopOpen(false);
    };

    const handleViewClick = (data) => {
        setIsMoreClick(false);
        handleDetailView(data);

    }
    const filteredMovieNames = Object.keys(dataFromChild).filter(
        (title) =>
            title.toLowerCase().includes(inputValue.toLowerCase())
    );

    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const handleClickPosition = (event) => {
        const { clientX, clientY } = event;
        setClickPosition({ x: clientX, y: clientY });
    };

    return (
        <>
            {load ? (<> <CircleLoader color="#36d7b7" /> </>) : (
                <div className="particularPageMain mt-3">
                    {detailView && (
                        <div className={`detailViewContainer ${detailView ? 'open' : ''}`}>
                            {detailView ? (<div className={`detailViewMain`}>
                                <Details first={firstData} second={secondData} third={thirdData} title={tabName} firstTag={firstCol} secondTag={secondCol} thirdTag={thirdCol} onClose={handleSidebarClose} />
                            </div>) : (<div></div>)}
                        </div>
                    )}
                    <div className={`text-white topBarParticular  flex item-center relative cursor-pointer duration-300  rounded-md  mb-4 `}>
                        <span className={`-mt-1 text-gray-800`}><img src={icon} alt={'icon'}/></span>
                        <span className={` font-medium ml-2  duration-300 flex-1 `}>{tabName}</span>
                        <span className={`absolute flex item-center  duration-300  pt-1 ${isGridSelectedLayout ? 'selectedLayoutGrid' : 'normalLayoutGrid'}`} onClick={() => setIsGridSelectedLayout(!isGridSelectedLayout)} ><img src={GridIcon} className={`layoutselectorsize`} alt={'icon'}/><span className={`text-black-50 my-0.5 ${isGridSelectedLayout ? 'block' : 'hidden'}`}>Grid</span></span>
                        <span className={`absolute  flex item-center duration-300  pt-1  ${!isGridSelectedLayout ? 'selectedLayoutList' : 'normalLayoutList'}`} onClick={() => setIsGridSelectedLayout(!isGridSelectedLayout)}><img src={listIcon} className={`layoutselectorsize`} alt={'icon'}/><span className={`text-black-50 my-0.5  ${!isGridSelectedLayout ? 'block' : 'hidden'}`}>List</span></span>
                    </div>
                    <div className="row duration-300">
                       {isGridSelectedLayout ? (
                            <>
                                {filteredMovieNames.map((title) => (
                                    <div className="col-lg-4 col-md-6 mb-4 gridDropDown">
                                        <div className="card duration-300 DataCard">
                                            <img src={dataImg} className="card-img-top dataImg " alt="..." width={10} height={10} onClick={() => handleDetailView(title)} />
                                            <div className="card-body DataCardBody" >
                                                <div className={`text-white  flex item-center relative cursor-pointer duration-300  rounded-md  `}>
                                                    <span className={`-mt-1 text-gray-800`}><img src={icon} alt={'icon'}/></span>
                                                    <span className={` font-medium ml-2  duration-300 flex-1 `} >{title}</span>
                                                    <span className={`absolute  duration-300 right-3 pt-1 dotIcon`} onClick={() => getMoreOption(dataFromChild[title].first)} ><img src={moreIcon} alt={'icon'} onClick={handleClickPosition} /></span>
                                                </div>
                                            </div>
                                        </div>
                                        {isMoreClick && selectedItem === dataFromChild[title].first ? (
                                            <div className={`bg-white dropDownMenuGrid`}
                                                style={{
                                                    top: clickPosition.y + 40 + 'px',
                                                    left: clickPosition.x - 200 + 'px',
                                                }}>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem " onClick={() => handleViewClick(title)}>
                                                    <span className="pt-1"><img src={view} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">View</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={download} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Download</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={rename} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Rename</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={share} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Share Link</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={move} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Move</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center  cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={mprivate} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Mark Private</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem" onClick={openDeletePop}>
                                                    <span className="pt-1"><img src={delicon} alt="Drop Down Icon" /></span>
                                                    <span className="font-medium duration-300 flex-1 text-red-500">Delete</span>
                                                </div>
                                            </div>) :
                                            <div></div>
                                        }
                                    </div>
                                ))}
                            </>) :
                            <>
                                <div className={`row headList ml-0.5`}>
                                    <div className="col-5   p-3">
                                        {firstCol}
                                    </div>
                                    <div className="col-3   p-3 ">
                                        {secondCol}
                                    </div>
                                    <div className="col-3  p-3 ">
                                        {thirdCol}
                                    </div>
                                    <div className="col-1  p-3">
                                    </div>
                                </div>
                                {filteredMovieNames.map((title) => (
                                    <div className="col-lg-12 col-md-12 mb-2 mt-2 dropDownContainer">
                                        <div className="row DataList">
                                            <div className="col-5  p-3">
                                                <div className={` text-white  flex item-center relative cursor-pointer duration-300  rounded-md  `}>
                                                    <span className={`-mt-1 text-gray-800`}><img src={icon} alt={'icon'}/></span>
                                                    <span className={` font-medium ml-2  duration-300 flex-1 `}>{title}</span>
                                                </div>
                                            </div>
                                            <div className="col-3  p-3 text-white">
                                                {dataFromChild[title].second}
                                            </div>
                                            <div className="col-3 p-3 text-white">
                                                {dataFromChild[title].third}
                                            </div>
                                            <div className="col-1 moreDot  p-3">
                                                <span className={`absolute  duration-300 right-3 pt-1 dotIcon`} onClick={() => getMoreOption(dataFromChild[title].first)} ><img src={moreIcon} onClick={handleClickPosition} alt={'icon'}/></span>
                                            </div>
                                        </div>
                                        {isMoreClick && selectedItem === dataFromChild[title].first ? (
                                            <div className={`bg-white dropDownMenu`}  style={{
                                                top: clickPosition.y + 30 + 'px',
                                                left: clickPosition.x -170 + 'px',
                                            }}>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem " onClick={() => handleViewClick(title)}>
                                                    <span className="pt-1"><img src={view} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">View</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={download} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Download</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={rename} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Rename</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={share} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Share Link</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={move} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Move</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center  cursor-pointer duration-300 rounded-md  dropDownMenuItem">
                                                    <span className="pt-1"><img src={mprivate} alt="Drop Down Icon" /></span>
                                                    <span className="text-black font-medium duration-300 flex-1">Mark Private</span>
                                                </div>
                                                <div className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md  dropDownMenuItem" onClick={openDeletePop}>
                                                    <span className="pt-1"><img src={delicon} alt="Drop Down Icon" /></span>
                                                    <span className="font-medium duration-300 flex-1 text-red-500">Delete</span>
                                                </div>
                                            </div>) :
                                            <div></div>
                                        }
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                    {delPopOpen && <div className="background-blur" />}
                    <div className={`deleteContainer ${detailView ? 'open' : ''}`}>
                        {delPopOpen && <DeleteComponent onClose={handlePopDel} />}
                    </div>
                </div>
            )}</>
    );
}