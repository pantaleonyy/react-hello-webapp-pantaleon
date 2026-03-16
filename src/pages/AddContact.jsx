import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = () => {

  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const createContact = async (e) => {
    e.preventDefault();

    await fetch(
      "https://playground.4geeks.com/contact/agendas/pantaleon_contacts/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      }
    );

    navigate("/");
  };

  return (
    <div className="container">

      <h1 className="text-center">Add Contact</h1>

      <form onSubmit={createContact}>

        <input
          className="form-control mb-3"
          name="name"
          placeholder="Full Name"
          value={contact.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="address"
          placeholder="Address"
          value={contact.address}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">
          Save Contact
        </button>

      </form>

    </div>
  );
};

export default AddContact;