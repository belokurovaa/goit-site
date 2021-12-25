const prices = {
    'family': {
        session: 300,
        visash: 200,
        studio: 300,
        photobook: 300,
    },
    'portret': {
        session: 200,
        visash: 100,
        studio: 200,
        photobook: 300,
    },
    'children': {
        session: 300,
        visash: 200,
        studio: 300,
        photobook: 400,
    },
    'event': {
        session: 300,
        visash: 100,
        studio: 0,
        photobook: 500,
    },
};

function getFormValues () {
    const websiteTypeElement = document.querySelector('#project-type');

    const sessionEl = document.querySelector('#session');  
    const studioEl = document.querySelector('#studio'); 
    const visashEl = document.querySelector('#visash'); 
    const photobookEl = document.querySelector('#photobook'); 
    
      
     return {
        websiteType: websiteTypeElement.value,
        session: sessionEl.checked,
        visash: visashEl.checked,
        studio: studioEl.checked,
        photobook: photobookEl.checked,
    }   

}

function calculateWork() {
    
    const values = getFormValues();

    let totalPrice = 0;
    
    const workTypes = prices[values.websiteType];

    if (values.session) {
        totalPrice = workTypes.session;
    }
    if (values.studio) {
        totalPrice = totalPrice + workTypes.studio;
    }

    if (values.visash) {
        totalPrice = totalPrice + workTypes.visash;
    }

    if (values.photobook) {
        totalPrice = totalPrice + workTypes.photobook;
    }
 
const totalPriceEl = document.querySelector('#total-Price');

totalPriceEl.textContent = totalPrice;

   
}        
 

const formEl = document.querySelector('#project-price-form');
const emailModal = document.querySelector('#modal-email');
const succsessModal = document.querySelector('#succsess-modal');


// первый просчет формы
calculateWork()

formEl.addEventListener('change', calculateWork);

formEl.addEventListener('submit', function(event) {
    event.preventDefault();

    emailModal.classList.add('modal-active');

});

const closebuttons = document.querySelectorAll('.close-btn');

closebuttons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {

        const inputContainer = document.querySelector('#email-input-container');

        inputContainer.classList.remove('email-input-container-error');

        emailModal.classList.remove('modal-active');
        succsessModal.classList.remove('modal-active');
    });
})


const modalEmailContainer = document.querySelector('#modal-email-container');

modalEmailContainer.addEventListener('submit', function(event) {
    event.preventDefault();

    const userEemailInput = document.querySelector('#user-email');

    if (userEemailInput.value) {

        const formData = new FormData(formEl);

        formData.append('Email', userEemailInput.value);
        
        fetch('/', {
          method: 'POST',
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: new URLSearchParams(formData).toString()
        })
            .then(function() {
                emailModal.classList.remove('modal-active');
                succsessModal.classList.add('modal-active');
            })
            .catch(() => alert('Не удалось отправить форму'))
     
        return;    
    }

    const inputContainer = document.querySelector('#email-input-container');

    inputContainer.classList.add('email-input-container-error')
});