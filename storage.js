const CONTACTS_KEY = 'CONTACTS';

class Store{

    static save(contact){
        const allContacts = this.getAll();
        allContacts.push(contact);
        this.updatelocalStorage(allContacts)
    }

    static getAll(){
        let str = localStorage.getItem(CONTACTS_KEY);
        return (str) ? JSON.parse(str) : []
    }

    static updatelocalStorage(contacts){
        localStorage.setItem(CONTACTS_KEY, contacts)
    }
}