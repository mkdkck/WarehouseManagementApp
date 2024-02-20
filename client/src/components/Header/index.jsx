import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <span className="-m-1.5 p-1.5">
                        <NavLink
                            to="/"
                            className="text-2xl font-bold text-gray-900 sm:text-3xl"
                        >SmBizWHM
                        </NavLink>
                    </span>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <span className="text-sm font-semibold leading-6 text-gray-900">
                        <NavLink
                            to="/Features"
                            className={({ isActive }) => isActive ? 'rounded-md bg-indigo-500 p-1' : ''}
                        >Features
                        </NavLink>
                    </span> <span className="text-sm font-semibold leading-6 text-gray-900">
                        <NavLink
                            to="/About"
                            className={({ isActive }) => isActive ? 'rounded-md bg-indigo-500 p-1' : ''}
                        >About
                        </NavLink>
                    </span> <span className="text-sm font-semibold leading-6 text-gray-900">
                        <NavLink
                            to="/Contact"
                            className={({ isActive }) => isActive ? 'rounded-md bg-indigo-500 p-1' : ''}
                        >Contact
                        </NavLink>
                    </span>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <NavLink
                        to="/Singup"
                        className='text-sm mx-4 font-semibold leading-6 text-gray-900'
                    >Sing Up
                    </NavLink>
                    <NavLink
                        to="/Login"
                        className='text-sm mx-4 font-semibold leading-6 text-grey-900 rounded-md bg-violet-400 px-3'
                    >Login
                    </NavLink>

                </div>
            </nav >
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="text-2xl font-bold text-gray-900 sm:text-3xl">SmBizWHM</span>
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href="/Features"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </a>
                                <a
                                    href="/About"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    About
                                </a>
                                <a
                                    href="/Contact"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Contact
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="/Signup"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Sign Up
                                </a>
                                <a
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header >
    )
}
