import Sidebar from '../components/Sidebar'
import { useQuery, useMutation } from '@apollo/client';
import { ADD_WAREHOUSE } from '../utils/mutations';
import { VIEW_ALLWAREHOUSES } from '../utils/queries';


const Warehouse = (props) => {
    const [formState, setFormState] = useState({ name: '', location: '', contactNumber: '' });
    const [addWarehouse, { error }] = useMutation(ADD_WAREHOUSE)
    const { data } = useQuery(VIEW_ALLWAREHOUSES)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addWarehouse({ ...formState });
        // { error && <div>Something went wrong... <p>{error.message}</p></div> }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className='p-6 h-screen flex flex-1'>
            <Sidebar />
            <div className='flex flex-col w-4/5'>
                <div className='w-full p-6 h-14 flex place-items-center rounded-r-xxl bg-gradient-to-r from-stone-400 from-30% to-blue-500 '>
                    <h1 className='font-extrabold text-2xl'>Warehouse</h1>
                </div>
                <div>
                    <h2>Add a new warehouse</h2>
                </div>

                <div className="card m-10 bg-grey-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Warehouse list</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover">
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                </tr>
                                <tr className="hover">
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                </tr>
                                <tr className="hover">
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="card-actions justify-end">
                            <div className="join">
                                <button className="join-item btn">«</button>
                                <button className="join-item btn">Page 22</button>
                                <button className="join-item btn">»</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-au">
                    <h3></h3>

                </div>

            </div>
        </div>
    );
};

export default Warehouse;
