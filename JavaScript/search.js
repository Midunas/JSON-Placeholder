let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchPhrase = urlParams.get('search-input');
let usersList = document.createElement('ul');

fetch(`https://jsonplaceholder.typicode.com/users?username=${searchPhrase}`)
    .then(res => res.json())
    .then(users => {

        console.log(user);

        if(users.length > 0 ) {
            
            users.map(user => {

            let userItem = document.createElement('li');
            userItem.innerHTML = `<a href="./user.html?user_id=${user.id}"> ${user.name}</a>`;

            usersList.append(userItem)
                
            })
            fetch(`https://jsonplaceholder.typicode.com/users?name=${searchPhrase}`)
                .then(res => res.json())
                .then(user => {

                    console.log(user);

        })
    }

    })
