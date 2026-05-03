// =====================
// SPA NAVIGATION
// =====================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const target = link.dataset.section;

        // Update sections
        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(target).classList.add('active');

        // Update nav link highlight
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`[data-section="${target}"]`)
                .forEach(l => l.classList.add('active'));
    });
});

// =====================
// CONTACT FORM
// =====================
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    status.style.display = 'block';
    status.style.color = 'var(--text-muted)';
    status.textContent = 'sending...';

    try {
        const res = await fetch('https://formspree.io/f/xlgzjrpy', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            status.style.color = 'var(--green)';
            status.textContent = '// message sent successfully';
            form.reset();
        } else {
            throw new Error();
        }
    } catch {
        status.style.color = '#f78166';
        status.textContent = '// something went wrong — try emailing directly';
    }
});