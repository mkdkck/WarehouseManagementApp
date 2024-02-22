import img from '../assets/GWShed.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <>
            <Header />
            <section className="bg-light-800 text-black-100">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 sm:max-w-full lg:h-96 xl:h-112 xl:max-w-2xl">
                        <img src={img} alt="warehouse imgage" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                    </div>
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leadi sm:text-6xl">Small Business
                            <p className="text-violet-400">WHM</p>App
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">Help to manage your stocks
                            <br className="hidden md:inline lg:hidden" /> Anytime Anywhere
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <Link
                                to='/Signup' className="px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900"
                            >Get Started
                            </Link>
                            <Link
                                to='/Features' className="px-8 py-3 text-lg font-semibold border rounded border-gray-100"
                            >Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    );
};

export default Welcome;