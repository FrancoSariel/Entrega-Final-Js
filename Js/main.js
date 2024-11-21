const arrayProductos = document.getElementById("arrayProductos");
const verCarrito = document.getElementById("verCarrito");
const carritoContainer = document.getElementById("carrito-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const getProducts = async () => {
    const response = await fetch("./data.json");
    const data = await response.json();
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

data.forEach((product)=> {
    let content = document.createElement("div");
    content.className = "cards";
    content.innerHTML = `
     <img src="${product.img}">
     <h3>${product.nombre}</h3>
     <p class= "precio">${product.precio} $</p> 
     
    `;
    arrayProductos.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Añadir al Carrito";
    comprar.className = "añadirCarrito";

    content.append(comprar);

    comprar.addEventListener("click", () => {
        Swal.fire("Añadiste un Producto al Carrito!");
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
     
        if (repeat){
            carrito.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++;
                }
            });
        } else{
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
    }       
        console.log(carrito);
        carritoCounter();
        savelocal();
    });
});
const savelocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}






const controlCarrito =() => {

    carritoContainer.innerHTML = "";
    carritoContainer.style.display = "flex";
    const carritoHeader = document.createElement("div");
    carritoHeader.className = "carrito-header"
    carritoHeader.innerHTML = `
    <h2 class="carrito-header-h2"> Compra </h2>
    `;
    carritoContainer.append(carritoHeader);
    const carritoButton = document.createElement("h3");
    carritoButton.innerText = "X";
    carritoButton.className = "carrito-button";


    carritoButton.onclick = () => {
        carritoContainer.style.display = "none";
    };


    carritoHeader.append(carritoButton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "carrito-content";
        carritoContent.innerHTML = `
        <img src= "${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <p> Cantidad: ${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p> Total: ${product.cantidad * product.precio}</p>
        <span class="borrar-producto"> ❌ </span>
        `;
        carritoContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");
        
        restar.addEventListener("click",() => {
            if(product,cantidad !== 1) {
                product.cantidad -1;
            }
            savelocal();
            controlCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        
        sumar.addEventListener("click", () => {
            product.cantidad++;
            savelocal();
            controlCarrito();
        });

        let eliminar = carritoContent.querySelector(".borrar-producto");

        eliminar.addEventListener("click", () =>{
            eliminarProducto(product.id);
            Swal.fire("Eliminaste el producto del Carrito!");
        })

    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const comprarTotal = document.createElement("div");
    comprarTotal.className ="compra-total";
    comprarTotal.innerHTML = `Comprar total: ${total} $`;
    carritoContainer.append(comprarTotal);
};
verCarrito.addEventListener("click",controlCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
    console.log(foundId);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    savelocal();
    controlCarrito(); 
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();
};
getProducts();



