// ==========================================
// PHONE CONTACT MANAGEMENT SYSTEM
// Main Application
// ==========================================

import { ContactBST } from "./bst.js";

import {
    saveContacts,
    loadContacts
} from "./storage.js";


// ==========================================
// CREATE BINARY SEARCH TREE
// ==========================================

const contactTree = new ContactBST();


// ==========================================
// LOAD SAVED CONTACTS
// ==========================================

const savedContacts = loadContacts();

savedContacts.forEach(function (contact) {

    contactTree.insert(
        contact.name,
        contact.phone,
        contact.email,
        contact.address
    );

});


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const phoneInput =
    document.getElementById("phone");

const emailInput =
    document.getElementById("email");

const addressInput =
    document.getElementById("address");


const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const searchResult =
    document.getElementById("searchResult");


const displayBtn =
    document.getElementById("displayBtn");

const contactsContainer =
    document.getElementById("contactsContainer");


const formMessage =
    document.getElementById("formMessage");


// ==========================================
// EDIT ELEMENTS
// ==========================================

const editSection =
    document.getElementById("editSection");

const editForm =
    document.getElementById("editForm");

const editName =
    document.getElementById("editName");

const editPhone =
    document.getElementById("editPhone");

const editEmail =
    document.getElementById("editEmail");

const editAddress =
    document.getElementById("editAddress");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");


// ==========================================
// ADD CONTACT
// ==========================================

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        nameInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const email =
        emailInput.value.trim();

    const address =
        addressInput.value.trim();


    // Validate required fields

    if (name === "" || phone === "") {

        showMessage(
            "Please enter name and phone number.",
            "error"
        );

        return;
    }


    // Check whether contact already exists

    const existingContact =
        contactTree.search(name);

    if (existingContact !== null) {

        showMessage(
            "A contact with this name already exists.",
            "error"
        );

        return;
    }


    // Insert into BST

    contactTree.insert(
        name,
        phone,
        email,
        address
    );


    // Save updated BST

    saveContacts(
        contactTree.inorder()
    );


    // Show success message

    showMessage(
        "Contact added successfully!",
        "success"
    );


    // Clear form

    contactForm.reset();


    // Refresh contacts

    displayContacts();

});


// ==========================================
// SEARCH CONTACT
// ==========================================

searchBtn.addEventListener("click", function () {

    searchContact();

});


searchInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        searchContact();

    }

});


function searchContact() {

    const name =
        searchInput.value.trim();


    if (name === "") {

        searchResult.innerHTML = `
            <div class="message">
                Please enter a name to search.
            </div>
        `;

        return;
    }


    // Search in BST

    const contact =
        contactTree.search(name);


    if (contact === null) {

        searchResult.innerHTML = `
            <div class="message">
                ❌ Contact not found.
            </div>
        `;

        return;
    }


    // Display contact

    searchResult.innerHTML =
        createContactCard(contact);

}


// ==========================================
// DISPLAY ALL CONTACTS
// ==========================================

displayBtn.addEventListener("click", function () {

    displayContacts();

});


function displayContacts() {

    const contacts =
        contactTree.inorder();


    contactsContainer.innerHTML = "";


    if (contacts.length === 0) {

        contactsContainer.innerHTML = `
            <div class="message">
                No contacts available.
            </div>
        `;

        return;
    }


    contacts.forEach(function (contact) {

        contactsContainer.innerHTML +=
            createContactCard(contact);

    });

}


// ==========================================
// CREATE CONTACT CARD
// ==========================================

function createContactCard(contact) {

    return `

        <div class="contact-card">

            <h3>${contact.name}</h3>

            <p>
                📞 ${contact.phone}
            </p>

            <p>
                ✉️ ${contact.email || "No email provided"}
            </p>

            <p>
                📍 ${contact.address || "No address provided"}
            </p>


            <button
                class="edit-btn"
                onclick="editContact('${escapeQuotes(contact.name)}')"
            >
                Edit
            </button>


            <button
                class="delete-btn"
                onclick="deleteContact('${escapeQuotes(contact.name)}')"
            >
                Delete
            </button>

        </div>

    `;
}


// ==========================================
// EDIT CONTACT
// ==========================================

window.editContact = function (name) {

    const contact =
        contactTree.search(name);


    if (contact === null) {

        alert("Contact not found.");

        return;
    }


    // Fill edit form

    editName.value =
        contact.name;

    editPhone.value =
        contact.phone;

    editEmail.value =
        contact.email;

    editAddress.value =
        contact.address;


    // Show edit section

    editSection.style.display =
        "block";


    // Scroll to edit form

    editSection.scrollIntoView({
        behavior: "smooth"
    });

};


// ==========================================
// UPDATE CONTACT
// ==========================================

editForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        editName.value.trim();

    const phone =
        editPhone.value.trim();

    const email =
        editEmail.value.trim();

    const address =
        editAddress.value.trim();


    if (name === "" || phone === "") {

        showMessage(
            "Name and phone number are required.",
            "error"
        );

        return;
    }


    // Delete old node

    contactTree.delete(name);


    // Insert updated node

    contactTree.insert(
        name,
        phone,
        email,
        address
    );


    // Save updated contacts

    saveContacts(
        contactTree.inorder()
    );


    // Refresh contact display

    displayContacts();


    // Hide edit section

    editSection.style.display =
        "none";


    // Reset edit form

    editForm.reset();


    showMessage(
        "Contact updated successfully!",
        "success"
    );

});


// ==========================================
// CANCEL EDIT
// ==========================================

cancelEditBtn.addEventListener("click", function () {

    editSection.style.display =
        "none";

    editForm.reset();

});


// ==========================================
// DELETE CONTACT
// ==========================================

window.deleteContact = function (name) {

    const confirmation =
        confirm(
            `Are you sure you want to delete ${name}?`
        );


    if (!confirmation) {

        return;

    }


    // Delete from BST

    contactTree.delete(name);


    // Save updated BST

    saveContacts(
        contactTree.inorder()
    );


    // Refresh display

    displayContacts();


    // Clear search result

    searchResult.innerHTML = "";


    showMessage(
        "Contact deleted successfully!",
        "success"
    );

};


// ==========================================
// SHOW MESSAGE
// ==========================================

function showMessage(message, type) {

    formMessage.textContent =
        message;

    formMessage.style.display =
        "block";


    if (type === "success") {

        formMessage.style.background =
            "rgba(34, 197, 94, 0.15)";

        formMessage.style.color =
            "#15803d";

    } else {

        formMessage.style.background =
            "rgba(239, 68, 68, 0.15)";

        formMessage.style.color =
            "#b91c1c";

    }


    setTimeout(function () {

        formMessage.style.display =
            "none";

    }, 3000);

}


// ==========================================
// ESCAPE QUOTES
// ==========================================

function escapeQuotes(text) {

    return text
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayContacts();