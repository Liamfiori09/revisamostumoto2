document.addEventListener('DOMContentLoaded', function() {
    // Array de URLs de Instagram
    const instagramPosts = [
        'https://www.instagram.com/p/DGTo5bJt3fr/',
        'https://www.instagram.com/p/DFYWPpMNDgC/',
        'https://www.instagram.com/p/DFODL6gt_Xt/',
        'https://www.instagram.com/p/DDxhjpWMA1E/',
        'https://www.instagram.com/p/DDsRKqRNF_v/',
        'https://www.instagram.com/p/DFsPisggQuA/'
    ];

    const carouselInner = document.querySelector('#instagramReelsCarousel .carousel-inner');

    // Función para crear un blockquote de Instagram
    function createInstagramEmbed(url) {
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'instagram-media';
        blockquote.setAttribute('data-instgrm-permalink', url);
        return blockquote;
    }

    // Función para ocultar el contenido del iframe
    function hideIframeContent(iframe) {
        if (!iframe || !iframe.contentDocument) return;
        
        try {
            // Crear o actualizar el estilo en el iframe
            let style = iframe.contentDocument.getElementById('hideContent');
            if (!style) {
                style = iframe.contentDocument.createElement('style');
                style.id = 'hideContent';
                iframe.contentDocument.head.appendChild(style);
            }
            style.textContent = `
                video, audio { 
                    display: none !important; 
                    visibility: hidden !important;
                    opacity: 0 !important;
                }
                .VideoSpinner, ._aacl { 
                    display: none !important; 
                }
            `;
        } catch (e) {
            console.log('Error al ocultar contenido:', e);
        }
    }

    // Función para mostrar el contenido del iframe
    function showIframeContent(iframe) {
        if (!iframe || !iframe.contentDocument) return;
        
        try {
            const style = iframe.contentDocument.getElementById('hideContent');
            if (style) {
                style.textContent = '';
            }
        } catch (e) {
            console.log('Error al mostrar contenido:', e);
        }
    }

    // Función para manejar los iframes
    function handleIframes(direction) {
        const iframes = document.querySelectorAll('iframe.instagram-media-rendered');
        const activeSlide = document.querySelector('.carousel-item.active');
        
        iframes.forEach(iframe => {
            const slide = iframe.closest('.carousel-item');
            if (slide === activeSlide) {
                showIframeContent(iframe);
            } else {
                hideIframeContent(iframe);
            }
        });
    }

    // Crear los slides individuales
    instagramPosts.forEach((post, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
        
        const clickWrapper = document.createElement('div');
        clickWrapper.className = 'instagram-embed-clickable';
        clickWrapper.appendChild(createInstagramEmbed(post));
        
        carouselItem.appendChild(clickWrapper);
        carouselInner.appendChild(carouselItem);
    });

    // Inicializar el carousel
    const carouselElement = document.getElementById('instagramReelsCarousel');
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: false,
        ride: false,
        wrap: true
    });

    // Evento antes del cambio de slide
    carouselElement.addEventListener('slide.bs.carousel', function(e) {
        handleIframes(e.direction);
    });

    // Evento después del cambio de slide
    carouselElement.addEventListener('slid.bs.carousel', function(e) {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
        setTimeout(() => handleIframes(e.direction), 100);
    });

    // Manejar clicks en los embeds
    carouselElement.addEventListener('click', function(e) {
        const clickable = e.target.closest('.instagram-embed-clickable');
        if (clickable) {
            const item = clickable.closest('.carousel-item');
            if (!item.classList.contains('active')) {
                e.preventDefault();
                e.stopPropagation();
                const itemIndex = Array.from(carouselInner.children).indexOf(item);
                carousel.to(itemIndex);
            }
        }
    });

    // Procesar embed inicial y configurar el primer slide
    if (window.instgrm) {
        window.instgrm.Embeds.process();
        // Esperar a que se cargue el primer embed
        setTimeout(() => {
            const firstIframe = document.querySelector('iframe.instagram-media-rendered');
            if (firstIframe) {
                showIframeContent(firstIframe);
            }
        }, 1000);
    }
});