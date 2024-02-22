import Auth from '../utils/auth'
import Sidebar from '../components/Sidebar'


const Warehouse = (props) => {

    return (
        <div className='p-6 h-screen flex flex-row'>
            <Sidebar />
            <div className='flex flex-col w-full h-20 bg-grey-600'>
                Warehouse
            </div>

        </div>
    );
};

export default Warehouse;
