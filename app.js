import { menuArray } from './data.js';

let orderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.click) {
        handleMenuClicks(e.target.dataset.click)
    } else if (e.target.classList.contains("remove-item")) {
        removeItem(e.target)
    } else if (e.target.id === 'btn') {
        paymentModal()
    }
})

function paymentModal() {
    document.getElementById('modal').style.display = 'flex'
}

let name = document.getElementById('name')
let re = document.getElementById('re')
let reone = document.getElementById('re-2')
let rethree = document.getElementById('re-3')

document.getElementById('btn-modal').addEventListener('click', function(e){
    if(re.value && reone.value && rethree.value) {
        e.preventDefault()
        document.getElementById('modal').style.display = 'none'
        total.style.display = 'none'
        text.style.display = 'none'
        document.getElementById('footers').style.display = 'none'
        document.getElementById('last').style.display = 'flex' 
        name.innerHTML = re.value
        document.getElementById('rating').innerHTML = 'Hello'
    }
})

document.getElementById('close').addEventListener('click', function(){
    document.getElementById('modal').style.display = 'none'
})

function handleMenuClicks(menuId) {
    const targetItemObj = menuArray.filter(function(items){
        return items.id === parseInt(menuId)
    })[0]
    orderArray.push(targetItemObj)
    render()
}

let total = document.getElementById('total')


let text = document.getElementById('text')
function renderOrder() {
    let totalpirce = 0
    let orderHtml = ''
    // <footer id="footers">
    //     <h1 class="h1">Your Order</h1>
    // </footer>
    text.innerHTML = `
    <h1 class="h1">Your Order</h1>
    `
    orderArray.forEach(function(items){
        orderHtml += `
        <div class="container-footer">
          <div class="one">
            <h1>${items.name}</h1>
            <p class="remove-item" data-remove="${items.id}">remove</p>
          </div>
          <div class="two">
            <h1>$${items.price}</h1>
          </div>
        </div>
        `
        totalpirce += items.price
    })
        if(totalpirce > 30) {
            total.innerHTML = `
            <div class="flex">
            <h1>Total price:</h1>
            <h1><span class="dis">$10</span> <br> $${totalpirce - 10}</h1>
            </div>
            <br>
            <button id="btn">Complete order</button>
    
        `
        } else {
            total.innerHTML = `
            <div class="flex">
            <h1>Total price:</h1>
            <h1>$${totalpirce}</h1>
            </div>
            <br>
            <button id="btn">Complete order</button>
    
        `
        }
    //     total.innerHTML = `
    //     <div class="flex">
    //     <h1>Total price:</h1>
    //     <h1>$${totalpirce}</h1>
    //     </div>
    //     <br>
    //     <button id="btn">Complete order</button>

    // `
    return orderHtml
}


document.getElementById('cl').addEventListener('click', function(){
    document.getElementById('dis-modal').style.display = 'none'
})

function removeItem(removeBtn) {
    const clear = removeBtn.parentElement.parentElement.innerHTML = ''
    orderArray.pop()
    if(orderArray.length > 0) {
        renderOrder()
    }else  {
        total.innerHTML = ''
        text.innerHTML = ''
    } 
}

function renderMenu() {
    let menuHtml = ''
    menuArray.forEach(function(menu){
        menuHtml += `
        <div class="container-section">
            <div class="left">
            <div class="box1">
                <h1>${menu.emoji}</h1>
            </div>
            <div class="box2">
                <h1>${menu.name}</h1>
                <p>${menu.ingredients}</p>
                <h3>$${menu.price}</h3>
            </div>
            </div>
            <div class="box3">
            <i class="fa-solid fa-circle-plus" data-click="${menu.id}"></i>
            </div>
        </div>
        `
    })
    return menuHtml
}



function render() {
    document.getElementById('section').innerHTML = renderMenu()
    if(orderArray.length > 0) {
        document.getElementById('footer').innerHTML = renderOrder()
    } 
}

render()