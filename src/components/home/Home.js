import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import BillModal from '../BillModal/BillModal';
import Loading from '../loading/Loading';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [openBillingMOdal, setOpenBillingModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [updateId, setUpdateId] = useState(false)


    const { isLoading, error, data, refetch } = useQuery('billdata', () =>
        fetch('http://localhost:5000/bills')
            .then(res => res.json())
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(data);
    // console.log(error);

    // handle Add new bill button
    const handleAddNewBill = () => {
        setOpenBillingModal(true)
        setIsUpdate(false)
        setUpdateId(null)

    }

    // handleUpdateBill
    const handleUpdateBill = (id) => {
        setOpenBillingModal(true)
        setIsUpdate(true)
        setUpdateId(id)
    }

    // handle delete button 
    const handleDeleteBill =(id) => {
        fetch(`http://localhost:5000/deleteBill/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch()
                    toast('Delete Successfull')

                }
            })
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
                <p>datas: {data?.length}</p>
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
                                        <th >
                                            {
                                                isLoading ? 'Generating Id' : `${data?._id}`
                                            }
                                        </th>
                                        <td className='border border-l-2'>{data?.fullName}</td>
                                        <td className='border border-l-2'>{data?.email}</td>
                                        <td className='border border-l-2'>{data?.phone}</td>
                                        <td className='border border-l-2'>{data?.paidAmount}</td>
                                        <td className='border border-l-2 flex justify-evenly items-center'>
                                            {/* <button onClick={()=> handleUpdateBill(data?._id)} className='btn btn-primary'>Edit</button> */}
                                            <label
                                                for="billing-modal"
                                                onClick={()=> handleUpdateBill(data?._id)}
                                                className="btn modal-button">
                                                Edit
                                            </label>
                                            <span className='text-3xl'>|</span>
                                            <button onClick={()=> handleDeleteBill(data?._id)} className='btn bg-red-600'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                            
                            
                        </tbody>
                    </table>
                    </div>
            </main>
            {openBillingMOdal && <BillModal updateId={updateId} isUpdate={isUpdate} setOpenBillingModal={setOpenBillingModal} refetch={refetch}></BillModal>}
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Home;