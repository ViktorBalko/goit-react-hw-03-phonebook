import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const dataContacts = this.state.contacts;
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(dataContacts));
    }
  }

  componentDidMount() {
    const stringifiContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  handleAddContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const { contacts } = this.state;

    const dublicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const dublicateNumber = contacts.some(contact => contact.number === number);

    dublicateName || dublicateNumber
      ? alert(
          dublicateName
            ? `${name} is already in contacts`
            : `${number} is already in contacts`
        )
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  // handleAddContact = ({ name, number }) => {
  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  //   const { contacts } = this.state;
  //   if (
  //     contacts.find(
  //       contact => contact.name.toLowerCase() === name.toLowerCase()
  //     )
  //   ) {
  //     alert(`${name} is already in contacts`);
  //     return;
  //   } else if (contacts.find(contact => contact.number === number)) {
  //     alert(`${number} is already in contacts`);
  //   } else {
  //     this.setState(({ contacts }) => ({
  //       contacts: [contact, ...contacts],
  //     }));
  //   }
  // };

  handleDeleteContact = contactId =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <h1 className="HomeworkTitle">React HW2 ~ Phonebook</h1>
        <div className="AppBox">
          <ContactForm onSubmit={this.handleAddContact} />
          <ContactFilter filter={filter} onChange={this.handleFilterChange} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
