
document.addEventListener('DOMContentLoaded', getUsers);

async function getUsers() {
    try {
        const response = await fetch('http://localhost:8081/api/admin/getUsers', {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        const data = await response.json();
        populateUserTable(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function populateUserTable(data) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';


    // Iterate over the user data and generate table rows
    data.forEach((user) => {
        const row = document.createElement('tr');

        // Create table cells and set their content
        const idCell = document.createElement('td');
        idCell.textContent = user.id;

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = user.firstname;

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = user.lastname;

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;

        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;

        const passwordCell = document.createElement('td');
        passwordCell.textContent = user.password;

        const countryCell = document.createElement('td');
        countryCell.textContent = user.country;

        const roleCell = document.createElement('td');
        roleCell.textContent = user.role;

        const actionCell = document.createElement('td');

        const editButton = createButton('Edit', 'green', () => {
            editUser(user);
        });

        const saveButton = createButton('Save', 'green', () => {
            saveUser(user);
        });
        saveButton.style.display = 'none';

        const deleteButton = createButton('Delete', 'green', () => {
            const confirmed = confirm('Are you sure you want to delete this user?');
            if (confirmed) {
                deleteUser(user);
            }
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(saveButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(firstNameCell);
        row.appendChild(lastNameCell);
        row.appendChild(emailCell);
        row.appendChild(usernameCell);
        row.appendChild(passwordCell);
        row.appendChild(countryCell);
        row.appendChild(roleCell);
        row.appendChild(actionCell);

        userList.appendChild(row);

      async function saveUser(user) {
            saveButton.style.display = 'none';
            editButton.style.display = 'inline-block';

            firstNameCell.contentEditable = false;
            lastNameCell.contentEditable = false;
            emailCell.contentEditable = false;
            usernameCell.contentEditable = false;
            passwordCell.contentEditable = false;
            countryCell.contentEditable = false;

            const firstname = firstNameCell.textContent.trim();
            const lastname = lastNameCell.textContent.trim();
            const email = emailCell.textContent.trim();
            const username = usernameCell.textContent.trim();
            const password = passwordCell.textContent.trim();
            const country = countryCell.textContent.trim();

            const updatedUser = {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "username": username,
                "password": password,
                "country": country
            }
            console.log(updatedUser);

         try {
             const response = await fetch(`http://localhost:8081/api/admin/editUser/`, {
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(updatedUser)
             });
             if (response.ok) {
                 console.log('User updated successfully');
                 const updatedUserData = await response.json();
                 console.log(updatedUserData);
                 firstNameCell.textContent = updatedUserData.firstname;
                 lastNameCell.textContent = updatedUserData.lastname;
                 emailCell.textContent = updatedUserData.email;
                 usernameCell.textContent = updatedUserData.username;
                 passwordCell.textContent = updatedUserData.password;
                 countryCell.textContent = updatedUserData.country;
             } else {
                 console.error('Failed to update user');
             }
         } catch (error) {
             console.error('Error updating user:', error);
         }
         }



        function  editUser(user){
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';

            firstNameCell.contentEditable = true;
            lastNameCell.contentEditable = true;
            emailCell.contentEditable = false;
            usernameCell.contentEditable = true;
            passwordCell.contentEditable = true;
            countryCell.contentEditable = true;
        }

    });

}

async function deleteUser(user){
    try {
        const response = await fetch(`http://localhost:8081/api/admin/deleteUser/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: user.email})
        });
        if (response.ok) {
            console.log('User deleted successfully');
            const userList = document.getElementById('userList');
            const rowToDelete = document.getElementById('userRow-' + user.id);
            userList.removeChild(rowToDelete);
        } else {
            console.error('Failed to delete user');
        }
    }catch (error){
    console.error('Error deleting user:', error);
    }
}




function createButton(text, color, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.backgroundColor = color;
    button.addEventListener('click', onClick);
    return button;
}

