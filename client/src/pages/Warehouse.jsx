import Sidebar from '../components/Sidebar'
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_WAREHOUSES } from '../utils/queries';
import AddNewWarehouses from '../components/NewWarehouseForm'
import ModifyWarehouseForm from '../components/ModifyWarehouseForm'

const Warehouse = () => {
    const [showModifyForm, setShowModifyForm] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const { loading, data } = useQuery(QUERY_WAREHOUSES)
    let warehouses = []
    if (data) { warehouses = data.warehouses }

    const openModifyWarehouse = (warehouse) => {
        setShowModifyForm(true);
        setSelectedWarehouse(warehouse);
    };

    return (
        <div className='p-6 h-screen flex flex-1'>
            <Sidebar />
            <div className='flex flex-col w-4/5'>
                <div className='w-full p-6 h-14 flex place-items-center rounded-r-xxl bg-gradient-to-r from-stone-400 from-30% to-blue-500 '>
                    <h1 className='font-extrabold text-2xl'>Warehouse</h1>
                </div>

                {/* Add a new warehouse function */}
                <AddNewWarehouses />

                <div className="card m-10 bg-grey-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Warehouse list</h2>
                        <h4>click list to view more and edit</h4>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Contact</th>
                                </tr>
                            </thead>
                            {loading ? <tbody><tr><td>Loading...</td></tr></tbody> :
                                warehouses.map((warehouse) => (
                                    <tbody>
                                        < tr key={warehouse._id} className="hover" onClick={() => openModifyWarehouse(warehouse)} >
                                            <td>{warehouse.warehouseName}</td>
                                            <td>{warehouse.location}</td>
                                            <td>{warehouse.contactNumber}</td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                        {showModifyForm && <ModifyWarehouseForm warehouse={selectedWarehouse} setShowModifyForm={setShowModifyForm} />}

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

export default Warehouse;
