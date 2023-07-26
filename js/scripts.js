const homeurl = window.location.href.split("#")[0] + "#"; // Dynamic root path based on the current URL
const rooturl = "http://sdwebau.shopainternal.com.s3-website-ap-southeast-2.amazonaws.com/json/";

const indexFile = "http://sdwebau.shopainternal.com.s3-website-ap-southeast-2.amazonaws.com/json/aaa_productlist.json";

let currentDataIndex = 0;



async function fetchData() {
  try {
    const response = await fetch(indexFile);
    const dataArray = await response.json();

    // Render the data on the HTML page
    const resultContainer = document.getElementById('resultContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');



// Function to render the data of the current object
function renderCurrentData() {
  const data = dataArray[currentDataIndex];
  const productName = data.ProductName;


  fetch(`${rooturl}${productName}.json`)
    .then(response => response.json())
    .then(detailsData => {

      const setCtas = getCTA(detailsData);
      const setLocations = getLocation(detailsData);

      const setContacts = getContacts(detailsData);
      // Create HTML elements to display the nested fetch response
      const nestedDataDiv = document.createElement('div');

      function addPropertyIfExists(property, template) {
        if (property !== null) {
          return template;
        }
        return '';
      }
      nestedDataDiv.innerHTML = `

                                  <!-- /.first row start  -->
                                  <div class="row  shadow-lg m-5 py-2  bg-white"> 
                                          <div class=" row  py-2   ">  
                                          <div class="col-lg-4 ">
                                              <img src="#" class="img-fluid rounded m-3" alt="${detailsData.Headline} with ${detailsData.Advertiser}">
                                          </div>
                                      
                                          <div class="col-lg-8">
                                              <div class="card-body m-3  ">
                                              <h1 class="card-title">${detailsData.Headline}</h1>
                                              <h5 class="card-title">${detailsData.Advertiser}</h5>
                                             <!-- <p class="card-text pt-3"><i class="fas fa-fw fa-tag"></i> ${detailsData.Saving}</p> -->
                                              ${setLocations}
                                              ${addPropertyIfExists(detailsData.ValidUntil,
                                              `<p class="card-text mt-3"><i class="far fa-fw fa-clock"></i> ${detailsData.ValidUntil}</p> `)}
                                              ${setCtas}
        
                                              <div class="d-flex justify-content-between">
                                              <div><a class=" mt-3 btn btn-outline-light text-dark " href="#"><i class="fa fa-fw fa-print"></i> Print Offer</a> </div>
                                              <div class="pt-4"><span class="m-4" ><i class="far fa-fw fa-heart"></i></span></div>
                                            </div> 
                                              
                                                  
                                              </div>
                                          </div>
                              
                                          </div>  
                              
                                  <!-- /.first row end -->
                              
                                  <!-- /.inner nav -->
                              
                                  <nav class="navbar navbar-expand-lg navbar-light navbar-collapse ">
                                          <div class="container-fluid border-top border-bottom py-2 px-5">
                                      <span class="navbar-text fw-bold ">
                                      Navigate to:
                                  </span>
                                      
                                      <div class="collapse navbar-collapse" >
                                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                          <li class="nav-item">
                                          <a class="nav-link fw-bold " href="#offerDetails">Offer Details</a>
                                          </li>
                                          <li class="nav-item">
                                          <a class="nav-link fw-bold" href="#aboutAdvertiser">About ${detailsData.Advertiser} </a>
                                          </li>
                              
                                          <li class="nav-item">
                                          <a class="nav-link fw-bold" href="#contact"> Contact </a>
                                          </li>
                              
                                          <li class="nav-item">
                                          <a class="nav-link fw-bold" href="#terms"> Terms & Conditions </a>
                                          </li>
                                                  
                                      </ul>
                                      <div class="d-flex">
                              
                                          <span class="pt-2 fw-bold">Share this offer:</span>
                                      <div class="btn-group" role="group" aria-label="Share buttons">
                                      
                                      <a href="#" class="btn btn-outline-light text-dark " target="_blank" rel="noopener noreferrer">
                                          <i class="fab fa-facebook-f"></i> 
                                      </a>
                                      <a href="#" class="btn btn-outline-light text-dark" target="_blank" rel="noopener noreferrer">
                                          <i class="fab fa-twitter"></i>
                                      </a>
                                      <a href="#" class="btn btn-outline-light text-dark">
                                          <i class="fas fa-envelope"></i> 
                                      </a>
                                      </div>
                              
                                          
                                      </div>
                                      </div>
                                  </div>
                              </nav>
                              
                              <!-- /.inner nav end -->
                              
                              
                              <!-- /.offer detail start  -->
                              
                              <div class="row m-2 pt-2 border-bottom " id="offerDetails" >
                              <h4 class="text-danger" >Offer Details</h4>
                                  <div class="ms-3"> ${detailsData.Detail} </div>
                              
                                 
                              </div>
                              
                              <!-- /.offer detail end  -->
                              
                              <!-- / About  start  -->

                              
                              ${addPropertyIfExists(detailsData.About,

                              `<div class="row m-2 pt-2 border-bottom " id="offerDetails" >
                              
                                 <h4 class="text-danger" id="aboutAdvertiser">About ${detailsData.Advertiser}</h4>
                                 
                                  <div class="ms-3 pb-4"> ${detailsData.About} </div>
                              
                                 
                              </div> `)}
                              
                              <!-- / About  end  -->
                              
                              <!-- / Contact Details start  -->
                              
                              <div class="row m-2 pt-2 border-bottom " id="contact" >
                              
                                 <h4 class="text-danger" id="aboutAdvertiser">Contact Details</h4>
                                 <span>Click address to view on Google Maps.</span>
                                 <div class="ms-3 pb-4"> Contacts ${setContacts} </div>
                              
                                 
                              </div>
                              
                              <!-- /Contact Details  end  -->
                              
                              
                              
                              
                              <!-- /  Terms & Conditions  start  -->

                              ${addPropertyIfExists(detailsData.Terms,
                              
                              `<div class="row m-2 pt-2  " id="offerDetails" >
                              
                                 <h4 class="text-danger" id="terms"> ${detailsData.Advertiser} Terms & Conditions</h4>
                                 <div class="ms-3 pb-4"> ${detailsData.Terms} </div>
                              
                                 
                              </div> `)}
                              
                              <!-- / Terms & Conditions  end  -->
                                                          
                                                            
                                  
                              </div>


                                  `;

      
      resultContainer.innerHTML = '';
      resultContainer.appendChild(nestedDataDiv);
    })


    .catch(error => {
      console.error('Error occurred in nested fetch:', error);
    });



    

    window.location.hash = data.ProductName;

}

// Initial rendering
renderCurrentData();

// Previous button click event
prevBtn.addEventListener('click', () => {
  if (currentDataIndex > 0) {
    currentDataIndex--;
    renderCurrentData();
  }
});

// Next button click event
nextBtn.addEventListener('click', () => {
  if (currentDataIndex < dataArray.length - 1) {
    currentDataIndex++;
    renderCurrentData();
  }
});
}  catch (error) {
    console.error('Error occurred in first fetch:', error);
  }
}

