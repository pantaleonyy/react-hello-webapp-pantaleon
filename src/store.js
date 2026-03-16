export const initialStore = {
  contacts: []
};

export const storeReducer = (store, action) => {
  switch (action.type) {

    case "SET_CONTACTS":
      return {
        ...store,
        contacts: action.payload
      };

    case "DELETE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    default:
      return store;
  }
};