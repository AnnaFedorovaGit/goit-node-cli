import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';


const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find((contact) => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContact = await getContactById(contactId);
  const filterList = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filterList, null, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}


export { listContacts, getContactById, removeContact, addContact };