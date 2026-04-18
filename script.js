const jsonPath = window.location.pathname.includes('/my-ecom-store-v2') 
                 ? '/my-ecom-store-v2/products.json' 
                 : 'products.json';

fetch(jsonPath + '?v=' + new Date().getTime())
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('product-container');
        if (container) {
            container.innerHTML = products.map(product => `
                <div class="product-card bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="relative h-64 overflow-hidden rounded-[2rem] mb-6">
                            <img src="${product.image}" 
                                 alt="${product.name}" 
                                 class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                 onerror="this.src='https://via.placeholder.com/400x300?text=Digital+Asset'">
                        </div>
                        <span class="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] px-2">${product.category || 'PREMIUM'}</span>
                        <h2 class="text-2xl font-bold text-slate-900 mt-2 px-2 leading-tight">${product.name}</h2>
                        <p class="text-slate-500 mt-3 px-2 text-sm leading-relaxed">${product.description}</p>
                    </div>

                    <div class="mt-8 flex justify-between items-center px-2">
                        <span class="text-3xl font-black text-slate-900">$${product.price}</span>
                        <button class="snipcart-add-item bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                            data-item-id="${product.id}"
                            data-item-price="${product.price}"
                            data-item-url="${window.location.href}" 
                            data-item-name="${product.name}"
                            data-item-image="${product.image}">
                            Buy Now
                        </button>
                    </div>
                </div>
            `).join('');
        }
    })
    .catch(err => console.error("Error:", err));
