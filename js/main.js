function toggleMenu(){
  var nav = document.getElementById('navLinks');
  if(nav) nav.classList.toggle('active');
}

document.getElementById('year').textContent = new Date().getFullYear();

var navLinks = document.querySelectorAll('.nav-links a');
for(var i=0; i<navLinks.length; i++){
  navLinks[i].addEventListener('click', function(){
    var nav = document.getElementById('navLinks');
    if(nav) nav.classList.remove('active');
  });
}

var cartPopup = document.getElementById('cart-popup');
if(cartPopup){
  cartPopup.addEventListener('click', function(e){
    if(e.target.id === 'cart-popup') closeCart();
  });
}

// FORM
var bookingForm = document.getElementById('bookingForm');
var statusEl = document.getElementById('formStatus');
if(bookingForm){
  bookingForm.addEventListener("submit", async (e) => {
   e.preventDefault();
   var btn = document.getElementById('bookBtn');
   btn.textContent = "Sending..."; btn.disabled = true;
   statusEl.style.display = "block"; statusEl.textContent = "Sending your order...";
   try {
    var data = new FormData(bookingForm);
    var res = await fetch(bookingForm.action, {method:'POST', body:data, headers:{'Accept':'application/json'}});
     if(res.ok){ statusEl.style.color = "green"; statusEl.textContent = "✅ Order sent!"; bookingForm.reset(); }
     else { statusEl.style.color = "red"; statusEl.textContent = "❌ Failed. WhatsApp us"; }
   } catch(err) { statusEl.style.color = "red"; statusEl.textContent = "❌ Network error"; }
   btn.textContent = "Place Order"; btn.disabled = false;
  });
}