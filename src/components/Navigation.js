import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.getAddress(accounts[0])
        setAccount(account)

        console.log(account)
    }

    return (
        <nav className="p-5  grid grid-cols-[1fr_1fr_1fr] bg-black  gap-2 justify-center items-center">
            <div className='bg-black '>
                <h1 className="text-white text-[2.15em] max-w-[1200px] ">Tokokucing</h1>
            </div>
            <input
                type="text"
                className="outline-none p-1 rounded-md"
            />
            <div className="flex justify-center items-center" >
                {account ? (
                    <button
                        type="button"
                        className='text-white bg-orange-500 p-1 w-[150px] rounded-md m-0 hover:bg-orange-800 ease-in-out '
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
            </div>


            <div></div>
            <ul className="text-white flex flex-row justify-self-center self-center items-center gap-4">
                <li><a href="#Clothing & Jewelry">Clothing & Jewel</a></li>
                <li><a href="#Electronic & Gadgets">Electronics & gadgets</a></li>
                <li><a href="#Toys & Gaming">Toys & Gaming</a></li>
            </ul>
        </nav>
    );
}
// {account.slice(0, 6) + '...' + account.slice(38, 32)}

export default Navigation;