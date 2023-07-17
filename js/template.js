const advertiserData = [{
    "Advertiserimg": "https://prod-shop-a-docket-s3.s3-ap-southeast-2.amazonaws.com/cdn/images/805002.jpg",
    "Headline": "Service Your Car Now!",
    "Advertiser": "SEQ Autocare",
    "Saving": "Save $155.00",
    "Locations": [
        {
            "Location": "Yandina QLD"
        }
    ],
    "Valid": "Valid Until 28 Sep 2023",
    "CTA": [
        {
            "type": "phone",
            "text": "Call Now",
            "icon": "phone",
            "link": "0477737731"
        }
    ],
    "Detail": "<p>General Was $310</p><p>Service Now $155*</p><ul><li>Under vehicle</li><li>Brakes</li><li>Steering</li><li>Oil & filter change (up to 5L)</li></ul><p>Find us on facebook.com/SEQAutocare</p>",
    "About": "<b>SEQ Autocare</b> is a highly recommended workshop for all makes and models. Tyres, Air Conditioning and Safety Certificates are just part of what we do.",
    "Contacts": [
        {
            "contactType": "Address",
            "contactMethod": "Shed 5, 1505 Nambour North Connection Rd Yandina QLD 4561",
            "contactLink": "https://maps.google.com.au/maps?f=d&daddr=Shed%205,%201505%20Nambour%20North%20Connection%20Rd,%20Yandina",
            "contactIcon": "mapPin"
        },
        {
            "contactType": "Phone",
            "contactMethod": "0477 737 371",
            "contactLink": "tel: 04772073720371",
            "contactIcon": "phone"
        },
        {
            "contactType": "Web",
            "contactMethod": "Visit Website",
            "contactLink": "https://www.facebook.com/SEQAutocare",
            "contactIcon": "button"
        }
    ],
    "Terms": "<ul><li>*Some 6-cylinder vehicles, V8 & 4WDs may cost extra</li><li>Not a Log Book Service</li></ul>"
}];

function getLocation(locations) {
    return locations.map(location => `<i class="fas fa-fw fa-map-marker-alt"></i><span>${location.Location}</span> `).join('');
}

function getCTA(ctas) {
    return ctas.map(cta => {
        if (cta.type === 'phone') {
            return `<a class="btn btn-danger me-2 joinbtn" href="tel:${cta.link}"><i class="fas fa-fw fa-${cta.icon}-alt"></i> ${cta.text}</a>`;
        } else if (cta.type === 'email') {
            return `<a class="btn btn-danger joinbtn" href="mailto:${cta.link}"><i class="fas fa-fw fa-${cta.icon}"></i> ${cta.text}</a>`;
        }
    }).join('');
}

function getContacts(contacts) {
    return contacts.map(contact => {
      return contact.contactType === 'Address'
        ? `<a href="${contact.contactLink}" target="_blank" class="nav-link"><i class="fas fa-fw fa-map-marker-alt pt-4"></i> ${contact.contactMethod}</a> <br\>`
        : contact.contactType === 'Phone'
        ? `<a href="${contact.contactLink}" class="nav-link"><i class="fas fa-fw fa-phone-alt "></i> ${contact.contactMethod}</a> <br\> `
        : contact.contactType === 'Web'
        ? `<a href="${contact.contactLink}" target="_blank"><button type="button" class="btn btn-danger loginbtn "><i class="fas fa-fw fa-globe "></i> ${contact.contactMethod}</button></a>`
        : '';
    }).join('');
  }





function adTemplate(advertiser) {
    const setLocations = getLocation(advertiser.Locations);
    const setCTAs = getCTA(advertiser.CTA);
    const setContacts = getContacts(advertiser.Contacts);

    return `
    <!-- /.first row start  -->
    <div class="row  shadow-lg m-5 py-2  bg-white"> 
            <div class=" row  py-2   ">  
            <div class="col-lg-4 ">
                <img src="${advertiser.Advertiserimg}" class="img-fluid rounded m-3" alt=" ${advertiser.Headline} with ${advertiser.Advertiser}">
            </div>
        
            <div class="col-lg-8">
                <div class="card-body m-3  ">
                <h1 class="card-title">${advertiser.Headline}</h1>
                <h5 class="card-title">${advertiser.Advertiser}</h5>
                <p class="card-text pt-3"><i class="fas fa-fw fa-tag"></i> ${advertiser.Saving}</p>
                ${setLocations}
                <p class="card-text mt-3"><i class="far fa-fw fa-clock"></i> ${advertiser.Valid}</p>
                ${setCTAs}
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
            <a class="nav-link fw-bold" href="#aboutAdvertiser">About ${advertiser.Advertiser} </a>
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
    <div class="ms-3"> ${advertiser.Detail} </div>

   
</div>

<!-- /.offer detail end  -->

<!-- / About  start  -->

<div class="row m-2 pt-2 border-bottom " id="offerDetails" >

   <h4 class="text-danger" id="aboutAdvertiser">About ${advertiser.Advertiser}</h4>
   <div class="ms-3 pb-4"> ${advertiser.About} </div>

   
</div>

<!-- / About  end  -->

<!-- / Contact Details start  -->

<div class="row m-2 pt-2 border-bottom " id="contact" >

   <h4 class="text-danger" id="aboutAdvertiser">Contact Details</h4>
   <span>Click address to view on Google Maps.</span>
   <div class="ms-3 pb-4"> ${setContacts} </div>

   
</div>

<!-- /Contact Details  end  -->




<!-- /  Terms & Conditions  start  -->

<div class="row m-2 pt-2  " id="offerDetails" >

   <h4 class="text-danger" id="terms"> ${advertiser.Advertiser} Terms & Conditions</h4>
   <div class="ms-3 pb-4"> ${advertiser.Terms} </div>

   
</div>

<!-- / Terms & Conditions  end  -->




    
</div>
    `;
}

/* Copyright currentYear */

document.getElementById("Advertisetemplate").innerHTML = `${advertiserData.map(adTemplate).join('')}`;


var currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;

/* back to top */

window.addEventListener('scroll', function () {
    var backToTopButton = document.getElementById('backToTopButton');
    backToTopButton.classList.toggle('show', window.scrollY > 50);
  });
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
