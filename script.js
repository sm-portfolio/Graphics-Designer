document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const mainContent = document.getElementById('main-content');
    const loader = document.getElementById('loader');

    // Mock data for photos. In a real app, this would come from an API.
    const photoData = [
        { src: 'photo1.png', title: 'Mission Thumbnail Design for example', date: '12-Jun-2025' },
        { src: 'photo2.png', title: 'Grow Thumbnail  Design for example', date: '12-Jun-2025' },
        { src: 'photo3.png', title: 'Oceanic Hues', date: 'Aug 02, 2023' },
        { src: 'photo4.png', title: 'Mountain Majesty', date: 'Jul 21, 2023' },
        { src: 'photo5.png', title: 'City at Dusk', date: 'Jun 11, 2023' },
        { src: 'photo6.png', title: 'Abstract Geometry', date: 'May 30, 2023' },
        { src: 'photo7.png', title: 'Extra photo 1', date: 'jun 1, 2023' },
        { src: 'photo8.png', title: 'Extra photo 2', date: 'Sep 10, 2023' },
        { src: 'photo9.png', title: 'Extra photo 3', date: 'may 10, 2023' },
        { src: 'photo10.png', title: 'Extra photo 4', date: 'july 10, 2023' },
        { src: 'photo11.png', title: 'Extra photo 5', date: 'july 28, 2023' },
        { src: 'photo12.png', title: 'Extra photo 6', date: 'aug 10, 2023' },
        { src: 'photo13.png', title: 'Extra photo 7', date: 'aug 15, 2024' },
        { src: 'photo14.png', title: 'Extra photo 8', date: 'sep 15, 2023' },
    ];
    
    let photosLoaded = 0;
    const photosPerLoad = 2;
    let isLoading = false;

    // Function to create a photo element
    function createPhotoElement(photo) {
        const item = document.createElement('div');
        item.className = 'photo-item';
        
        item.innerHTML = `
            <div class="image-container">
                <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            </div>
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.date}</p>
            </div>
        `;

        item.addEventListener('click', () => openLightbox(photo));
        return item;
    }

    // Function to load photos into the gallery
    function loadPhotos() {
        if (isLoading) return;
        isLoading = true;
        if (loader) loader.classList.remove('hidden');

        // Simulate a network delay
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            // In a real infinite scroll, you'd fetch new data.
            // Here, we'll just cycle through the mock data.
            for (let i = 0; i < photosPerLoad; i++) {
                const photoIndex = (photosLoaded + i) % photoData.length;
                const newPhoto = createPhotoElement(photoData[photoIndex]);
                fragment.appendChild(newPhoto);
            }
            gallery.appendChild(fragment);
            photosLoaded += photosPerLoad;
            if (loader) loader.classList.add('hidden');
            isLoading = false;
        }, 1000);
    }

    // Lightbox functions
    function openLightbox(photo) {
        if (!lightbox) return;
        mainContent.classList.add('blurred');
        lightboxImg.src = photo.src;
        lightboxCaption.textContent = `${photo.title} - ${photo.date}`;
        lightbox.classList.add('show');
    }

    function closeLightbox() {
        if (!lightbox) return;
        mainContent.classList.remove('blurred');
        lightbox.classList.remove('show');
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Infinite scroll with Intersection Observer - only for gallery page
    if (gallery) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadPhotos();
            }
        }, { rootMargin: '0px 0px 300px 0px' }); // Trigger when 300px from bottom

        if (loader) {
            observer.observe(loader);
        }
        
        // Initial load is now triggered by the observer
    }
});



// টাইপিং টেক্সট এফেক্ট
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Thumbnail", "Typography", "Logo", "Social media poster",  "Marketing Poster",];
const typingDelay = 100;
const erasingDelay = 70;
const newTextDelay = 1500; // 1.5s delay before typing new word
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (textArray.length) setTimeout(type, newTextDelay);
});








function copyNumber() {
    const number = document.getElementById("whatsapp-number").textContent;
    navigator.clipboard.writeText(number).then(() => {
        const toast = document.getElementById("toast");
        toast.style.visibility = "visible";
        toast.style.opacity = 1;
        toast.style.transition = "opacity 0.5s";

        setTimeout(() => {
            toast.style.opacity = 0;
            toast.style.transition = "opacity 0.5s";
            setTimeout(() => {
                toast.style.visibility = "hidden";
            }, 500);
        }, 2000);
    }).catch(err => {
        alert("Failed to copy number: " + err);
    });
}
