const button = document.getElementById("btn")

button.addEventListener('click', (e) => {
  const userName = document.getElementById("username").value
  const password = document.getElementById("password").value
  const avatar = document.getElementById("avatar")
  e.preventDefault()
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({"username": userName,"password": password});
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("http://localhost:3000/user/login", requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result)
      window.location.href = "http://localhost:3000/user/panel"
    }).catch(error => console.log('error', error));
})
