// ==========================================
// Phone Contact Management System
// Binary Search Tree (BST)
// ==========================================

// Node class - represents one contact
class ContactNode {
    constructor(name, phone, email, address) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;

        this.left = null;
        this.right = null;
    }
}


// ==========================================
// Binary Search Tree Class
// ==========================================

class ContactBST {

    constructor() {
        this.root = null;
    }


    // ======================================
    // INSERT CONTACT
    // ======================================

    insert(name, phone, email, address) {

        const newNode = new ContactNode(
            name,
            phone,
            email,
            address
        );

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        this.root = this.insertNode(this.root, newNode);
    }


    // Recursive helper function for insertion
    insertNode(currentNode, newNode) {

        if (newNode.name.toLowerCase() < currentNode.name.toLowerCase()) {

            if (currentNode.left === null) {
                currentNode.left = newNode;
            } else {
                currentNode.left =
                    this.insertNode(currentNode.left, newNode);
            }

        } else {

            if (currentNode.right === null) {
                currentNode.right = newNode;
            } else {
                currentNode.right =
                    this.insertNode(currentNode.right, newNode);
            }
        }

        return currentNode;
    }


    // ======================================
    // SEARCH CONTACT
    // ======================================

    search(name) {

        return this.searchNode(this.root, name);
    }


    // Recursive helper function for searching
    searchNode(currentNode, name) {

        if (currentNode === null) {
            return null;
        }

        const searchName = name.toLowerCase();
        const currentName = currentNode.name.toLowerCase();

        if (searchName === currentName) {
            return currentNode;
        }

        if (searchName < currentName) {
            return this.searchNode(currentNode.left, name);
        }

        return this.searchNode(currentNode.right, name);
    }


    // ======================================
    // INORDER TRAVERSAL
    // ======================================

    // Returns contacts alphabetically
    inorder() {

        const contacts = [];

        this.inorderTraversal(this.root, contacts);

        return contacts;
    }


    // Recursive inorder traversal
    inorderTraversal(currentNode, contacts) {

        if (currentNode === null) {
            return;
        }

        // Visit left subtree
        this.inorderTraversal(currentNode.left, contacts);

        // Visit current node
        contacts.push({
            name: currentNode.name,
            phone: currentNode.phone,
            email: currentNode.email,
            address: currentNode.address
        });

        // Visit right subtree
        this.inorderTraversal(currentNode.right, contacts);
    }


    // ======================================
    // DELETE CONTACT
    // ======================================

    delete(name) {

        this.root = this.deleteNode(this.root, name);
    }


    // Recursive helper function for deletion
    deleteNode(currentNode, name) {

        if (currentNode === null) {
            return null;
        }

        const deleteName = name.toLowerCase();
        const currentName = currentNode.name.toLowerCase();


        // Search in left subtree
        if (deleteName < currentName) {

            currentNode.left =
                this.deleteNode(currentNode.left, name);

            return currentNode;
        }


        // Search in right subtree
        if (deleteName > currentName) {

            currentNode.right =
                this.deleteNode(currentNode.right, name);

            return currentNode;
        }


        // ==================================
        // Contact found
        // ==================================

        // Case 1: No child
        if (currentNode.left === null &&
            currentNode.right === null) {

            return null;
        }


        // Case 2: Only right child
        if (currentNode.left === null) {

            return currentNode.right;
        }


        // Case 2: Only left child
        if (currentNode.right === null) {

            return currentNode.left;
        }


        // Case 3: Two children
        // Find the smallest node in right subtree

        const successor =
            this.findMinimum(currentNode.right);


        // Copy successor data
        currentNode.name = successor.name;
        currentNode.phone = successor.phone;
        currentNode.email = successor.email;
        currentNode.address = successor.address;


        // Delete successor
        currentNode.right =
            this.deleteNode(currentNode.right, successor.name);


        return currentNode;
    }


    // ======================================
    // FIND MINIMUM NODE
    // ======================================

    findMinimum(node) {

        let current = node;

        while (current.left !== null) {
            current = current.left;
        }

        return current;
    }


    // ======================================
    // CLEAR ENTIRE TREE
    // ======================================

    clear() {

        this.root = null;
    }
}


// ==========================================
// Export BST
// ==========================================

// This allows app.js to use ContactBST
export { ContactBST };