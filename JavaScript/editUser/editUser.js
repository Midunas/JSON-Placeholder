import headerView from '../header.js';
import { firstLetterUpperCase } from '../functions.js';
import { editUser } from './editUserController.js';
import createUser from './editUserView.js';

async function init() {
    headerView();

    let queryParams = document.location.search;
    let urlParams = new URLSearchParams(queryParams);
    let userId = urlParams.get("user_id");

    fetch('https://jsonplaceholder.typicode.com/users/' + userId)
        .then(res => res.json())
        .then(user => {

            let userName = document.getElementById('user-name');
            userName.value = firstLetterUpperCase(user.name);

            let userEmail = document.getElementById('user-email');
            userEmail.value = firstLetterUpperCase(user.email);

            let userStreet = document.getElementById('user-street');
            userStreet.value = firstLetterUpperCase(user.address.street);

            let userSuite = document.getElementById('user-suite');
            userSuite.value = firstLetterUpperCase(user.address.suite);

            let userCity = document.getElementById('user-city');
            userCity.value = firstLetterUpperCase(user.address.city);

            let userZip = document.getElementById('user-zip');
            userZip.value = user.address.zipcode;

            let userPhone = document.getElementById('user-phone');
            userPhone.value = user.phone;

            let userWeb = document.getElementById('user-website');
            userWeb.value = firstLetterUpperCase(user.website);

            let userCompany = document.getElementById('user-company-name');
            userCompany.value = firstLetterUpperCase(user.company.name);

            let userCompanyCatchphrase = document.getElementById('user-company-catchphrase');
            userCompanyCatchphrase.value = firstLetterUpperCase(user.company.catchPhrase);

            let userCompanyBs = document.getElementById('user-company-bs');
            userCompanyBs.value = firstLetterUpperCase(user.company.bs);

        })

    let editUserForm = document.querySelector('#edit-user-form');

    editUserForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let newUserName = event.target.elements.name.value;
        let newUserEmail = event.target.elements.email.value;
        let newUserStreet = event.target.elements.street.value;
        let newUserSuite = event.target.elements.suite.value;
        let newUserCity = event.target.elements.city.value;
        let newUserZip = event.target.elements.city.value;
        let newUserPhone = event.target.elements.phone.value;
        let newUserWeb = event.target.elements.website.value;
        let newUserCompany = event.target.elements['company-name'].value;
        let newUserCompanyCatchphrase = event.target.elements['company-catchphrase'].value;
        let newUserCompanyBs = event.target.elements['company-bs'].value;

        let newUser = {
            name: newUserName,
            email: newUserEmail,
            address: {
                street: newUserStreet,
                suite: newUserSuite,
                city: newUserCity,
                zipcode: newUserZip,
            },
            phone: newUserPhone,
            website: newUserWeb,
            company: {
                name: newUserCompany,
                catchPhrase: newUserCompanyCatchphrase,
                bs: newUserCompanyBs,
            },

        };

        let editedUser = await editUser(newUser);

        createUser(editedUser, event.target);

        // event.target.reset();
    })

}

init();