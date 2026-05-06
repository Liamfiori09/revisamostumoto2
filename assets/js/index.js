// :d para que cuando apreto en el checkout algo del navbar venga a index y baje directo
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// :d para pasar el pricing al checkout.html
const reservationUnavailableTitle = 'Reservas temporalmente cerradas';
const reservationUnavailableMessage = 'En este momento no estamos tomando nuevas reservas.';
const contactFormTitle = 'Web informativa';
const contactFormMessage = 'Este formulario es solo visual y no envia consultas. Si mas adelante se reactiva, se indicara en la web.';

function showReservationUnavailableMessage() {
    const modalElement = document.getElementById('responseModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
        showModal(reservationUnavailableTitle, reservationUnavailableMessage);
        return;
    }

    alert(reservationUnavailableMessage);
}

function redirectToCheckout(planId) {
    showReservationUnavailableMessage();
}

function redirectToPreRevision() {
    showReservationUnavailableMessage();
}

// Función para actualizar el precio y la etiqueta de cantidad en el modal de pre-revisión
function updatePreRevisionPricing() {
    const quantity = parseInt(document.getElementById('revisionQuantity').value);
    const quantityLabel = document.getElementById('quantityLabel');
    const priceWithDiscount = document.getElementById('priceWithDiscount');
    const priceWithoutDiscount = document.getElementById('priceWithoutDiscount');
    const pricePerUnit = document.getElementById('pricePerUnit');
    
    // Actualizar etiqueta de cantidad
    quantityLabel.textContent = quantity === 1 ? 
        "1 pre-revisión" : 
        `${quantity} pre-revisiones`;
    
    // Precio unitario
    const unitPrice = 29.99;
    // Precio total sin descuento
    const regularPrice = unitPrice * quantity;
    
    // Aplicar descuento según la cantidad
    let discountPercent = 0;
    if (quantity === 2) {
        discountPercent = 5; // 5% de descuento para 2 revisiones
    } else if (quantity >= 3) {
        discountPercent = 10; // 10% de descuento para 3 o más revisiones
    }
    
    // Calcular precio con descuento
    const discountAmount = (regularPrice * discountPercent) / 100;
    const finalPrice = regularPrice - discountAmount;
    
    // Actualizar precios según la cantidad
    if (quantity === 1) {
        priceWithDiscount.textContent = unitPrice.toFixed(2).replace('.', ',') + "€";
        priceWithoutDiscount.classList.add('d-none');
        pricePerUnit.textContent = `Precio por unidad: ${unitPrice.toFixed(2).replace('.', ',')}€`;
    } else {
        // Formatear precios con coma decimal
        priceWithDiscount.textContent = finalPrice.toFixed(2).replace('.', ',') + "€";
        priceWithoutDiscount.textContent = regularPrice.toFixed(2).replace('.', ',') + "€";
        priceWithoutDiscount.classList.remove('d-none');
        const discountedUnitPrice = finalPrice / quantity;
        pricePerUnit.textContent = `Precio por unidad: ${discountedUnitPrice.toFixed(2).replace('.', ',')}€ (${discountPercent}% descuento)`;
    }
}

// Inicializar eventos para el modal de pre-revisión
document.addEventListener('DOMContentLoaded', function() {
    // Evento para cuando cambia la cantidad de pre-revisiones
    const revisionQuantityInput = document.getElementById('revisionQuantity');
    if (revisionQuantityInput) {
        // Prevenir entrada de valores negativos o no numéricos
        revisionQuantityInput.addEventListener('input', function(e) {
            let value = e.target.value;
            
            // Remover caracteres no numéricos
            value = value.replace(/[^0-9]/g, '');
            
            // Permitir valor vacío temporalmente
            if (value !== '') {
                // Asegurar que el valor sea al menos 1
                if (parseInt(value) < 1) {
                    value = '1';
                }
            }
            
            e.target.value = value;
            
            // Solo actualizar precios si hay un valor
            if (value !== '') {
                updatePreRevisionPricing();
            }
        });

        // Validar al perder el foco
        revisionQuantityInput.addEventListener('blur', function(e) {
            let value = e.target.value;
            
            // Si está vacío al perder el foco, poner 1
            if (value === '') {
                value = '1';
                e.target.value = value;
                updatePreRevisionPricing();
            }
        });
    }
    
    // Evento para el botón de confirmar
    const confirmPreRevisionBtn = document.getElementById('confirmPreRevision');
    if (confirmPreRevisionBtn) {
        confirmPreRevisionBtn.addEventListener('click', function() {
            showReservationUnavailableMessage();
        });
    }

    // Evento para cuando se cierra el modal
    const preRevisionModal = document.getElementById('preRevisionModal');
    if (preRevisionModal) {
        preRevisionModal.addEventListener('hidden.bs.modal', function() {
            const quantityInput = document.getElementById('revisionQuantity');
            if (quantityInput) {
                quantityInput.value = '1';
                updatePreRevisionPricing();
            }
        });
    }
});

function showInformativeContactMessage() {
    showModal(contactFormTitle, contactFormMessage);
}

function showLoader() {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');
    loader.classList.add('visible');
}

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.remove('visible');
    loader.classList.add('hidden');
}

function showModal(title, message) {
    const modalElement = document.getElementById('responseModal');
    const modal = new bootstrap.Modal(modalElement);
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modal.show();
}

// Asegúrate de que el modal se inicialice correctamente
document.addEventListener('DOMContentLoaded', function () {
    var myModal = new bootstrap.Modal(document.getElementById('responseModal'), {
        keyboard: false
    });
});
