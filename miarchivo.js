            class bebida{
                constructor(id, nombre, precio, img){
                this.id = id;
                this.nombre = nombre;
                this.precio = precio;
                this.img = img;
                this.cantidad = 1;
                }
        }

        const fernet = new bebida(1, "Fernet Branca", 2000, "img/fernet.jpg");
        const sidra = new bebida(2, "Sidra 1888", 1500,"img/1888.jpg");
        const cerveza = new bebida(3, "Cerveza Andes", 600, "img/andes.webp");
        const gin = new bebida(4, "Gin Bombay", 3200, "img/gin.jpg");
        const vino = new bebida(5, "Vino Dadá", 1100, "img/dada.jpg");
        const wisky = new bebida(6, "Wisky Jack Daniels", 3200, "img/wisky.jpg");
        const vodka = new bebida(7, "Vodka Sky", 4000,"img/vodka.jpg");
        const cinzano = new bebida(8, "Cinzano", 2000, "img/ccinzano.jpg");
        const campari = new bebida(9, "Campari", 3100,"img/campari.jpg");
        const hielo = new bebida(10, "Bolsa de hielo", 500, "img/hielo.webp"); 



        const productos = [fernet, sidra, cerveza, gin, vino, wisky, vodka, cinzano, campari, hielo];

        console.log(productos);
        
        //
        let carrito = [];

        //

        if(localStorage.getItem("carrito")){
          carrito = JSON.parse(localStorage.getItem("carrito"));
        }

        //
        const contenedor = document.getElementById("contenedor");

        const mostrarProductos = () => {
        productos.forEach(bebida => {
          const card = document.createElement("div");
          card.innerHTML = `<div class="card-deck">
          <div class="card">
            <img src="${bebida.img}" class="card-img-top" alt="${bebida.nombre}">
            <div class="card-body">
              <h5 class="card-title">"${bebida.nombre}"</h5>
              <p class="card-text">"${bebida.precio}"</p>
              <button class = "btn styleBoton" id="boton${bebida.id}" > Agregar al Carrito </button>
            </div>
            </div>
            </div>
            `
            //
        contenedor.appendChild(card);
        
        //
        const boton = document.getElementById(`boton${bebida.id}`);
        boton.addEventListener("click", () => {
          agregarCarrito(bebida.id);

        })

        })
      }

      mostrarProductos();

      //
      const agregarCarrito = (id) => {
        
        const bebidaEnCarrito = carrito.find(bebida => bebida.id === id);
        if(bebidaEnCarrito) {
          bebidaEnCarrito.cantidad++;
        } else {
          const bebida = productos.find(bebida => bebida.id === id);
          carrito.push(bebida);

        }
        calcularTotal();

        localStorage.setItem("carrito", JSON.stringify(carrito));
      }

      //
      const contenedorCarrito = document.getElementById("contenedorCarrito");
      const verCarrito = document.getElementById("verCarrito");

      //

      verCarrito.addEventListener ("click", () => {
        mostrarCarrito();
      })
      
      
      const mostrarCarrito = () => {
      
      contenedorCarrito.innerHTML = ""; 

        carrito.forEach(bebida => {
          const card = document.createElement("div");
          card.innerHTML = `
          <div class="card-deck">
          <div class="card">
            <img src="${bebida.img}" class="card-img-top" alt="${bebida.nombre}">
            <div class="card-body">
              <h5 class="card-title">"${bebida.nombre}"</h5>
              <p class="card-text">"${bebida.precio}"</p>
              <p class="card-text">"${bebida.cantidad}"</p>
              <button class = "btn styleBoton" id="eliminar${bebida.id}" > Eliminar </button>
            </div>
            </div>
            </div>
            `
            contenedorCarrito.appendChild(card);

            //
            const boton = document.getElementById(`eliminar${bebida.id}`);
            boton.addEventListener("click", () => {
              eliminarCarrito(bebida.id);
            })
        })
        calcularTotal();
      }
      
      //

      const  eliminarCarrito = (id) => {
        const bebida = carrito.find(bebida => bebida.id === id);
        const lista = carrito.indexOf(bebida);
        carrito.splice(lista, 1);
        mostrarCarrito();

        //
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
      

      //

      const total = document.getElementById("total");

      const calcularTotal = () =>{
        let totalCompra = 0;
        carrito.forEach(bebida =>{
        totalCompra += bebida.precio * bebida.cantidad;

      })
        total.innerHTML = `Total: $${totalCompra}`;
      }


      //

      const vaciarCarrito = document.getElementById("vaciarCarrito");

      vaciarCarrito.addEventListener("click", () => {
        eliminarTodo();
      })

      const eliminarTodo = () => {
        carrito = [];
        mostrarCarrito();

        //
        localStorage.clear();
      }