//  function  Call the to fetch  the data on the page
fetchData();




function getCTA(detailsData) {
  return detailsData.Ctas
    .map((cta) => {
      if (cta.Type === "Phone") {
        return `<a class="btn btn-danger me-2 joinbtn" href="tel:${cta.Link}"><i class="fas fa-fw fa-phone-alt"></i> ${cta.Text}</a>`;
      } else if (cta.Type === "Email") {
        return `<a class="btn btn-danger joinbtn" href="mailto:${cta.Link}"><i class="fas fa-fw fa-${cta.Icon}"></i> ${cta.Text}</a>`;
      }
    })
    .join("");
}

function getLocation(detailsData) {
  if (!detailsData.Locations) {
    return '';
  }

  return detailsData.Locations
    .filter(location => location.LocationType === "Address" && location.Address1 !== null)
    .map(
      (location) =>
        `<i class="fas fa-fw fa-map-marker-alt"></i><span>${location.Address1}</span> `
    )
    .join("");
}

function getContacts(detailsData) {
  if (!detailsData.Contacts) {
    return '';
  }

  return detailsData.Contacts
    .map((contact) => {
      return contact.ContactType === "Address"
        ? `<a href="${contact.ContactLink}" target="_blank" class="nav-link"><i class="fas fa-fw fa-map-marker-alt pt-4"></i> ${contact.ContactMethod}</a> <br>`
        : contact.ContactType === "Phone"
        ? `<a href="${contact.ContactLink}" class="nav-link"><i class="fas fa-fw fa-phone-alt "></i> ${contact.ContactMethod}</a> <br>`
        : contact.ContactType === "Web"
        ? `<a href="${contact.ContactLink}" target="_blank"><button type="button" class="btn btn-danger loginbtn "><i class="fas fa-fw fa-globe "></i> ${contact.ContactMethod}</button></a>`
        : "";
    })
    .join("");
}
