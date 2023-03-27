//CONSULTAMOS LA API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    const newData = data.map(item => ({
      categoria: item.category,
      descripcion: item.description,
      titulo: item.title,
      precio: item.price,
      imagen: item.image
    }));
    console.log(newData);

    $.each(newData, function (ix, vl) { 
       let items = ``;
       items = `<div class="col-12 col-lg-4">
                    <div class="item">
                        <div class="content-up">
                          <img src="${vl.imagen}">
                          <button class="btn">Añadir al carrito</button>
                        </div>
                        <div class="content-down">
                          <p class="title">${vl.titulo}</p>
                          <p class="desc">${vl.descripcion}</p>
                          <p class="price">$${vl.precio}</p>
                        </div>
                    </div>
                </div>`
       $(".store .row").append(items);         
    });
  })
  .catch(error => console.error(error));