import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'

function Sidebar() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }
    return (
        <>
            <div className="flex-col flex justify-between h-full p-3 w-60 bg-stone-400 text-gray-800 ">
                <div>
                    <div className="flex items-center p-3 space-x-4 mt-3 mb-5">
                        <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full bg-gray-500" />
                        <div>
                            <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
                            <span className="flex items-center space-x-1">
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">View profile</a>
                            </span>
                        </div>
                    </div>

                    <ul className="menu bg-base-200 w-56 rounded-box">
                        <li><a>Home</a></li>
                        <li>
                            <details open>
                                <summary>Warehouse</summary>
                                <ul className='ms-5'>
                                    <li>
                                        <Link
                                            to='/Warehouse'
                                        >
                                            Add new
                                        </Link></li>
                                    <li>
                                        <Link
                                            to='/Warehouse'
                                        >
                                            View all
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details open>
                                <summary>Product</summary>
                                <ul className='ms-5'>
                                    <li>
                                        <Link
                                            to='/Product'>
                                            Add Products
                                        </Link></li>
                                    <li>
                                        <Link
                                            to='/PkConfig'>
                                            New package config
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details open>
                                <summary>Reports</summary>
                                <ul className='ms-5'>
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
                <div>
                    <ul>
                        <li>
                            Organization Settings
                        </li>
                        <li>
                            <button onClick={logout}>
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div >
        </>
    );
}

export default Sidebar;

