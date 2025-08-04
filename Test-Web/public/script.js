document.addEventListener('DOMContentLoaded', function () {
const buttons = document.querySelectorAll('.checkout-button');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to redirect to checkout.');
      }
    });
  });
});
