// En checkout.html
const reservationUnavailableTitle = 'Reservas temporalmente cerradas';
const reservationUnavailableMessage = 'En este momento no estamos tomando nuevas reservas.';

function showReservationUnavailableMessage() {
    const modalElement = document.getElementById('responseModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
        showModal(reservationUnavailableTitle, reservationUnavailableMessage);
        return;
    }

    alert(reservationUnavailableMessage);
}

document.addEventListener('DOMContentLoaded', function () {
    // Recuperar el contenido del plan seleccionado
    const selectedPlanContent = localStorage.getItem('selectedPlan');

    if (selectedPlanContent) {
        // Insertar el contenido en el pricing card de checkout
        const checkoutPricingCard = document.querySelector('.pricing-card');
        checkoutPricingCard.innerHTML = selectedPlanContent;

        // Asegurarse de que no haya botones en el pricing card
        const buttons = checkoutPricingCard.querySelectorAll('button');
        buttons.forEach(button => button.remove());

        // Limpiar localStorage después de usar la información
        localStorage.removeItem('selectedPlan');
    }
});

// :d para enviar el mail de reserva
function sendReservationEmail(event) {
    event.preventDefault();

    showReservationUnavailableMessage();

    return false;
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