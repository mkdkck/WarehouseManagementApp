import Sidebar from '../components/Sidebar'
import Auth from '../utils/auth'
import Card from '../components/DashboardCard'

import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_WAREHOUSES } from '../utils/queries';

const Home = () => {
    const [formState, setFormState] = useState({ warehouse: '', category: '', product: '', user: '' });

    const user = Auth.getProfile().data

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: name,
        });
    };
    const checked = { ...formState }
    //need to be dynamic fetched
    const RenderPage = ["warehouse", "category", "product", "user"]


    return (
        <div className='p-6 h-screen flex flex-1 lg:justify-center'>
            <Sidebar />
            <div className='flex flex-col w-4/5 flex-1 '>
                <div className='w-full p-6 h-14 flex place-items-center bg-gradient-to-r from-slate-300 from-30% to-sky-950 max-lg:rounded-xxl lg:rounded-r-xxl  '>
                    <h1 className='font-extrabold text-2xl'>Dashboard</h1>
                </div>
                <div>
                    <h1 className='text-3xl font-bold mt-5 text-center'>Hi {user.username}, welcome to the app! </h1>
                    <h3 className='text-xl font-bold mt-5 text-center'>Customize you dashboard view here</h3>
                    <div className='flex justify-center'>
                        <div className='m-5 grid justify-items-center'>
                            <input type="checkbox" id='warehouse' name='warehouse' defaultChecked className="checkbox" onChange={handleChange} />
                            <p>Warehouse</p>
                        </div>
                        <div className='m-5 grid justify-items-center'>
                            <input type="checkbox" id='category' name='category' defaultChecked className="checkbox" onChange={handleChange} />
                            <p>Category</p>
                        </div>
                        <div className='m-5 grid justify-items-center'>
                            <input type="checkbox" id='product' name='product' defaultChecked className="checkbox" onChange={handleChange} />
                            <p>Product</p>
                        </div>
                        <div className='m-5 grid justify-items-center'>
                            <input type="checkbox" id='user' name='user' defaultChecked className="checkbox" onChange={handleChange} />
                            <p>User</p>
                        </div>
                    </div>

                </div>
                <div>
                    {RenderPage.map((page) => (
                        <Card page={page} />
                    ))}
                </div>
            </div>
        </div >
    );
};

export default Home;
