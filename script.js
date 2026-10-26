const contactForm = document.getElementById('contactform');
const formNote = document.getElementById('formnote');
const submitButton = document.getElementById('contactsubmit');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Check whether the Formspree ID is still a placeholder
    if (contactForm.action.includes('YOUR_FORM_ID')) {
        formNote.textContent =
            'Please replace YOUR_FORM_ID with your actual Formspree form ID.';
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formNote.textContent = 'Sending your message...';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                Accept: 'application/json'
            }
        });

        if (response.ok) {
            formNote.textContent =
                'Thanks! Your message has been sent successfully.';
            contactForm.reset();
        } else {
            const result = await response.json().catch(() => ({}));

            formNote.textContent =
                result.errors?.map(error => error.message).join(', ') ||
                'Sorry, your message could not be sent. Please try again or email aman.sharma2153@gmail.com.';
        }
    } catch (error) {
        formNote.textContent =
            'Network error. Please try again or email aman.sharma2153@gmail.com.';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send message ↗';
    }
})