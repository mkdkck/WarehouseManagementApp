import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'

function Sidebar() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }
    const { data } = Auth.getProfile()

    return (
        <>
            <div className="flex-col flex justify-between h-full p-3 w-1/5 bg-stone-400 text-gray-800 rounded-l-xxl">
                <div>
                    <div className="flex items-center p-3 space-x-4 mt-3 mb-5">
                        <img src="https://placehold.co/600x400" alt="" className="w-12 h-12 rounded-full bg-gray-500" />
                        <div>
                            <h2 className="text-xl font-bold">{data.username}</h2>
                            <span className="flex items-center space-x-1">
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">View profile</a>
                            </span>
                        </div>
                    </div>


                    <ul className="menu bg-base-200 w-45 rounded-box">
                        <li> <Link
                            to='/Home'
                            className="rounded-box font-bold">
                            Dashboard
                        </Link></li>
                        <li>
                            <Link
                                to='/Warehouse'
                                className="rounded-box font-bold"
                            >
                                Warehouse
                            </Link>
                        </li>
                        <li>
                            <details className="">
                                <summary tabIndex={0} role="button" className="rounded-box font-bold">Product</summary>
                                <ul tabIndex={0} className="p-2">
                                    <li>
                                        <Link
                                            to='/Category'>
                                            Manage Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/Product'>
                                            Manage Product
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/PkConfig'>
                                            Manage package config
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details className="">
                                <summary tabIndex={0} role="button" className="rounded-box font-bold">Organization</summary>
                                <ul tabIndex={0} className="p-2">
                                    <li>
                                        <Link
                                            to='/Organization'>
                                            Manage Organization
                                        </Link>
                                    </li>
                                    <li><a>Manage Users</a></li>
                                    <li><a>Manage Roles</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details className="">
                                <summary tabIndex={0} role="button" className="rounded-box font-bold">Reports</summary>
                                <ul tabIndex={0} className="p-2">
                                    <li>
                                        <Link
                                            to='/Product'>
                                            Stock Lists
                                        </Link>
                                    </li>
                                    <li><a>View Package Configuration</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className='bg-rose-500 rounded-box font-bold flex justify-center items-center h-10'>
                    <button onClick={logout}>
                        Log Out
                    </button>
                </div>
            </div >
        </>
    );
}

export default Sidebar;

