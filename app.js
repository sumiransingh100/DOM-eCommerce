const addProBtn = document.querySelector(".addProduct");
const formDiv = document.querySelector(".form");
const close = document.querySelector(".close");
const form = document.querySelector("form");
const productBox = document.querySelector("#product_section");

const defaultProducts = [
    {
        productName: "Wireless Headphones",
        productDes: "High-quality sound with noise cancellation",
        productPrice: "2499",
        productUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
    },
    {
        productName: "Smartphone",
        productDes: "Latest model with 5G connectivity",
        productPrice: "35999",
        productUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAf9fYrTROxungWgIoQ3GQDmq7HdbqpabN_VW8GDI1ag&s=10"
    },
    {
        productName: "Laptop",
        productDes: "Powerful performance for work and gaming",
        productPrice: "89999",
        productUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop"
    },
    {
        productName: "Smartwatch",
        productDes: "Track your fitness and stay connected",
        productPrice: "12999",
        productUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
    },
    {
        productName: "Tablet",
        productDes: "Perfect for entertainment and productivity",
        productPrice: "29999",
        productUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop"
    },
    {
        productName: "Camera",
        productDes: "Professional camera with high resolution",
        productPrice: "54999",
        productUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVo00nMqDBmUqaHj-mR-mGhx9JjJmUco5UjhjmFufnaw&s=10"
    },
    {
        productName: "Bluetooth Speaker",
        productDes: "Portable speaker with crystal clear sound",
        productPrice: "3999",
        productUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop"
    },
    {
        productName: "Power Bank",
        productDes: "20000mAh battery for all devices",
        productPrice: "1999",
        productUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop"
    }
];

let productArr = [];
let updateIndex = null;

// LocalStorage functions
const saveToLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(productArr));
}

const loadFromLocalStorage = () => {
    const saved = localStorage.getItem("products");
    if(saved) {
        productArr = JSON.parse(saved);
    } else {
        productArr = defaultProducts;
        saveToLocalStorage();
    }
}

let ui = () => {
    productBox.innerHTML = "";
    productArr.forEach((elem, index) =>{
        productBox.innerHTML += `<div class="card">
                                    <div class="img_sec">
                                        <img src="${elem.productUrl}">
                                    </div>
                                    <div class="details">
                                        <div class="part1">
                                            <h2>${elem.productName}</h2>
                                            <p>${elem.productDes}</p>
                                        </div>
                                        <div class="part2">
                                            <h2>₹ ${elem.productPrice}</h2>
                                        </div>
                                    </div>
                                    <div class="action_btns">
                                        <button class="edit" onclick = "updateProduct('${elem.productName}')">Update</button>
                                        <button class="del" onclick= "deleteProduct(${index})">Delete</button>
                                    </div>
                                </div>`
    });
}

addProBtn.addEventListener("click",() => {
    formDiv.style.display = "flex";
});

close.addEventListener("click", () => {
    formDiv.style.display = "none";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let productName = event.target[0].value;
    let productDes = event.target[1].value;
    let productPrice = event.target[2].value;
    let productUrl = event.target[3].value;

    if(productName.trim() === "" || 
        productDes.trim() =="" || 
        productPrice.trim() == "" || 
        productUrl.trim() == ""
    ) {
        alert("Please fill all fields first !");
        return;
    }

    let obj = {
        productName,
        productDes,
        productPrice,
        productUrl
    }

    if(updateIndex !== null){
        productArr[updateIndex] = obj;
        updateIndex = null;
    }else{
        productArr.push(obj);
    }

    ui();
    saveToLocalStorage();
    form.reset();
    formDiv.style.display = "none";
});


const updateProduct = (name) => {
    formDiv.style.display = "flex";
    let product = productArr.find((elem) => elem.productName === name);
    updateIndex = productArr.findIndex((elem) => elem.productName === name);

    form[0].value = product.productName
    form[1].value = product.productDes
    form[2].value = product.productPrice
    form[3].value = product.productUrl
}

const deleteProduct = (index) => {
    productArr.splice(index, 1);
    ui();
    saveToLocalStorage();
}

// Initialize - Load from localStorage and render UI
loadFromLocalStorage();
ui();