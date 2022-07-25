export default function createUser(user, formElement) {

    let userItem = document.createElement("div");
    userItem.classList.add("user-wrap");

    let userImage = document.createElement('img')
    userImage.src = 'https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg';
    userImage.style.height = `175px`;
    let userName = document.createElement("h3");
    userName.classList.add("user-name");
    userName.innerHTML = `${user.name}`;

    let userEmail = document.createElement("p");
    userEmail.innerHTML = `Email: <a href="mailto:"${user.email}">${user.email}</a>`;

    let addressLink = document.createElement('a')

    addressLink.innerHTML = `Address: ${user.address.street} | ${user.address.suite} | ${user.address.city} | ${user.address.zipcode}`;

    let userPhone = document.createElement('p');
    userPhone.innerHTML = `Phone: <a href="tel:${user.phone}"> ${user.phone}</a>`;

    let userWeb = document.createElement('p');
    userWeb.innerHTML = `<a href="${user.website}"target="_blank">www.${user.website}</a>`;

    let userCompany = document.createElement('p');
    userCompany.textContent = user.company.name;

    let catchPhrase = document.createElement('p');
    catchPhrase.textContent = user.company.catchPhrase;

    let companyBs = document.createElement('p');
    companyBs.textContent = user.company.bs;

    userItem.append(userImage, userName, userEmail, addressLink, userPhone, userWeb, userCompany, catchPhrase, companyBs);
    formElement.after(userItem);
}