const fs = require('fs').promises
const path = require('path')

const contentType = path.join(__dirname, 'bd', 'contacts.json')
console.log(contentType)

//Добавь функции для работы с коллекцией контактов. В функциях используй модуль fs и его методы readFile() и writeFile()

// TODO: задокументировать каждую функцию
//список контактів

function listContacts() {
  fs.readFile(contentType)
    .then((data) => console.table(data.toString()))
    .catch((error) => console.log(error.messege, 'Error!'))
}
//console.table("listContacts", listContacts())

function getContactById(contactId) {
  fs.readFile(contentType)
    .then((data) => {
      const contactJson = JSON.parse(data)

      const contact = contactJson.find((contact) => contact.id === contactId)
      console.log(contact)
    })
    .catch((error) => console.log(error.messege, 'Error!'))
}

//console.log( getContactById(1))

function removeContact(contactId) {
  fs.readFile(contentType)
    .then((data) => {
      const contactJson = JSON.parse(data)
      const removeItem = contactJson.filter(
        (removeItem) => removeItem.id !== contactId,
      )
      console.log(removeItem)

      fs.writeFile(contentType, JSON.stringify(removeItem, null, 2))
    })

    .catch((error) => console.log(error.messege, 'Error!'))
}
//console.log( removeContact(3))

function addContact(name, email, phone) {
  fs.readFile(contentType)
    .then((data) => {
      const contactJson = JSON.parse(data)
      let id = contactJson.length + 1
      const user = { id, name: name, email: email, phone: phone }
      fs.writeFile(contentType, JSON.stringify([user, ...contactJson], null, 2))
    })
    .catch((error) => console.log(error.messege, 'Error!'))
}

//console.log(addContact  (  "Jon",  "jon@Nulla.com", "(704) 788-7993")) ;

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
}
