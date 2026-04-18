// JSON ෆයිල් එකෙන් ඩේටා ගමු (Cache නොවී හැමවෙලේම අලුත් එක ගන්න විදියට)
fetch('products.json?v=' + new Date().getTime())
    .then(response => {
        if (!response.ok) {
            throw new Error("JSON file එක හොයාගන්න බැහැ!");
        }
        return response.json();
    })
    .then(products => {
        const container = document.getElementById('product-container');
        
        if (container) {
            // පරණ දේවල් මකලා අලුත් කාඩ් ටික දාමු
            container.innerHTML = products.map(product => `
                <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
                    <div>
                        <img src="${product.image}" 
                             alt="${product.name}" 
                             class="w-full h-48 object-cover rounded-2xl mb-4"
                             onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
                        
                        <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">
                            ${product.category || 'Digital Asset'}
                        </span>
                        
                        <h2 class="text-xl font-bold text-slate-800 mt-1">${product.name}</h2>
                        
                        <p class="text-sm text-slate-500 mt-2 line-clamp-2">
                            ${product.description}
                        </p>
                    </div>

                    <div class="mt-6 flex justify-between items-center">
                        <span class="text-2xl font-black text-slate-900">$${product.price}</span>
                        
                        <button class="snipcart-add-item bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-slate-800 transition-colors font-bold"
                            data-item-id="${product.id}"
                            data-item-price="${product.price}"
                            data-item-url="/" 
                            data-item-name="${product.name}"
                            data-item-description="${product.description}"
                            data-item-image="${product.image}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }
    })
    .catch(err => {
        console.error("Error loading products:", err);
        const container = document.getElementById('product-container');
        if(container) {
            container.innerHTML = `<p class="text-red-500 text-center col-span-full">කණගාටුයි, නිෂ්පාදන ලැයිස්තුව ලෝඩ් කිරීමට නොහැකි විය. (Error: ${err.message})</p>`;
        }
    });
