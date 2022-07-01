import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import BillModal from '../BillModal/BillModal';
import Loading from '../loading/Loading';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar/Navbar';

const Home = () => {
    const [openBillingMOdal, setOpenBillingModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [updateId, setUpdateId] = useState(false)
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const { isLoading, error, data, refetch } = useQuery(['billdata', currentPage, pages], () =>
        fetch(`https://friendly-moose-61429.herokuapp.com/api/billing-list?currentPage=${currentPage}`)
        .then(res => res.json())
    )
    // console.log(data);
    fetch('http://localhost:5000/billsCount')
        .then(res => res.json())
        .then(data => {
            const page = Math.ceil(data.result/10)
            setPages(page)
            // console.log(page, data);
        })
    
    if (data?.length === 0) {
        // setCurrentPage(currentPage - 1)
    }
    
    if (!data?.length === 0 && isLoading) {
        return <Loading></Loading>
    }
    // console.log(error);

    // handle Add new bill button
    const handleAddNewBill = () => {
        setOpenBillingModal(true)
        setIsUpdate(false)
        setUpdateId(null)

    }

    // handle Update Bill
    const handleUpdateBill = (id) => {
        setOpenBillingModal(true)
        setIsUpdate(true)
        setUpdateId(id)
    }

    // handle delete button 
    const handleDeleteBill =(id) => {
        fetch(`http://localhost:5000/api/delete-billing/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success('Delete Successfull')

                }
            })
    }
    return (
        <div className='max-w-[1400px] mx-auto'>
            <Navbar data= {data}></Navbar>
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

                <p>datas: {data?.length}</p>
                {/* table */}
                {
                    isLoading ?
                        <Loading></Loading> : 
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
                                                        isLoading ? <Loading></Loading> : `${data?._id}`
                                                    }
                                                </th>
                                                <td className='border border-l-2'>{data?.name}</td>
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
                }
                
            </main>
            {
               
                [...Array(pages).keys()].map(page =>
                    <button
                        
                        onClick={() => setCurrentPage(page)}
                        className={`mr-4 ${page === currentPage ? 'btn btn-primary' : 'btn bg-dark'}`}>
                        {page}
                    </button> 
                    )
            }
            
            {openBillingMOdal && <BillModal updateId={updateId} isUpdate={isUpdate} setOpenBillingModal={setOpenBillingModal} refetch={refetch}></BillModal>}
            <ToastContainer position="bottom-right"></ToastContainer>
        </div>
    );
};

export default Home;