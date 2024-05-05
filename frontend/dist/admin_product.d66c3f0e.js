//Hàm cấu hình định dạng tiền tệ kiểu VND
function formatCurrency(amount) {
    const parts = amount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}
async function ab() {
    alert("Hello");
}
async function admin_render_product() {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".admin_show_product");
        // Kiểm tra render có tồn tại và không null
        if (!render) return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            html += ` <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            #
                        </th>
                        <td class="px-6 py-4">
                            <img src="http://localhost:3000/images/${item.image_pr.image_pr_1}" class="w-20 h-20 object-cover" alt="">
                        </td>
                        <td class="px-6 py-4">
                            ${item.name_pr}
                        </td>
                        <td class="px-6 py-4">
                            ${formatCurrency(item.price_pr)}
                        </td>
                        <td class="px-6 py-4">
                            ${item.category_pr.category_pr_tag}
                        </td>
                        <td class="px-6 py-4">
                            x${item.quantity_pr}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div>
                                <button onclick="ab()">
                                    <kbd
                                        class="px-2 py-1.5 text-xs font-semibold text-white bg-red-300 border rounded-lg hover:bg-red-600">X\xf3a</kbd>
                                </button>
                                <a href="">
                                    <kbd
                                        class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-400">S\u{1EED}a
                                    </kbd>
                                </a>
                            </div>
                        </td>
                    </tr>`;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
}
admin_render_product();

//# sourceMappingURL=admin_product.d66c3f0e.js.map
