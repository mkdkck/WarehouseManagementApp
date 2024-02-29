import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth'
import Sidebar from '../components/Sidebar'

const User = () => {
    const user = Auth.getProfile().data

    return (
        <div className='p-6 h-screen flex flex-1 lg:justify-center'>
            <Sidebar />
            <div className='flex flex-col w-4/5 flex-1 '>
                <div className='w-full p-6 h-14 flex place-items-center bg-gradient-to-r from-slate-300 from-30% to-sky-950 max-lg:rounded-xxl lg:rounded-r-xxl  '>
                    <h1 className='font-extrabold text-2xl'>User</h1>
                </div>
                <div>
                    <h1 className='text-3xl font-bold mt-5 text-center'>Hi {user.username}, this page is under construction </h1>
                </div>
            </div>
        </div>
    );
};

export default User;
