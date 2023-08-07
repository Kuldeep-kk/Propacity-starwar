import * as React from 'react';
import './sidenav.css';
import Folder from '../MenuIcons/FolderSimple.svg';
import Alien from '../MenuIcons/Alien.svg';
import CarProfile from '../MenuIcons/CarProfile.svg';
import FilmReel from '../MenuIcons/FilmReel.svg';
import Planet from '../MenuIcons/Planet.svg';
import Rocket from '../MenuIcons/RocketLaunch.svg';
import Users from '../MenuIcons/Users.svg';
import Arrow from '../MenuIcons/CaretRight.svg';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function SideNav({ sendDataToParent }) {
    const [open, setOpen] = useState(true);
    const [dropOpen, setDropOpen] = useState(false);
    const [moviesName, setMoviesName] = useState({});
    const [dropDownIcons, setDropDownIcons] = useState(FilmReel);
    const [currentPath, setCurrentPath] = useState('/films');
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setDropOpen(!dropOpen);
        if (item.path === '/films') {
            setDropDownIcons(FilmReel);
        }
        else if (item.path === '/people') {
            setDropDownIcons(Users);
        }
        else if (item.path === '/planets') {
            setDropDownIcons(Planet);
        }
        else if (item.path === '/species') {
            setDropDownIcons(Alien);
        }
        else if (item.path === '/starships') {
            setDropDownIcons(Rocket);
        }
        else if (item.path === '/vehicles') {
            setDropDownIcons(CarProfile);
        }
        setCurrentPath(item.path);
        fetchDataFromAPI(item.path);
    };
    const Dropfn = () => {
        setDropOpen(!dropOpen);
    }
    const fetchDataFromAPI = async (endpoint) => {
        setLoading(true);
        try {
            const response = await fetch(`https://swapi.dev/api${endpoint}/`);
            setLoading(false);
            let moviesObject = {};
            let peopleObject = {};
            let planetsObject = {};
            if (endpoint === '/films') {
                const data = await response.json();
                data.results.forEach((movie) => {
                    const movieData = {
                        first: movie.title,
                        second: movie.director,
                        third: movie.release_date,
                    };
                    moviesObject[movie.title] = movieData;
                });
                setMoviesName(moviesObject);
                sendDataToParent(moviesObject, dropDownIcons, currentPath, loading);
            }
            else if (endpoint === '/people') {
                const data = await response.json();
                data.results.forEach((people) => {
                    const peopleData = {
                        first: people.name,
                        second: people.gender,
                        third: people.birth_year,
                    };
                    peopleObject[people.name] = peopleData;
                });
                setMoviesName(peopleObject);
                sendDataToParent(peopleObject, dropDownIcons, currentPath, loading);
            }
            else if (endpoint === '/planets') {

                const data = await response.json();
                data.results.forEach((planet) => {
                    const planetsData = {
                        first: planet.name,
                        second: planet.terrain,
                        third: planet.population,
                    };
                    planetsObject[planet.name] = planetsData;
                });
                setMoviesName(planetsObject);
                sendDataToParent(planetsObject, dropDownIcons, currentPath, loading);
            }
            else if (endpoint === '/species') {
                const data = await response.json();
                data.results.forEach((species) => {
                    const peopleData = {
                        first: species.name,
                        second: species.classification,
                        third: species.language,
                    };
                    peopleObject[species.name] = peopleData;
                });
                setMoviesName(peopleObject);
                sendDataToParent(peopleObject, dropDownIcons, currentPath, loading);
            }
            else if (endpoint === '/starships') {
                const data = await response.json();
                data.results.forEach((starships) => {
                    const peopleData = {
                        first: starships.name,
                        second: starships.manufacturer,
                        third: starships.starship_class,
                    };
                    peopleObject[starships.name] = peopleData;
                });
                setMoviesName(peopleObject);
                sendDataToParent(peopleObject, dropDownIcons, currentPath, loading);
            }
            else if (endpoint === '/vehicles') {
                const data = await response.json();
                data.results.forEach((vehicles) => {
                    const peopleData = {
                        first: vehicles.name,
                        second: vehicles.model,
                        third: vehicles.vehicle_class,
                    };
                    peopleObject[vehicles.name] = peopleData;
                });
                setMoviesName(peopleObject);
                sendDataToParent(peopleObject, dropDownIcons, currentPath);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);

        }
    };
    const menuElements = [
        {
            icon: Folder,
            title: 'Films',
            path: '/films',
            arrow: Arrow,
        },
        {
            icon: Folder,
            title: 'People',
            path: '/people',
            arrow: Arrow,
        },
        {
            icon: Folder,
            title: 'Planets',
            path: '/planets',
            arrow: Arrow,
        }
        ,
        {
            icon: Folder,
            title: 'Species',
            path: '/species',
            arrow: Arrow,
        }
        ,
        {
            icon: Folder,
            title: 'Starships',
            path: '/starships',
            arrow: Arrow,

        }
        ,
        {
            icon: Folder,
            title: 'Vehicles',
            path: '/vehicles',
            arrow: Arrow,
        }

    ];
    useEffect(() => {
        fetchDataFromAPI(menuElements[0].path);

    }, []);
    const [details, setDetails] = useState(false);

    return (
        <div className={`sideBarMain`}>
            <div className={` h-screen  relative duration-300 `}>
                {!details ? <>
                    <div></div>
                    <ul >
                        {menuElements.map((element, index) => (
                            <>
                                <Link to={"/particularpage"}>
                                    <li key={index} className={`text-white gap-x-4 flex item-center relative cursor-pointer hover:bg-white  duration-300  rounded-md mt-2 sideNavBar-${selectedItem && selectedItem.title === element.title ? 'selected' : 'unselected'} `} onClick={() => handleItemClick(element)}>
                                        <span className={`pt-1 `}><img src={element.icon} alt={'icon'}/></span>
                                        <span className={`  text-white font-medium  duration-300 flex-1 ${!open && 'hidden'}`}>{element.title}</span>
                                        <span className={`${!open && 'hidden'} absolute  duration-300 right-3 pt-1 ${selectedItem && selectedItem.title === element.title && dropOpen ? 'rotate-90' : 'rotate-0'}`} onClick={Dropfn}><img src={element.arrow} alt={'icon'}/></span>
                                    </li>
                                </Link>
                                {dropOpen && selectedItem.title === element.title ? (
                                    <ul className=" max-h-40 overflow-y-auto uldropNav">
                                        {Object.keys(moviesName).map((title) => (
                                            <>
                                                <li key={title} className="text-white gap-x-4 flex items-center relative cursor-pointer duration-300 rounded-md mt-2 dropNavBar">
                                                    <span className="pt-1"><img src={dropDownIcons} alt="Drop Down Icon" /></span>
                                                    <span className="text-white font-medium duration-300 flex-1">{moviesName[title].first}</span>
                                                    <span className="absolute duration-300 right-3 pt-1"><img src={element.arrow} alt="Arrow Icon" /></span>
                                                </li>
                                            </>
                                        ))}
                                    </ul>) :
                                    <div></div>
                                }
                            </>
                        ))}
                    </ul>
                </> : <div></div>}

            </div>

        </div>
    );
}