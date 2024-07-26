import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
    return (
        <nav className="flex flex-row bg-black">
            <div className='bg-black'>
                <h1 className="text-white">Tokokucing</h1>
            </div>
            <input
                type="text"
                className="outline-none"
            />
            <button
                type="button"
                className="text-white"
            >
                {account.slice(0, 6) + '...' + account.slice(38, 32)}
            </button>
            <ul className="text-white">
                <li><a href="#Clothing & Jewelry">Clothing & Jewel</a></li>
                <li><a href="#Electronic & Gadgets">Electronics & gadgets</a></li>
                <li><a href="#Toys & Gaming">Toys & Gaming</a></li>
            </ul>

        </nav>
    );
}

export default Navigation;