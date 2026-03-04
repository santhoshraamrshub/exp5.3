const output = document.getElementById("output");
async function loadProducts() {
const res = await fetch("/products");
const products = await res.json();
const container = document.getElementById("output");
container.innerHTML = "";
products.forEach(p => {
let variantsHTML = "";
p.variants.forEach(v => {
variantsHTML += `
<li>
${v.color} | $${v.price} | Stock: ${v.stock}
</li>
`;
});
container.innerHTML += `
<div class="product-card">
<h3>${p.name}</h3>
<p class="category">${p.category}</p>
<p class="rating">${p.avgRating}</p>
<ul class="variants">
${variantsHTML}
</ul>
</div>
`;
});
}
async function lowStock(){
const res = await fetch("/low-stock");
const data = await res.json();
output.innerHTML = "<h2>Low Stock Products</h2>";
data.forEach(p=>{
output.innerHTML += `
${p.name} - ${p.variants.color} : Stock ${p.variants.stock}<br>
`;
});
}
async function categoryRatings(){
const res = await fetch("/category-ratings");
const data = await res.json();
output.innerHTML = "<h2>Category Ratings</h2>";
data.forEach(c=>{
output.innerHTML += `
${c._id} : ${c.avgCategoryRating}<br>
`;
});
}