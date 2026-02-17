document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const siBtn = document.getElementById('si-btn');
    const proposalCard = document.getElementById('proposal-card');
    const letterContainer = document.getElementById('letter-container');
    const closeLetter = document.getElementById('close-letter');
    const heartsContainer = document.getElementById('hearts-container');

    // 1. Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heart.style.opacity = Math.random();
        heart.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem';
        
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    

    setInterval(createHeart, 300);

    // 2. "No" button dodging logic
    const moveNoBtn = () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    };

    noBtn.addEventListener('mouseover', moveNoBtn);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent accidental click
        moveNoBtn();
    });

    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const cursorTrail = document.getElementById('cursor-trail');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // View Navigation Logic
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const bookContainer = document.getElementById('book-container');
    const view1 = document.getElementById('view-1');
    const view2 = document.getElementById('view-2');
    const view3 = document.getElementById('view-3');
    const navArrowsList = document.querySelectorAll('.nav-arrows');

    function updateNav(view) {
        // Remove all view classes
        bookContainer.classList.remove('show-view-1', 'show-view-2', 'show-view-3');
        view1.classList.remove('active');
        view2.classList.remove('active');
        view3.classList.remove('active');

        // Add active classes
        bookContainer.classList.add(`show-view-${view}`);
        const activeView = document.getElementById(`view-${view}`);
        activeView.classList.add('active');
    }

    // View 1 Arrows
    const v1Prev = view1.querySelector('.prev-btn');
    const v1Next = view1.querySelector('.next-btn');
    v1Prev.addEventListener('click', () => updateNav(3));
    v1Next.addEventListener('click', () => updateNav(2));

    // View 2 Arrows
    const v2Prev = view2.querySelector('.prev-btn');
    v2Prev.addEventListener('click', () => updateNav(1));

    // View 3 Arrows
    const v3Next = view3.querySelector('.next-btn');
    v3Next.addEventListener('click', () => updateNav(1));

    // 0. Cursor Trail Logic
    let lastMousePosition = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
        const distance = Math.hypot(e.clientX - lastMousePosition.x, e.clientY - lastMousePosition.y);
        
        if (distance > 20) { // Only create if mouse moved enough
            createTrailHeart(e.clientX, e.clientY);
            lastMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    function createTrailHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('trail-particle');
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        // Random drift
        const driftX = (Math.random() - 0.5) * 40;
        const driftY = (Math.random() - 0.5) * 40;
        heart.style.setProperty('--drift-x', `${driftX}px`);
        heart.style.setProperty('--drift-y', `${driftY}px`);
        
        cursorTrail.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    // 3. "Si" button click
    siBtn.addEventListener('click', () => {
        proposalCard.style.transform = 'scale(0.8)';
        proposalCard.style.opacity = '0';
        
        setTimeout(() => {
            proposalCard.classList.add('hidden');
            envelopeWrapper.classList.remove('hidden');
            // Force reflow
            envelopeWrapper.offsetHeight;
            envelopeWrapper.classList.add('visible');
            
            // Sequence the opening
            setTimeout(() => {
                envelopeWrapper.classList.add('open');
                // Show all navigation arrows after opening
                navArrowsList.forEach(nav => nav.classList.remove('hidden'));
            }, 600);
        }, 500);
        
        // Extra celebration hearts
        for(let i=0; i<50; i++) {
            setTimeout(createHeart, i * 50);
        }
    });

    // 5. Close letter
    closeLetter.addEventListener('click', () => {
        envelopeWrapper.classList.remove('open');
        navArrowsList.forEach(nav => nav.classList.add('hidden'));
        
        setTimeout(() => {
            envelopeWrapper.classList.remove('visible');
            setTimeout(() => {
                envelopeWrapper.classList.add('hidden');
                proposalCard.classList.remove('hidden');
                // Force reflow
                proposalCard.offsetHeight;
                proposalCard.style.transform = 'scale(1)';
                proposalCard.style.opacity = '1';
                
                // Reset to first view for next time
                updateNav(1);
            }, 500);
        }, 1000);
    });
});
