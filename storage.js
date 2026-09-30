// ==========================================
// CONTACT STORAGE
// Uses Browser LocalStorage
// ==========================================

const STORAGE_KEY = "phone_contacts";


// ==========================================
// SAVE CONTACTS
// ==========================================

function saveContacts(contacts) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(contacts)
    );

}


// ==========================================
// LOAD CONTACTS
// ==========================================

function loadContacts() {

    const savedContacts =
        localStorage.getItem(STORAGE_KEY);


    if (savedContacts === null) {

        return [];

    }


    try {

        return JSON.parse(savedContacts);

    } catch (error) {

        console.error(
            "Error loading contacts:",
            error
        );

        return [];

    }

}


// ==========================================
// CLEAR ALL CONTACTS
// ==========================================

function clearContacts() {

    localStorage.removeItem(STORAGE_KEY);

}


// ==========================================
// EXPORT FUNCTIONS
// ==========================================

export {
    saveContacts,
    loadContacts,
    clearContacts
};