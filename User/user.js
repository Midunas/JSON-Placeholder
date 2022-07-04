let mainWrapper = document.getElementById("wrapper");


fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((users) => {
    users.map((user) => {

    
    let userItem = document.createElement("div");
    userItem.classList.add("user-wrap");
    mainWrapper.append(userItem);
    let userImage = document.createElement('img')
    userImage.src = 'https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg';
    userImage.style.height = `175px`;
    let userName = document.createElement("h3");
    userName.classList.add("user-name");
    userName.innerHTML = `${user.name}`;
    let userUsername = document.createElement("p");
    userUsername.innerHTML = `Username: ${user.username}`;

    let userEmail = document.createElement("p");
    userEmail.innerHTML = `Email: ${user.email}`;

    let lng = user.address.geo.lng;
    let lat = user.address.geo.lat;
    let addressLink = document.createElement('a')

    addressLink.innerHTML = `Address: ${user.address.street} | ${user.address.suite} | ${user.address.city} | ${user.address.zipcode}`;
    addressLink.href =`http://maps.google.com/maps?z=12&t=m&q=loc:${lng} ${lat}`;
    addressLink.target = `_blank`;

    let userPhone = document.createElement('p');
    userPhone.innerHTML = `Phone: ${user.phone}`;

    let userWeb = document.createElement('p');
    userWeb.textContent = `www.${user.website}`;
        
    let userCompany = document.createElement('p');
    userCompany.textContent = user.company.name;
    
    let showDataButton = document.createElement('button');
    showDataButton.textContent = `Show data`;


    userItem.append(userImage, userName, userUsername, userEmail, addressLink, userPhone, userWeb,userCompany,showDataButton);

      });

    });
  
