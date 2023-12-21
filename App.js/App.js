const bar = document.getElementById("bar");

const nav = document.getElementById("navbar");

const close = document.getElementById("close");

const closeCountp = document.querySelector(".count-products");

const listadoproductos = document.querySelector("#productos");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
    closeCountp.classList.add("hidden");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
    closeCountp.classList.remove("hidden");
  });
}
/*Cargar Productos con Promesa y Apis*/
/* Haciendo llamado de api*/




function recuperarp() {
  return new Promise((resolve, reject) => {
    fetch("../JSON/productos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar la Api");
        }

        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

recuperarp("../JSON/productos.json")
  .then((data) => {
    main(data);
  })
  .catch((error) => {
    // Manejar errores
    console.error("Error al obtener datos de la API:", error);
  });

async function main() {
  try {
    const mostrarproductos = await recuperarp();

    mostrarproductos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("pro");
      div.innerHTML = ` 
                    <img src="${producto.imagen}" alt="">
                    <div class="des">
                        <span>${producto.marca}</span>
                        <h5>${producto.nombre}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4 class="price">$${producto.precio}</h4>
                        <button class="normal añadircarrito">Añadir Carrito</button>
                    </div>
                    <a href="#"><i class="fal fa-shopping-cart cart añadircarrito" ></i></a>
                    `;
      listadoproductos.append(div);
    });
  } catch (error) {
    console.error("el error es:", error);
  }
}
const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);

btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

/*Nuevo codigo*/
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");

// Lista de todos los contenedores de productos
const productsList = document.querySelector(".pro-container");

// Variable de arreglos de Productos
let allProducts = JSON.parse(localStorage.getItem("carrito")) || [];

const valorTotal = document.querySelector(".total-pagar");

const countProducts = document.querySelector("#contador-productos");

const cartEmpty = document.querySelector(".cart-empty");
const cartTotal = document.querySelector(".cart-total");

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("añadircarrito")) {
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector("h5").textContent,
      price: product.querySelector("h4").textContent,
    };

    const exits = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (exits) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();
    saveLocal();
  }
});

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;
    localStorage.clear();

    allProducts = allProducts.filter((product) => product.title !== title);

    console.log(allProducts);

    showHTML();
  }
});

// Funcion para mostrar  HTML
const showHTML = () => {
  if (!allProducts.length) {
    cartEmpty.classList.remove("hidden");
    rowProduct.classList.add("hidden");
    cartTotal.classList.add("hidden");
  } else {
    cartEmpty.classList.add("hidden");
    rowProduct.classList.remove("hidden");
    cartTotal.classList.remove("hidden");
  }

  // Limpiar HTML
  rowProduct.innerHTML = "";

  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

    rowProduct.append(containerProduct);

    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducts = totalOfProducts + product.quantity;
    localStorage.setItem("contadorp", JSON.stringify(totalOfProducts));
  });

  valorTotal.innerText = `$${total}`;
  countProducts.innerText = JSON.parse(localStorage.getItem("contadorp"));
};

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(allProducts));
};

window.addEventListener("load", () => {
  allProducts = JSON.parse(localStorage.getItem("carrito")) || [];
  showHTML();
});

