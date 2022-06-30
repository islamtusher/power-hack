import React, { useState } from 'react';
import { useQuery } from 'react-query';
import BillModal from '../BillModal/BillModal';
import Loading from '../loading/Loading';

const Home = () => {
    const [openBillingMOdal, setOpenBillingModal] = useState(false)

    const { isLoading, error, data } = useQuery('billdata', () =>
        fetch('http://localhost:5000/bills')
            .then(res => res.json())
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(data);
    console.log(error);
    const handleAddNewBill = () => {
        setOpenBillingModal(true)
    }
    return (
        <div className='max-w-[1400px] mx-auto'>
            <header className="navbar bg-gray-300">
                <div className="flex-1">
                    <a href='/' className="btn btn-ghost normal-case text-xl">Power Hack</a>
                </div>
                <div className="flex-none">
                    <ul className="">
                        <li><p>Paid Total</p></li>
                    </ul>
                </div>
            </header>

            <main className='mt-12'>
                <div className="navbar bg-gray-200">
                    <div className="flex-1 gap-6">
                        <h4 className=" normal-case text-xl">Blling</h4>
                        <div className="form-control">
                            <input type="text" placeholder="Search" className="input input-bordered" />
                        </div>
                    </div>
                    <div className="flex-none gap-2">
                        
                        <div className="">
                            <label
                                for="billing-modal"
                                onClick={handleAddNewBill}
                                className="btn modal-button">
                                Add New Bill
                            </label>
                        </div>
                    </div>
                </div>
                {/* table */}

                <div className="overflow-x-auto mt-8">
                    <table className="table table-zebra w-[95%] mx-auto">
                        {/* <!-- head --> */}
                        <thead>
                            <tr className='text-center'>
                                <th>Bill Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Paid Amount</th>
                                <th>Manage Bill</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- row 1 --> */}
                            {
                                data?.map(data =>
                                    <tr className=''>
                                        <th >{data?._id}</th>
                                        <td className='border border-l-2'>{data?.fullName}</td>
                                        <td className='border border-l-2'>{data?.email}</td>
                                        <td className='border border-l-2'>{data?.phone}</td>
                                        <td className='border border-l-2'>{data?.paidAmount}</td>
                                        <td className='border border-l-2 flex justify-evenly items-center'>
                                            <button className='btn btn-primary'>Edit</button>
                                            <span className='text-3xl'>|</span>
                                            <button className='btn bg-red-600'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                            
                            
                        </tbody>
                    </table>
                    </div>
            </main>
            {openBillingMOdal && <BillModal></BillModal>}
        </div>
    );
};

export default Home;