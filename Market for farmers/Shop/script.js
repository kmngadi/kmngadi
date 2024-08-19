let products = [];
let items = document.getElementsByClassName('items');
let fruitsBtn = document.getElementById('fruits');
let vegetablesBtn = document.getElementById('vegetables');
let dairyBtn = document.getElementById('dairy');
let meatBtn = document.getElementById('meat');
let section = document.getElementsByClassName('cat');
let all = document.getElementById('all');
let search = document.getElementById('search');
let apply = document.getElementById('applyfilter');
let cancel = document.getElementById('cancelfilter');
let checkers = document.getElementsByClassName('checkers');
let temp = JSON.parse(localStorage.getItem('products'));
let color = document.getElementsByName('color');
let size = document.getElementsByName('size');
let addToCart = document.getElementById('addBtn');

getProducts();

if (!localStorage.getItem('accesstoken')) {
  location.href = '../index.html';
}

for (let i = 0; i < checkers.length; i++) {
  checkers[i].addEventListener('click', () => {
    if (checkers[i].checked) {
      for (let j = 0; j < checkers.length; j++) {
        checkers[j].checked = false;
      }
      checkers[i].checked = true;
    } else {
      checkers[i].checked = false;
    }
  });
}

async function getProducts() {
  if (!localStorage.getItem('products')) {
    try {
      let res = await fetch('https://api.example.com/farmers-market-products'); // Replace with actual API URL
      let temp = await res.json();
      products = temp;
      console.log(products);

      products.forEach((element) => {
        element.color = []; // Not used in farmers market; leave as empty array
        element.size = [];  // Not used in farmers market; leave as empty array
      });

      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  populateData();
}

function populateData(array) {
  let temp = JSON.parse(localStorage.getItem('products'));
  if (array !== undefined) {
    temp = array;
  }

  items[0].innerHTML = '';
  items[1].innerHTML = '';
  items[2].innerHTML = '';
  items[3].innerHTML = '';

  temp.forEach((element) => {
    let categoryDiv = document.createElement('div');
    categoryDiv.className = 'item';
    categoryDiv.innerHTML = `
      <div class="images"><img src=${element.image} alt="Item" /></div>
      <div class="info">
        <div class="name">${element.title}</div>
        <div class='desc'>${element.description}</div>
        <div class="row">
          <div class="price">$${element.price}</div>
        </div>
        <div class="row rating">Rating: <img src=${getStars(element.rating)} class='stars'>(${element.rating.count})</div>
      </div>
      <button id="addBtn" onclick='addTo(${element.id})'>Add to Cart</button>
    `;

    switch (element.category) {
      case "fruits":
        items[0].append(categoryDiv);
        break;
      case "vegetables":
        items[1].append(categoryDiv);
        break;
      case "dairy":
        items[2].append(categoryDiv);
        break;
      case "meat":
        items[3].append(categoryDiv);
        break;
      default:
        items[3].append(categoryDiv); // Default to meat category if unknown
        break;
    }
  });
}

function getStars(rating) {
  let src = '';
  if (rating <= 0.5) {
    src = './stars/0.5.png';
  } else if (rating > 0.5 && rating <= 1) {
    src = './stars/1.png';
  } else if (rating > 1 && rating <= 1.5) {
    src = './stars/1.5.png';
  } else if (rating > 1.5 && rating <= 2) {
    src = './stars/2.png';
  } else if (rating > 2 && rating <= 2.5) {
    src = './stars/2.5.png';
  } else if (rating > 2.5 && rating <= 3) {
    src = './stars/3.png';
  } else if (rating > 3 && rating <= 3.5) {
    src = './stars/3.5.png';
  } else if (rating > 3.5 && rating <= 4) {
    src = './stars/4.png';
  } else if (rating > 4 && rating <= 4.5) {
    src = './stars/4.5.png';
  } else if (rating > 4.5 && rating <= 5) {
    src = './stars/5.png';
  }
  return src;
}

fruitsBtn.addEventListener('click', () => {
  if (fruitsBtn.style.backgroundColor === 'black') {
    fruitsBtn.style.backgroundColor = 'white';
    fruitsBtn.style.color = 'black';
    section[0].style.display = 'none';

    if (vegetablesBtn.style.backgroundColor == 'white' && dairyBtn.style.backgroundColor == 'white' && meatBtn.style.backgroundColor == 'white') {
      all.style.backgroundColor = 'black';
      all.style.color = 'white';
      for (let i = 0; i < section.length; i++) {
        section[i].style.display = 'block';
      }
    }
  } else {
    all.style.backgroundColor = 'white';
    all.style.color = 'black';
    fruitsBtn.style.backgroundColor = 'black';
    fruitsBtn.style.color = 'white';
    section[0].style.display = 'block';
    if (vegetablesBtn.style.backgroundColor != 'black') {
      section[1].style.display = 'none';
    }
    if (dairyBtn.style.backgroundColor != 'black') {
      section[2].style.display = 'none';
    }
    if (meatBtn.style.backgroundColor != 'black') {
      section[3].style.display = 'none';
    }
  }
});

vegetablesBtn.addEventListener('click', () => {
  if (vegetablesBtn.style.backgroundColor === 'black') {
    vegetablesBtn.style.backgroundColor = 'white';
    vegetablesBtn.style.color = 'black';
    section[1].style.display = 'none';

    if (fruitsBtn.style.backgroundColor === 'white' && dairyBtn.style.backgroundColor === 'white' && meatBtn.style.backgroundColor === 'white') {
      all.style.backgroundColor = 'black';
      all.style.color = 'white';
      for (let i = 0; i < section.length; i++) {
        section[i].style.display = 'block';
      }
    }
  } else {
    all.style.backgroundColor = 'white';
    all.style.color = 'black';
    vegetablesBtn.style.backgroundColor = 'black';
    vegetablesBtn.style.color = 'white';
    section[1].style.display = 'block';
    if (fruitsBtn.style.backgroundColor != 'black') {
      section[0].style.display = 'none';
    }
    if (dairyBtn.style.backgroundColor != 'black') {
      section[2].style.display = 'none';
    }
    if (meatBtn.style.backgroundColor != 'black') {
      section[3].style.display = 'none';
    }
  }
});

dairyBtn.addEventListener('click', () => {
  if (dairyBtn.style.backgroundColor === 'black') {
    dairyBtn.style.backgroundColor = 'white';
    dairyBtn.style.color = 'black';
    section[2].style.display = 'none';

    if (fruitsBtn.style.backgroundColor === 'white' && vegetablesBtn.style.backgroundColor === 'white' && meatBtn.style.backgroundColor === 'white') {
      all.style.backgroundColor = 'black';
      all.style.color = 'white';
      for (let i = 0; i < section.length; i++) {
        section[i].style.display = 'block';
      }
    }
  } else {
    all.style.backgroundColor = 'white';
    all.style.color = 'black';
    dairyBtn.style.backgroundColor = 'black';
    dairyBtn.style.color = 'white';
    section[2].style.display = 'block';
    if (fruitsBtn.style.backgroundColor != 'black') {
      section[0].style.display = 'none';
    }
    if (vegetablesBtn.style.backgroundColor != 'black') {
      section[1].style.display = 'none';
    }
    if (meatBtn.style.backgroundColor != 'black') {
      section[3].style.display = 'none';
    }
  }
});

meatBtn.addEventListener('click', () => {
  if (meatBtn.style.backgroundColor === 'black') {
    meatBtn.style.backgroundColor = 'white';
    meatBtn.style.color = 'black';
    section[3].style.display = 'none';

    if (fruitsBtn.style.backgroundColor === 'white' && vegetablesBtn.style.backgroundColor === 'white' && dairyBtn.style.backgroundColor === 'white') {
      all.style.backgroundColor = 'black';
      all.style.color = 'white';
      for (let i = 0; i < section.length; i++) {
        section[i].style.display = 'block';
      }
    }
  } else {
    all.style.backgroundColor = 'white';
    all.style.color = 'black';
    meatBtn.style.backgroundColor = 'black';
    meatBtn.style.color = 'white';
    section[3].style.display = 'block';
    if (fruitsBtn.style.backgroundColor != 'black') {
      section[0].style.display = 'none';
    }
    if (vegetablesBtn.style.backgroundColor != 'black') {
      section[1].style.display = 'none';
    }
    if (dairyBtn.style.backgroundColor != 'black') {
      section[2].style.display = 'none';
    }
  }
});

all.addEventListener('click', () => {
  if (all.style.backgroundColor != 'black') {
    fruitsBtn.style.backgroundColor = 'white';
    vegetablesBtn.style.backgroundColor = 'white';
    dairyBtn.style.backgroundColor = 'white';
    meatBtn.style.backgroundColor = 'white';
    fruitsBtn.style.color = 'black';
    vegetablesBtn.style.color = 'black';
    dairyBtn.style.color = 'black';
    meatBtn.style.color = 'black';
    section[0].style.display = 'block';
    section[1].style.display = 'block';
    section[2].style.display = 'block';
    section[3].style.display = 'block';
    all.style.backgroundColor = 'black';
    all.style.color = 'white';
  }
});

search.addEventListener('input', () => {
  let temp = JSON.parse(localStorage.getItem('products'));
  let searched = search.value.toUpperCase();
  let res = temp.filter(element => {
    return element.title.toUpperCase().includes(searched) || element.description.toUpperCase().includes(searched);
  });
  populateData(res);
});

cancel.addEventListener('click', () => {
  apply.style.backgroundColor = 'black';
  apply.style.color = 'white';
  populateData();
});

apply.addEventListener('click', () => {
  let temp = JSON.parse(localStorage.getItem('products'));
  apply.style.backgroundColor = 'white';
  apply.style.color = 'black';

  let sizeselected = [];
  let colorselected = [];
  let rating = document.getElementById('range').value;
  let id = '';
  let x = [];
  
  for (let i = 0; i < checkers.length; i++) {
    if (checkers[i].checked) {
      id = checkers[i].id;
    }
  }
  
  for (let i = 0; i < size.length; i++) {
    if (size[i].checked) {
      sizeselected.push(size[i].id);
    }
  }

  for (let i = 0; i < color.length; i++) {
    if (color[i].checked) {
      colorselected.push(color[i].id);
    }
  }

  x = temp.filter(element => {
    let tempobjsize = element.size;
    let tempobjcolor = element.color;
    let checker1 = false;
    let checker2 = false;
    let checker3 = false;

    sizeselected.forEach(element => {
      if (tempobjsize.includes(element)) {
        checker1 = true;
      }
    });

    colorselected.forEach(element => {
      if (tempobjcolor.includes(element)) {
        checker2 = true;
      }
    });

    if (id.length != 0) {
      if (id == "0-25") {
        if (0 < element.price && element.price <= 25) {
          checker3 = true;
        }
      } else if (id == "25-50") {
        if (25 < element.price && element.price <= 50) {
          checker3 = true;
        }
      } else if (id == "50-100") {
        if (50 < element.price && element.price <= 100) {
          checker3 = true;
        }
      } else if (id == "100on") {
        if (element.price > 100) {
          checker3 = true;
        }
      }
    }

    return (sizeselected.length != 0 ? checker1 : 'true') && 
           (colorselected.length != 0 ? checker2 : 'true') && 
           getRating(element.rating.rate) >= Number(rating) && 
           (id.length != 0 ? checker3 : 'true');
  });
  
  populateData(x);
});

function addTo(index) {
  let temp1 = JSON.parse(localStorage.getItem('cart'));
  let temp2 = JSON.parse(localStorage.getItem('products'));
  let token = localStorage.getItem('accesstoken');

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let tempacc = generateString(16);
  temp2[index - 1].cartid = tempacc;
  for (let i = 0; i < temp1.length; i++) {
    if (temp1[i].token == token) {
      temp1[i].items.push(temp2[index - 1]);
      localStorage.setItem('cart', JSON.stringify(temp1));
      return;
    }
  }
}
