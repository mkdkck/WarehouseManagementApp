import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'
import { Dialog } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react';

function Sidebar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }
    const { data } = Auth.getProfile()

    return (
        <>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed top-0 left-0 inset-0 z-10" />
                <Dialog.Panel className="fixed top-0 left-0 inset-y-0 z-10 w-full overflow-y-auto bg-white px-3 py-6 max-w-48 sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex-col flex justify-between h-full p-3 w-full bg-slate-300 text-gray-800 rounded-xxl">
                        <div>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
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
                                                    Mange package config
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
                    </div>
                </Dialog.Panel>
            </Dialog>
            <div className="flex lg:hidden">
                <button
                    type="button"
                    className="border-e-2 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button >
            </div >
            <div className="hidden lg:flex flex-col flex justify-between h-full p-3 w-1/5 bg-slate-300 text-gray-800 rounded-l-xxl ">

                <div>
                    <div className="flex items-center p-3 space-x-4 mt-3 mb-5">
                        <img src="https://placehold.co/600x400" alt="profilePhoto" className="w-12 h-12 rounded-full bg-gray-500" />
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
                                            Mange package config
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
                                        Under develepment
                                    </li>
                                    {/* <li>
                                        <Link
                                            to='/Product'
                                            className='disabled'>
                                            Stock Lists
                                        </Link>
                                    </li>
                                    <li><a>View Package Configuration</a></li> */}
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

