import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { FaTrash, FaEdit } from "react-icons/fa";

const Home = () => {

  const { store, dispatch } = useGlobalReducer();

  const loadContacts = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/pantaleon_contacts/contacts"
      );

      const data = await response.json();

      dispatch({
        type: "SET_CONTACTS",
        payload: data.contacts
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const deleteContact = async (id) => {

    await fetch(
      `https://playground.4geeks.com/contact/agendas/pantaleon_contacts/contacts/${id}`,
      {
        method: "DELETE"
      }
    );

    dispatch({
      type: "DELETE_CONTACT",
      payload: id
    });
  };

  return (
    <div className="container">

      <div className="d-flex justify-content-end my-3">
        <Link to="/add-contact">
          <button className="btn btn-success">
            Add Contact
          </button>
        </Link>
      </div>

      {store.contacts.map((contact) => (
        <div key={contact.id} className="card mb-3 p-3">

          <h5>{contact.name}</h5>

          <p>{contact.phone}</p>
          <p>{contact.email}</p>
          <p>{contact.address}</p>

          <div className="d-flex gap-2">

            <Link to={`/${contact.id}/edit`}>
              <button className="btn btn-warning">
                <FaEdit />
              </button>
            </Link>

            <button
              className="btn btn-danger"
              onClick={() => deleteContact(contact.id)}
            >
              <FaTrash />
            </button>

          </div>

        </div>
      ))}

    </div>
  );
};

export default Home;