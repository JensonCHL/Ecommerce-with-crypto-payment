import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Rating from './Rating'

const Product = ({ item, provider, account, sc, togglePop }) => {
    const [order, setOrder] = useState(null);
    const [hasBought, setHasBought] = useState(false);

    const fetchDetails = async()=>{
        const event = await sc.queryFilter("Buy")
        const orders = event.filter(
            (event) => event.args.buyer == account && event.args.itemId.toString() === item.id.toString()
        )
        if (orders.length ===0) {
            return
        }else{
            const order = await sc.orders(account,orders[0].args.orderId)
            setOrder(order)
        }

    }

    const buyHandler = async () => {
        console.log("Buy")
        const signer = await provider.getSigner();
        let transaction = sc.connect(signer).buy(item.id, {value:item.cost})
        await transaction.wait()
        setHasBought(true)
    }

    useEffect(()=>{
        fetchDetails()
    },[hasBought])

    return (
        <div className="fixed inset-0 h-full w-full bg-black-70 flex items-center justify-center rounded-lg shadow-lg overflow-hidden">
            <button
                onClick={togglePop}
                className="absolute top-4 right-4 text-xl font-bold text-white bg-black rounded-full p-2 shadow-md"
            >
                X
            </button>
            <div className='bg-white max-w-md w-full rounded-lg shadow-lg overflow-hidden '>
                <div className="relative">


                    <img src={item.image} alt="Product Image" width={400} height={300} className="w-full h-64 object-cover" />
                    <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-md text-sm font-medium">
                        {ethers.formatUnits(item.cost.toString(), 'ether')} ETH
                    </div>
                </div>
                <div></div>
                <div className="p-6 bg-background">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-black">{item.name}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Rating value={item.rating} ></Rating>
                            <span className="text-muted-foreground text-sm">{item.rating}</span>
                        </div>
                    </div>
                    <p className="text-muted-foreground mb-6">
                        Crafted with a blend of 60% combed ringspun cotton and 40% polyester jersey, this tee offers a soft and
                        breathable feel.
                    </p>
                    <p className='flex gap-1' >
                        FREE delivery on  <br />
                        <strong>
                            {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </strong>
                    </p>
                    {item.stock > 0 ? (
                        <p>In Stock.</p>
                    ) : (
                        <p>Out of Stock.</p>
                    )}
                    {item.stock > 0 ?(
                        <button className="w-full p-3 rounded-md bg-black text-white" onClick={buyHandler} >Buy Now</button>
                    ):(
                        <button className="w-full p-3 rounded-md bg-black text-white" >Out of Stock</button>

                    )}
                    <p><small>Ships from</small> Dappazon</p>
                    <p><small>Sold by</small> Dappazon</p>

                    {order && (
                        <div className='product__bought'>
                            Item bought on <br />
                            <strong>
                                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                                    undefined,
                                    {
                                        weekday: 'long',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric'
                                    })}
                            </strong>
                        </div>
                    )}
                </div>
            </div>
        </div>



    );
}

export default Product;