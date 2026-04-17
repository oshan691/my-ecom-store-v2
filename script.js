// JSON ෆයිල් එකෙන් ඩේටා ගමු
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const container = document.querySelector('#product-container');
            container.innerHTML = products.map(product => `
                <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6">
                    <img src="${product.image}" class="w-full h-40 object-cover rounded-2xl mb-4">
                    <span class="text-xs font-bold text-blue-600 uppercase">${product.category}</span>
                    <h2 class="text-xl font-bold text-slate-800">${product.name}</h2>
                    <p class="text-sm text-slate-500 mt-2">${product.description}</p>
                    <div class="mt-6 flex justify-between items-center">
                        <span class="text-2xl font-black text-slate-900">$${product.price}</span>
                        <button class="snipcart-add-item bg-slate-900 text-white px-6 py-2 rounded-xl"
                            data-item-id="${product.id}"
                            data-item-price="${product.price}"
                            data-item-url="/"
                            data-item-name="${product.name}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        });

