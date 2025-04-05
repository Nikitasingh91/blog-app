import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Creator = () => {
    const [admin, setAdmin] = useState([])
    useEffect(() => {
        const fetchAdmins = async () => {
            const { data } = await axios.get("http://localhost:2020/api/user/admins", {
                withCredentials: true,
            })
            console.log(data);
            setAdmin(data)

        }
        fetchAdmins()
    }, [])
    return (
        <div className='container w-[97%] mx-auto p-4 '>
            <h1 className='text-2xl font-semibold mb-6'>Popular Creators</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full'>
                {admin && admin.length > 0 ? (
                    admin.slice(0, 4).map((element) => {
                        return (
                            <div
                                key={element._id}

                            >
                                <div >
                                    <img
                                        src={element.photo.url}
                                        alt="blog"
                                        className="md:w-56 md:h-56 object-cover rounded-full  items-center border border-black"
                                    />
                                    <div className='text-center items-center md:ml-[-130px]'>
                                        <p className=''>{element.name}</p>
                                        <p className='text-gray-600 text-xs '>{element.role}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className=" flex h-screen items-center justify-center">
                        Loading....
                    </div>
                )}

            </div>
        </div>
    )
}

export default Creator