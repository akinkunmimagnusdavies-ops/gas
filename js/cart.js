let cart = JSON.parse(localStorage.getItem('gas_company_cart')) || [];

function addToCart(name, price) {
  console.log("Adding", name); // debug - remove later
  let existing = cart.find(item => item.name === name);
  if (existing) existing.qty += 1;
  else cart.push({name, price, qty: 1});
  localStorage.setItem('gas_company_cart', JSON.stringify(cart));
  updateCart();
  openCart();
}

function updateCart() {
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!countEl ||!itemsEl ||!totalEl) {
    console.log("Cart DOM not found yet");
    return;
  }
  let totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.innerText = totalCount;
  let total = 0;
  let html = "";
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    html += `<p style="color:#000; display:flex; justify-content:space-between; margin:10px 0;">
      <span>${item.name}</span>
      <span>
        <button onclick="changeQty(${index}, -1)">-</button> ${item.qty} <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="removeItem(${index})" style="margin-left:8px;background:red;color:white;border:none;padding:2px 8px;border-radius:10px;">x</button>
      </span></p>`;
  });
  itemsEl.innerHTML = html || "<p style='color:#888'>Cart empty</p>";
  totalEl.innerText = total.toLocaleString();
}

function changeQty(i, delta){ cart[i].qty += delta; if(cart[i].qty <= 0) cart.splice(i,1); localStorage.setItem('gas_company_cart', JSON.stringify(cart)); updateCart(); }
function removeItem(i){ cart.splice(i,1); localStorage.setItem('gas_company_cart', JSON.stringify(cart)); updateCart(); }
function openCart(){ var p = document.getElementById('cart-popup'); if(p) p.style.display = 'flex'; }
function closeCart(){ var p = document.getElementById('cart-popup'); if(p) p.style.display = 'none'; }

function checkout(){
  if(cart.length === 0) return alert("Cart empty");
  let msg = "Hi GAS COMPANY! I want to order:\n";
  cart.forEach(item => { msg += `- ${item.name} x${item.qty} = ₦${item.price*item.qty}\n`; });
  let total = cart.reduce((s,i)=> s + i.price*i.qty, 0);
  msg += `\nTotal: ₦${total}\nMy address is: `;
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}

// Call immediately, no need to wait
updateCart();