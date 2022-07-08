let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

let mainWrapper = document.getElementById("wrapper");


fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((users) => {
    users.map((user) => {

      fetch('https://jsonplaceholder.typicode.com/posts?userId=' + user.id)
      .then(res => res.json())
      .then(posts => {

        let userItem = document.createElement("div");
        userItem.classList.add("user-wrap");
        mainWrapper.append(userItem);
    
        let userImage = document.createElement('img')
        userImage.src = 'https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg';
        userImage.style.height = `175px`;
        
        let userName = document.createElement("h3");
        userName.classList.add("user-name");
        userName.innerHTML = `${user.name}`;

        let postsCount = document.createElement('span');
        postsCount.classList.add(`post-count`);
        postsCount.innerHTML = `Posts count: ${posts.length} <br><br>`;

        let showDataLink = document.createElement('a')
        showDataLink.href = `./User.html?user_id=${user.id}`;
        showDataLink.target = `_blank`;
        let showDataButton = document.createElement('button');
        showDataButton.classList.add('view-data-button')
        showDataButton.textContent = `View data`;
        showDataLink.append(showDataButton)
  
        userItem.append(userImage,userName,postsCount,showDataLink);

        })
  


      });

      

    });
  

