import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';



import { FiShoppingCart } from "react-icons/fi";
import Chart from "../pages/Chart";

const Navigation = ({ account, setAccount }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.getAddress(accounts[0])
        setAccount(account)

        console.log(account)
    }
    useEffect(() => {
        connectHandler()
    }, [])
    return (
        <nav className="bg-black">
            <div className=" m-5 p-5  grid grid-cols-[1fr_1.3fr_1fr] bg-black  gap-2 justify-center items-center" >
                <div className='bg-black '>
                    <h1 className="text-white text-[2.15em] max-w-[1200px] ">Tokokucing</h1>
                </div>
                <div className="relative flex-1" >
                    <input
                        type="text"
                        className="outline-none p-1 rounded-md w-full h-10"
                        placeholder="Search products..."
                    />
                </div>
                <div className="flex justify-center items-center" >
                    <div className="flex flex-row items-center justify-between ml-20 w-full" >
                        {account ? (
                            <button
                                type="button"
                                className='text-white bg-orange-500 p-1 w-[250px] rounded-md m-0 hover:bg-orange-800 ease-in-out h-10 '
                            >
                                {account.slice(0, 6) + '...' + account.slice(38, 42)}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className='text-white bg-orange-500 p-1 rounded-md'
                                onClick={connectHandler}
                            >
                                Connect
                            </button>
                        )}
                        <div className="flex flex-col items-center justify-center gap-2  p-2 py-2 pr-3 rounded-md bg-background text-white hover:bg-white hover:text-black transition-colors" >

                            <FiShoppingCart fontSize='30px' className="" />


                        </div>
                    </div>

                </div>

                <div></div>
                <ul className="text-white flex flex-row justify-center self-center items-center gap-4">
                    <li><a href="#Clothing & Jewelry" >Clothing & Jewel</a></li>
                    <li><a href="#Electronic & Gadgets">Electronics & gadgets</a></li>
                    <li><a href="#Toys & Gaming">Toys & Gaming</a></li>

                </ul>

            </div>

        </nav>
    );
}
// {account.slice(0, 6) + '...' + account.slice(38, 32)}

export default Navigation;