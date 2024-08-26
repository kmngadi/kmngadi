let maincont = document.getElementsByTagName('main-content')[0];
let checkitems = document.getElementsByClassName('checkitems')[0];

if (!localStorage.getItem('accesstoken')) {
    location.href = '../index.html';
}

function populate() {
    localStorage.setItem('sum', 0);
    let temp = JSON.parse(localStorage.getItem('cart'));
    let token = localStorage.getItem('accesstoken');
    let cartItems = [];
    
    temp.forEach(element => {
        if (element.token == token) {
            cartItems = element.items;
        }
    });
    
    maincont.innerHTML = '';
    
    cartItems.forEach((element) => {
        let itemDiv = document.createElement('div');
        let cartid = String(element.cartid);
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <div class="images"><img src="${element.image}" alt="Item" /></div>
            <div class="info">
                <div class="name">${element.name}</div>
                <div class='desc'>${element.description}</div>
                <div class="row">
                    <div class="price">$${element.price}</div>
                    <div class="sized">${element.size.join(', ')}</div>
                </div>
                <div class="colors">
                    Colors:
                    <div class="row">
                        ${element.color.map(c => `<div class="circle" style="background-color: ${c}"></div>`).join('')}
                    </div>
                </div>
                <div class="row rating">Rating: <img src="${getStars(element.rating.rate)}" class='stars'> (${element.rating.count})</div>
            </div>
            <button id="addBtn" onclick='removeFromCart(${JSON.stringify(element.cartid)})'>Remove from Cart</button>
        `;
        maincont.append(itemDiv);
    });
    
    console.log(cartItems);
    
    checkitems.innerHTML = '';
    let sum = 0;
    
    cartItems.forEach((item, index) => {
        let summaryDiv = document.createElement('div');
        summaryDiv.className = 'type';
        summaryDiv.innerHTML = `
            <div class='left1'>${index + 1}. ${item.name}</div>
            <div class='right1'>$${item.price}</div>
        `;
        checkitems.append(summaryDiv);
        sum += item.price;
    });
    
    let totalDiv = document.createElement('div');
    sum = sum.toFixed(2);
    totalDiv.className = 'type';
    totalDiv.innerHTML = `
        <div class='left1'>Total</div>
        <div class='right1'>$${sum}</div>
    `;
    totalDiv.style.borderBottom = '1px solid white';
    totalDiv.style.borderTop = '1px solid white';
    totalDiv.style.paddingTop = '1%';
    totalDiv.style.paddingBottom = '1%';
    checkitems.append(totalDiv);
    
    let checkoutBtn = document.createElement('button');
    checkoutBtn.innerText = 'Click to Checkout';
    checkoutBtn.className = 'checkoutbtn';
    checkoutBtn.onclick = checkout;
    let btnContainer = document.createElement('div');
    btnContainer.className = 'btncontainer';
    btnContainer.append(checkoutBtn);
    checkitems.append(btnContainer);
    
    localStorage.setItem('sum', sum);
}

function getStars(rating) {
    let src = '';
    if (rating <= 1) {
        src = 'Shop/Stars/1.png';
    } else if (rating <= 2) {
        src = 'Shop/Stars/2.png';
    } else if (rating <= 3) {
        src = 'Shop/Stars/3.png';
    } else if (rating <= 4) {
        src = 'Shop/Stars/4.png';
    } else if (rating <= 5) {
        src = 'Shop/Stars/5.png';
    }
    return src;
}

populate();

function checkout() {
    if (localStorage.getItem('sum')) {
        if (parseFloat(localStorage.getItem('sum')) > 0) {
            let temp = JSON.parse(localStorage.getItem('cart'));
            let token = localStorage.getItem('accesstoken');
            temp.forEach(element => {
                if (element.token == token) {
                    element.items = [];
                }
            });
            localStorage.setItem('cart', JSON.stringify(temp));
            maincont.innerHTML = '';
            alert('The items were purchased successfully');

            /**The location of the online payment example**/
            location.href = '../razorpay/index.html'; 
        }  
    }
}

function removeFromCart(cartid) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let token = localStorage.getItem('accesstoken');
    cart.forEach(element => {
        if (element.token == token) {
            element.items = element.items.filter(item => item.cartid !== cartid);
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    populate();
}
