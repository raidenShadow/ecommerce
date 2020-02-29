var option_collection = document.getElementsByClassName('opt');
var data_collection = document.getElementsByClassName('data');

var hover_state =  0;
var state = 0;
//===================
var overview = {
    btn: document.getElementById('opt-overview'),
    data: document.getElementById('overview-data'),
    index: 0,
    showButton(){
        for(var i = 0; i<option_collection.length; i++){
            option_collection[i].classList.remove('panel-selected-color');
        }
        this.btn.classList.add('panel-selected-color');
    },
    showData(){
        for(var i = 0; i<data_collection.length; i++){
            data_collection[i].classList.add('hide-data');
        }
        this.data.classList.remove('hide-data');
    }
}
//event handler
overview.btn.onclick = ()=>{
    overview.showButton();
    overview.showData();
}
overview.btn.onmouseover = () => {
    overview.btn.style.animate("border-right-width:50px");
}
overview.btn.onmouseleave = () => {
    var onmouseout = setTimeout(() => {
        overview.btn.style.borderRight = "0px solid";
    }, 200)
}

//===================
var products = {
    btn: document.getElementById('opt-products'),
    data: document.getElementById('products-data'),
    index: 1,
    showButton(){
        for(var i = 0; i<option_collection.length; i++){
            option_collection[i].classList.remove('panel-selected-color');
        }
        this.btn.classList.add('panel-selected-color');
    },
    showData(){
        for(var i = 0; i<data_collection.length; i++){
            data_collection[i].classList.add('hide-data');
        }
        this.data.classList.remove('hide-data');
    }
}
products.btn.onclick = ()=>{
    products.showButton();
    products.showData();
}

var summary = {
    btn: document.getElementById('opt-summary'),
    data: document.getElementById('summary-data'),
    index: 2,
    showButton(){
        for(var i = 0; i<option_collection.length; i++){
            option_collection[i].classList.remove('panel-selected-color');
        }
        this.btn.classList.add('panel-selected-color');
    },
    showData(){
        for(var i = 0; i<data_collection.length; i++){
            data_collection[i].classList.add('hide-data');
        }
        this.data.classList.remove('hide-data');
    }
}
summary.btn.onclick = ()=>{
    summary.showButton();
    summary.showData();
}

const nickname = document.getElementById("nickname")
const avatar = document.getElementById("avatar")

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3000/user/me", requestOptions)
  .then(response => response.text())
  .then(result => {
    result = JSON.parse(result)
    nickname.textContent = result.nickname
    avatar.setAttribute("src", result.thumbnail)
  })
  .catch(error => console.log('error', error));
// const overview_index = 0;

// var products_btn =  document.getElementById('opt-products');
// const products_index = 1;

// var summary_btn =  document.getElementById('opt-summary');
// const summary_index = 2;

// var comments_btn =  document.getElementById('opt-comments');
// const comments_index = 3;

// var settings_btn =  document.getElementById('opt-settings');
// const settings_index = 4;

// var logout_btn =  document.getElementById('opt-logout');
// const logout_index = 5;

// overview_btn.onclick = function(){
//     state =  overview_index;
//     for(var i=0; i<5; i++){
//         option_collection[i].classList.remove('panel-selected-color');

//     }
//     overview_btn.classList.add('panel-selected-color');
//     console.log(state);
// }
// products_btn.onclick = ()=>{
//     state =  products_index;
//     for(var i=0; i<5; i++){
//         option_collection[i].classList.remove('panel-selected-color');
//     }
//     products_btn.classList.add('panel-selected-color');
//     console.log(state);

// }
// summary_btn.onclick = ()=>{
//     state =  summary_index;
//     for(var i=0; i<5; i++){
//         option_collection[i].classList.remove('panel-selected-color');
//     }
//     summary_btn.classList.add('panel-selected-color');
//     console.log(state);
// }
// comments_btn.onclick = ()=>{
//     state =  comments_index;
//     for(var i=0; i<5; i++){
//         option_collection[i].classList.remove('panel-selected-color');
//     }
//     comments_btn.classList.add('panel-selected-color');
//     console.log(state);
// }
// settings_btn.onclick = ()=>{
//     state =  products_index;
//     for(var i=0; i<5; i++){
//         option_collection[i].classList.remove('panel-selected-color');
//     }
//     settings_btn.classList.add('panel-selected-color');
//     console.log(state);
// }
// logout_btn.onclick = ()=>{
//     state =  logout_index;
//     for(var i=0; i<5; i++){
//         option_collection[i].classList.remove('panel-selected-color');
//     }
//     logout_btn.classList.add('panel-selected-color');
//     console.log(state);
// }
