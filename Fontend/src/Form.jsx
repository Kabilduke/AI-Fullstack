import React, { useState } from 'react';
import './Form.css';


const Form = ({SelectedCategory, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
          category: SelectedCategory,
          name,
          email,
          zipcode,
          address,
          phone,
          service
        };
        onSubmit(formData); // Pass form data to the parent component (App.jsx)
      };

    return (
        <div className='container'>
            <h1>Elite Home Services</h1>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor='category'>Category</label>
                <input 
                    type='text'
                    id='category'
                    value={SelectedCategory}
                    readOnly
                />
                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    id='name'
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    id='email'
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor='zipcode'>Zipcode</label>
                <input
                    type="number"
                    id='zipcode'
                    placeholder="Zip Code"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                />
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id='address'
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <label htmlFor='phone'>Phone</label>
                <input
                    type="tel"
                    id='phone'
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <label htmlFor='service'>Service</label>
                <select name='service' id='service' onChange={(e) => setService(e.target.value)}>
                    <option value="None">None</option>
                    <option value="Install">Install</option>
                    <option value="Repair">Repair</option>
                </select>

                <button type="submit">Submit</button>
            </form>
        </div>
      );
};

export default Form;