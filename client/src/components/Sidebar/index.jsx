import { Link, useLocation } from 'react-router-dom';


function Sidebar() {
    return (
        <>
            {/* <div className="h-full p-3 space-y-2 w-60 bg-gray-50 text-gray-800"> */}

            <div className="flex items-center p-2 space-x-4">
                <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full bg-gray-500" />
                <div>
                    <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
                    <span className="flex items-center space-x-1">
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">View profile</a>
                    </span>
                </div>
            </div>

            <ul className="menu bg-base-200 w-56 rounded-box">
                <li><a>Item 1</a></li>
                <li>
                    <details open>
                        <summary>Parent</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
                <li><a>Item 3</a></li>
            </ul>
        </>
    );
}

export default Sidebar;

