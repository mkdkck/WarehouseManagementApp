import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {

    return (
        <>
            <Header />
            <div className='container lg:mt-20'>
                <h1 className='text-center mb-5'>About</h1>
                <div className='flex'>
                    <p className=" mx-auto"> To be continued...
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}