import Sidebar from '../components/Sidebar'
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_PKCONFIGS } from '../utils/queries';
import NewPkConfig from '../components/NewPkConfig'
import ModifyPkConfig from '../components/ModifyPkConfig'

const PkConfig = () => {
    const [showModifyForm, setShowModifyForm] = useState(false);
    const [selectedPkConfig, setSelectedPkConfig] = useState(null);

    const { loading, data } = useQuery(QUERY_PKCONFIGS)
    let pkConfigs = []
    if (data) { pkConfigs = data.pkConfigs }


    const openModifyPkconfig = (pkConfig) => {
        setShowModifyForm(true);
        setSelectedPkConfig(pkConfig);
    };

    return (
        <div className='p-6 h-screen flex flex-1'>
            <Sidebar />
            <div className='flex flex-col w-4/5 flex-1 '>
                <div className='w-full p-6 h-14 flex place-items-center bg-gradient-to-r from-slate-300 from-30% to-sky-950 max-lg:rounded-xxl lg:rounded-r-xxl  '>
                    <h1 className='font-extrabold text-2xl'>Package Configuration</h1>
                </div>

                {/* Add a new warehouse function */}
                <NewPkConfig />

                <div className="card m-10 bg-grey-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Configuration list</h2>
                        <h4>click list to view more and edit</h4>


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Configuration</th>
                                    <th>Total Packages</th>
                                    <th>Total Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <tr><td>Loading...</td></tr> :
                                    pkConfigs.map((pkConfig) => (
                                        < tr key={pkConfig._id} className="hover" onClick={() => openModifyPkconfig(pkConfig)} >
                                            <td>{pkConfig.configName}</td>
                                            <td>{`${pkConfig.itemPerPk} * ${pkConfig.pkPerlayer} * ${pkConfig.layerPerPallet}`}</td>
                                            <td>{pkConfig.palletTotalPks}</td>
                                            <td>{pkConfig.palletTotalItems}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {showModifyForm && <ModifyPkConfig pkConfig={selectedPkConfig} setShowModifyForm={setShowModifyForm} />}

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

export default PkConfig;
