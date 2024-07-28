import { ethers } from "ethers";

import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {

    return (
        <div className="mx-20">
            <h2 className="font-bold border-[1px] border-b-black p-5" >{title}</h2>

            <div className="flex flex-row justify-between m-5 items-center" >
                {items.map((item, index) => (
                    <>
                        <div className="" key={index} onClick={() => togglePop(item)}>
                            <div>
                                <img src={item.image} alt="item" />
                            </div>
                            <div>
                                <h4>{item.name}</h4>
                                <Rating value={item.rating}/>
                                <p>{ethers.formatUnits(item.cost.toString(),'ether')} ETH</p>
                            </div>
                        </div>
                    </>

                ))}


            </div>

        </div>
    );

}

export default Section;