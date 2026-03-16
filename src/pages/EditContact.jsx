import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const updateContact = async (e) => {
    e.preventDefault();

    await fetch(
      `https://playground.4geeks.com/contact/agendas/pantaleon_contacts/contacts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      }
    );

    navigate("/");
  };

  const loadContact = async () => {

    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/pantaleon_contacts/contacts`
    );

    const data = await response.json();

    const foundContact = data.contacts.find(
      (c) => c.id === parseInt(id)
    );

    setContact(foundContact);
  };

  useEffect(() => {
    loadContact();
  }, []);

  return (
    <div className="container">

      <h1 className="text-center">Edit Contact</h1>

      <form onSubmit={updateContact}>

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
          Update Contact
        </button>

      </form>

    </div>
  );
};

export default EditContact;