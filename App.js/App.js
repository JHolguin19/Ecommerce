const bar = document.getElementById('bar');

const nav =  document.getElementById('navbar');

const close = document.getElementById('close')

if (bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active')
    })
}

if (close){
    close.addEventListener('click', ()=>{
        nav.classList.remove('active')
    })
}



const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

// Logica Carrito de Compra //

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

// Lista de todos los contenedores de productos

const productsList = document.getElementById("product1")

// Variable arreglo productos

let allProducts = []



productsList.addEventListener('click', e => {
    if(e.target.classList.contains('añadircarrito')){
       const p- = e.target.parentElement

       const infoProducto = {
        quantity: 1,
        title: product.querySelector('h5').textContent,
        price: product.querySelector('h4').textContent,
       }

       allProducts = [...allProducts, infoProducto]
       
    }
    console.log(allProducts)
})

// Funcion para mostrar html

    const showHTML = () => {
        allProducts.forEach(product => {
            const containerProduct = document.createElement('div')
            containerProduct.classList.add('cart-product')
            
            containerProduct.innerHTML =
            
            `<div class="info-cart-product">
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
        </svg>`

        rowProduct.append(containerProduct)
        });
    };