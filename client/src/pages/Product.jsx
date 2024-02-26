import Sidebar from '../components/Sidebar'
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_PRODUCT } from '../utils/queries';
import NewCategory from '../components/NewCategory'
import ModifyCategory from '../components/ModifyCategory'

const Product = () => {
    const [showModifyForm, setShowModifyForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { loading, data } = useQuery(QUERY_PRODUCT)
    let products = []
    if (data) { products = data.categories }


    const openModifyProduct = (product) => {
        setShowModifyForm(true);
        setSelectedProduct(product);
    };

    return (
        <div className='p-6 h-screen flex flex-1'>
            <Sidebar />
            <div className='flex flex-col w-4/5'>
                <div className='w-full p-6 h-14 flex place-items-center rounded-r-xxl bg-gradient-to-r from-stone-400 from-30% to-green-500 '>
                    <h1 className='font-extrabold text-2xl'>Product</h1>
                </div>

                {/* Add a new warehouse function */}
                <NewCategory />

                <div className="card m-10 bg-grey-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Product list</h2>
                        <h4>click list to view more and edit</h4>


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Image</th>
                                    <th>Owner</th>
                                    <th>Total quantity</th>
                                </tr>
                            </thead>
                            {loading ? <tbody><tr><td>Loading...</td></tr></tbody> :
                                products.map((product) => (
                                    <tbody>
                                        < tr key={product._id} className="hover" onClick={() => openModifyProduct(product)} >
                                            <td>{product.name}</td>
                                            <td>{product.image}</td>
                                            <td>{product.owner}</td>
                                            <td>{product.totalQty}</td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                        {showModifyForm && <ModifyCategory product={selectedProduct} setShowModifyForm={setShowModifyForm} />}

                        <div className="card-actions justify-end">
                            <div className="join">
                                <button className="join-item btn">«</button>
                                <button className="join-item btn">Page 22</button>
                                <button className="join-item btn">»</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Product;
