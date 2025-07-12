document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;
  const header = document.querySelector("header");
  const cartDisplay = document.createElement("div");

  cartDisplay.style.position = "absolute";
  cartDisplay.style.top = "20px";
  cartDisplay.style.right = "20px";
  cartDisplay.style.backgroundColor = "#fff";
  cartDisplay.style.padding = "8px 16px";
  cartDisplay.style.borderRadius = "5px";
  cartDisplay.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  cartDisplay.style.color = "black";
  cartDisplay.style.fontWeight = "bold";
  cartDisplay.innerText = `🛒 Cart: ${cartCount}`;
  header.appendChild(cartDisplay);

  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const btn = document.createElement("button");
    btn.innerText = "Buy Now";
    btn.style.marginTop = "10px";
    btn.style.padding = "8px 12px";
    btn.style.backgroundColor = "#28a745";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      cartCount++;
      cartDisplay.innerText = `🛒 Cart: ${cartCount}`;

      const productName = product.querySelector("h3").innerText;
      const price = product.querySelector(".price").innerText.replace("₹", "").trim();
      const quantity = 1;

      fetch("submit_order.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `product=${encodeURIComponent(productName)}&price=${price}&quantity=${quantity}`
      })
      .then(res => res.text())
      .then(data => alert(data))
      .catch(err => console.error("Order failed", err));
    });

    product.appendChild(btn);
  });
});
