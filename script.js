const jsonPath = window.location.pathname.includes('/my-ecom-store-v2') 
                 ? '/my-ecom-store-v2/products.json' 
                 : 'products.json';

fetch(jsonPath + '?v=' + new Date().getTime())
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('product-container');
        if (container) {
            container.innerHTML = products.map((product, index) => `
                <div class="product-card group bg-white rounded-[2rem] overflow-hidden border border-slate-100 p-4 flex flex-col justify-between" 
                     style="animation: fadeInUp 0.5s ease forwards ${index * 0.1}s; opacity: 0;">
                    
                    <div class="relative overflow-hidden rounded-[1.5rem]">
                        <img src="${product.image}" 
                             alt="${product.name}" 
                             class="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                             onerror="this.src='https://via.placeholder.com/400x300?text=Digital+Asset'">
                        <div class="absolute top-4 left-4">
                            <span class="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                ${product.category || 'Premium'}
                            </span>
                        </div>
                    </div>

                    <div class="mt-6 px-2">
                        <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                            ${product.name}
                        </h2>
                        <p class="text-slate-500 mt-2 text-sm leading-relaxed">
                            ${product.description}
                        </p>
                    </div>

                    <div class="mt-8 px-2 pb-2 flex justify-between items-center">
                        <div>
                            <span class="text-xs text-slate-400 block font-semibold uppercase">Price</span>
                            <span class="text-2xl font-black text-slate-900">$${product.price}</span>
                        </div>
                        
                        <button class="snipcart-add-item bg-blue-600 hover:bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-none"
                            data-item-id="${product.id}"
                            data-item-price="${product.price}"
                            data-item-url="${window.location.href}" 
                            data-item-name="${product.name}"
                            data-item-image="${product.image}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    });

// CSS Animation එක එකතු කිරීම
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
