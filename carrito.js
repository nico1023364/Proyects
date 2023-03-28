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
       items = `<div data-jplist-item class="col-12 col-lg-4">
                    <div class="item" id="${ix}">
                        <div class="content-up">
                          <img src="${vl.imagen}">
                          <button class="animate__animated  bton">Añadir al carrito</button>
                          <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" class="animate__animated bton-det">Ver detalle</button>
                        </div>
                        <div class="content-down">
                          <p class="name title">${vl.titulo}</p>
                          <p class="desc">${vl.descripcion}</p>
                          <p class="price">$${vl.precio}</p>
                        </div>
                    </div>
                </div>`
      //INSERTAR CADA ITEM EN EL CONTENEDOR          
       $(".store .row").append(items);  
      });
      //INSERTAR LOS CONTROLES DE PAGINACION DEL JPLIST
      $(".store").append(` <div class="controls">
      <!-- pagination control -->
      <div
      data-jplist-control="pagination"
              data-group="data-group-1"
              data-items-per-page="6"
              data-current-page="0"
              data-name="pagination1">
              <button type="button" data-type="prev"><</button>
              
              <div class="jplist-holder" data-type="pages">
              <button type="button" data-type="page">{pageNumber}</button>
              </div>
              
              <button type="button" data-type="next">></button>
              </div>
                            </div>`);   
                            
      //INSERTAR CONTROLE FIRST
      var container = $(".store .controls-first")   
      let controlsFirst = `<div class="container">
                            <div class="row"
                                data-jplist-control="pagination"
                                data-group="data-group-1"
                                data-items-per-page="6"
                                data-current-page="0"
                                data-name="pagination1">
                                <div class="col-lg-5 input-select">
                                  <!-- items per page select -->
                                  <select data-type="items-per-page">
                                      <option value="6"> 6 por pagina </option>
                                      <option value="9"> 9 por pagina </option>
                                      <option value="12"> 12 por pagina</option>
                                      <option value="0">  Todos </option>
                                  </select>
                                </div>
                                <div class="col-lg-5 input-text">
                                <!-- filter word -->
                                  <input
                                  data-jplist-control="textbox-filter"
                                  data-group="data-group-1"
                                  data-path=".name"
                                  type="text"
                                  value=""
                                  placeholder="Por palabra"
                                  data-name="my-filter-1"
                                  data-clear-btn-id="name-clear-btn"/>
                                </div>
                                <div class="col-lg-2 input-reset">
                                <!-- reset control -->
                                  <div class="btn-reset">
                                      <button data-jplist-control="reset" data-group="data-group-1" data-name="reset" type="button" class="btn btn-primary" id="reset-filters-btn">Limpiar</button>
                                  </div>
        
                                 </div>
                            </div>
                            </div>`          
      container.append(controlsFirst)         
                            
      //AGREGAR ANIMACION AL BOTON DE AÑADIR  
      $(".item").hover(function () {
          // over
          $(".item .content-up .bton" && ".bton-det").addClass("animate__bounceInDown");
        }, function () {
          // out
          $(".item .content-up .bton" && ".bton-det").removeClass("animate__bounceInDown");
        }
      );       
                    
  jplist.init();
 
    $(".item .content-up .bton-det").on("click", function () {
        $('.offcanvas .offcanvas-body .content-modal').remove()
        getInfo($(this).closest(".item").attr('id'), $(".item"))
        console.log($(this).closest(".item").attr('id'));
    });

  
  const getInfo = (id, value) => {
   const container = $("#" + id); // seleccionar el contenedor con el ID dado
  const desc = container.find(".desc").text(); // obtener el texto dentro del contenedor con clase "desc"
  const title = container.find(".title").text(); // obtener el texto dentro del contenedor con clase "title"
  const price = container.find(".price").text(); // obtener el texto dentro del contenedor con clase "price"
  const img = container.find("img").attr("src")
  let canva = `<div class="content-modal row">
                  <div class="col-6">
                  <img src="${img}">
                  </div>
                  <div class="col-6">
                    <p class="desc">${desc}></p>
                    <p class="price">${price}</p>

                  </div>

                </div>`
  //console.log(desc, title, price); // hacer algo con la información obtenida
  $(".offcanvas .offcanvas-title").text(title);
  $(".offcanvas .offcanvas-body").append(canva);
  }
  })
  .catch(error => console.error(error));
