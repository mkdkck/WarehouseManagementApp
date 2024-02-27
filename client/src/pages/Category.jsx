import Sidebar from '../components/Sidebar'
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_CATEGORIES } from '../utils/queries';
import NewCategory from '../components/NewCategory'
import ModifyCategory from '../components/ModifyCategory'

const Category = () => {
    const [showModifyForm, setShowModifyForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { loading, data } = useQuery(QUERY_CATEGORIES)
    let categories = []
    if (data) { categories = data.categories }


    const openModifyCategory = (category) => {
        setShowModifyForm(true);
        setSelectedCategory(category);
    };

    return (
        <div className='p-6 h-screen flex flex-1'>
            <Sidebar />
            <div className='flex flex-col w-4/5 flex-1 '>
                <div className='w-full p-6 h-14 flex place-items-center bg-gradient-to-r from-slate-300 from-30% to-sky-950 max-lg:rounded-xxl lg:rounded-r-xxl  '>
                    <h1 className='font-extrabold text-2xl'>Category</h1>
                </div>

                {/* Add a new Category function */}
                <NewCategory />

                <div className="card m-10 bg-grey-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Category list</h2>
                        <h4>click list to view more and edit</h4>


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Category name</th>
                                    <th>Products under this category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <tr><td>Loading...</td></tr> :
                                    categories.map((category) => (
                                        < tr key={category._id} className="hover" onClick={() => openModifyCategory(category)} >
                                            <td>{category.name}</td>
                                            <td>{category.productCount}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {showModifyForm && <ModifyCategory category={selectedCategory} setShowModifyForm={setShowModifyForm} />}

                        <div className="card-actions justify-end">
                            <div className="join">
                                <button className="join-item btn">«</button>
                                <button className="join-item btn">Page 1</button>
                                <button className="join-item btn">»</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Category;
