// // components/AddressForm.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const AdrressForm = () => {
//   const [formData, setFormData] = useState({
//     country: '',
//     city: '',
//     state: '',
//     address1: '',
//     address2: '',
//     pincode: '',
//     addressType: '',
//     phoneNumber: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token'); // Assuming you store token in localStorage
//       const response = await axios.post('http://localhost:5555/users/details', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         alert('Address and phone number added successfully');
//         // You can add navigation or other success handling here
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
//       <div className="space-y-4">
//         <div>
//           <label className="block mb-1">Phone Number</label>
//           <input
//             type="number"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Country</label>
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">State</label>
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Address Line 1</label>
//           <input
//             type="text"
//             name="address1"
//             value={formData.address1}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Address Line 2</label>
//           <input
//             type="text"
//             name="address2"
//             value={formData.address2}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Pincode</label>
//           <input
//             type="number"
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Address Type</label>
//           <select
//             name="addressType"
//             value={formData.addressType}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="">Select Type</option>
//             <option value="home">Home</option>
//             <option value="work">Work</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Save Address
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AdrressForm;
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const AdrressForm = () => {
    const [country,setCountry] = useState();
    const [city,setCity] = useState();
    const [state,setState] = useState();
    const [address1,setAddress1] = useState();
    const [address2,setAddress2] = useState();
    const [pincode,setPincode] = useState();
    const [addressType,setAddressType] = useState();
    const [phoneNumber,setPhoneNumber] = useState();

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            console.log(token)
            const response = await axios.patch(`${API_URL}/users/details`,{
                country,
                city,
                state,
                address1,
                address2,
                pincode,
                addressType,
                phoneNumber
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.data.success){
                console.log("data")
            }
            else{
                console.log("error")
            }
        }
        catch(e){
            console.log(e.message)
        }
    }
  return (
    <>  
        <form onSubmit={handleSubmit}>
        <div className="divforaddressForm">
            <div className="eachfieldfivforadrress">
                <label>Country</label>
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                />
            </div>
            <div className="eachfieldfivforadrress">
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                />
            </div>
            <div className="eachfieldfivforadrress">
                <label>State</label>
                <input
                    type="text"
                    name="state"
                    placeholder="state"
                    value={state}
                    onChange={(e)=>setState(e.target.value)}
                />
            </div>
            <div className="eachfieldfivforadrress">
                <label>Address1</label>
                <input
                    type="text"
                    name="address1"
                    placeholder="Address"
                    value={address1}
                    onChange={(e)=>setAddress1(e.target.value)}
                />
            </div>
            <div className="eachfieldfivforadrress">
                <label>Address2</label>
                <input
                    type="text"
                    name="address2"
                    placeholder="address"
                    value={address2}
                    onChange={(e)=>setAddress2(e.target.value)}
                />
            </div>
            <div className="eachfieldfivforadrress">
                <label>pincode</label>
                <input
                    type="number"
                    name="pincode"
                    placeholder="pincode"
                    value={pincode}
                    onChange={(e)=>setPincode(e.target.value)}
                    required
                />
            </div>
            <div className="eachfieldfivforadrress">
                <label>PhoneNumber</label>
                <input
                    type="number"
                    name="phoneNumber"
                    placeholder="PhoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div className="eachfieldfivforadrress">
                <label>AddressType:</label>
                <select
                    type="text"
                    name="addressType"
                    placeholder="addressType"
                    value={addressType}
                    onChange={(e)=>setAddressType(e.target.value)}
                    required
                >
                     <option value="">Select Type</option>
                     <option value="home">Home</option>
                     <option value="work">Work</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button>Save Address</button>
        </div>
        </form>
    </>
  )
}

export default AdrressForm