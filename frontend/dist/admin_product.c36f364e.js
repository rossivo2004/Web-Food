//Hàm cấu hình định dạng tiền tệ kiểu VND
function formatCurrency(amount) {
    const parts = amount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}
// Home show sản phẩm nổi bật
const home_show_productsHot = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/products/productsHot");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".home_product__hot-show");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // Kiểm tra nếu discount_pr không phải là 0 thì hiển thị sale-box
            const saleBoxHtml = item.discount_pr !== 0 ? `<div
                            class="sale-box bg-yellow-300 absolute top-2 left-2 h-6 w-[70px] pl-1 overflow-hidden text-black">
                            - ${item.discount_pr}%
                        </div>` : "";
            let priceNew = item.price_pr - item.price_pr * item.discount_pr / 100;
            html += `      
                <div>
                    <a href="product_detail.html?id=${item._id}"
                        class="shadow-2xl w-full lg:h-[380px] h-[280px] lg:p-5 p-2 rounded-lg flex flex-col justify-between relative overflow-hidden border-2 border-transparent hover:border-primary hover:border-2 hover:cursor-pointer">
                        <div class="flex justify-center">
                            <img class="lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] object-cover text-center rounded-lg"
                                src="http://localhost:3000/images/${item.image_pr.image_pr_1}"
                                alt="">
                        </div>

                        <div>
                            <div class="home_productBox__category text-sm  pt-2 text-primary font-bold lg:text-sm ">
                                ${item.category_pr.category_pr_name}
                            </div>
                            <div class="home_productBox__name text-xs lg:text-base">
                                ${item.name_pr}
                            </div>
                            <div class="home_productBox__rating flex text-yellow-500">
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>

                            </div>
                            <div class="home_productBox__price font-bold lg:text-base text-xs">
                                ${formatCurrency(priceNew)} VND
                            </div>
                        </div>
                        <div
                            class="home_productBox__addCart absolute bottom-0 right-0 bg-primary hover:bg-secondary w-10 h-10 flex items-center justify-center rounded-tl-lg text-white hover:cursor-pointer ">
                            <i class="fa-solid fa-cart-arrow-down"></i>
                        </div>
                        <div
                            class="home_product__like absolute top-0 right-0 h-10 w-10  flex items-center justify-center rouded-tl-lg ">
                            <i class="fa-solid fa-heart text-gray-400 hover:text-red-600"></i>
                        </div>
                        ${saleBoxHtml} <!-- Th\xeam sale-box v\xe0o HTML n\u{1EBF}u c\xf3 -->
                    </a>
                </div>`;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_productsHot();
// Lấy sản phẩm chi tiết
const get_product_detail = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    // Kiểm tra xem có id sản phẩm hay không
    if (!productId) // console.error('Không tìm thấy id sản phẩm trong URL');
    return;
    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const data = await response.json();
        let priceNew = data.price_pr - data.price_pr * data.discount_pr / 100;
        // console.log(data);
        const render = document.querySelector(".render_detail");
        if (!render) return;
        let html = "";
        html += `
            <div class=" flex lg:flex-row flex-col gap-5 w-full mb-14">
            <div class="basis-2/4">
                <div class=" rounded-lg border lg:w-[540px] h-[260px] w-[360px] lg:h-[420px] overflow-hidden mb-3">
                    <img src="http://localhost:3000/images/${data.image_pr.image_pr_1}" alt="" class="w-full h-full object-cover"
                        id="productPage_img__main">
                </div>
            
            </div>
            <div class="basis-2/4">
                <div class="w-full h-full">
                    <div class="text-[22px]">${data.name_pr}</div>
                    <div class="flex my-4">
                        <div class="mr-4 text-yellow-500">
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>${data.rating_pr}</div>
                    </div>
                    <div class="text-lg font-bold mb-5">${formatCurrency(priceNew)} VND</div>
                    <div class="text-sm mb-4">
                        ${data.description_pr}
                    </div>
                    <div class="text-primary mb-4">
                        Kh\u{1ED1}i l\u{1B0}\u{1EE3}ng: ${data.weight_pr} Kg
                    </div>
                    <div class="mb-4">
                        <form class="flex">
                            <div class="relative flex max-w-[8rem] mr-2">
                                <button type="button" id="" data-input-counter-decrement="quantity-input"
                                    class="decrement-button bg-[#f1f8e9] text-primary dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input type="text" id="" data-input-counter
                                    aria-describedby="helper-text-explanation"
                                    class="quantity-input bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" value="1" required />
                                <button type="button" id="" data-input-counter-increment="quantity-input"
                                    class="increment-button bg-[#f1f8e9] text-primary dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                            <button class="px-4 py-2 text-white bg-primary rounded-lg hover:bg-secondary"
                                data-product-id="${data._id}"
                                data-product-name="${data.name_pr}"
                                data-product-price="${priceNew}"
                                data-product-image="${data.image_pr.image_pr_1}"
                            >
                                <p>Th\xeam v\xe0o gi\u{1ECF} h\xe0ng</p>
                            </button>
                        </form>
                    </div>
                    <div>
                        <p>Th\u{1EC3} lo\u{1EA1}i: <span class="p-[2px] bg-[#f1f8e9] text-primary rounded-lg"><a href="">${data.category_pr.category_pr_tag}</a></span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class="flex gap-4 mb-4">
                <div
                    class="productDetail_btn__a basis-2/4 flex items-center justify-center h-[60px] w-full border-primary border rounded-lg text-primary font-bold hover:cursor-pointer active">
                    M\xf4 t\u{1EA3}</div>
                <div
                    class="productDetail_btn__b basis-2/4 flex items-center justify-center h-[60px] w-full border-primary border rounded-lg text-primary font-bold hover:cursor-pointer">
                    B\xecnh lu\u{1EAD}n</div>
            </div>

            <div>
                <div class="productDetail_area__a w-full">
                    <p class="text-[26px] mb-2 font-bold">Th\xf4ng tin nhanh</p>
                    <div class="text-sm my-2">
                       ${data.description_pr_detail}
                    </div>
                </div>
                <div class="productDetail_area__b hidden">
                    <p class="text-[26px]">1 b\xecnh lu\u{1EAD}n cho s\u{1EA3}n ph\u{1EA9}m <span class="font-bold underline">C\xe1</span></p>

                    <div class="flex my-5 lg:flex-row flex-col">
                        <div class="basis-1/3 flex items-center justify-center flex-col">
                            <div class="flex items-center mb-2">
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p class="ms-1 text-xl font-bold text-black dark:text-gray-400">4.95</p>
                                <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                                <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                            </div>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
                        </div>
                        <div class="basis-2/3">
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">5
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 70%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                            </div>
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">4
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 17%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
                            </div>
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">3
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 8%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
                            </div>
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">2
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 4%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
                            </div>
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">1
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 1%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
                            </div>
                        </div>
                    </div>


                    <div class="h-[500px] overflow-y-auto mb-8">
                        <article class="border border-primary rounded-lg p-4 mb-4">
                            <div class="flex items-center mb-4 ">
                                <img class="w-10 h-10 me-4 rounded-full" src="#" alt="">
                                <div class="font-medium dark:text-white">
                                    <p>Jese Leos
                                </div>
                            </div>
                            <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy
                                    another one!</h3>
                            </div>
                            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <p>Reviewed in the United Kingdom on <time datetime="2017-03-03 19:00">March 3,
                                        2017</time></p>
                            </footer>
                            <p class="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver.
                                They
                                are just fantastic value for money. This one arrived yesterday and the first thing I
                                did
                                was set the time, popped on an identical strap from another Invicta and went in the
                                shower with it to test the waterproofing.... No problems.</p>
                            <p class="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build
                                quality
                                as those very expensive watches. But that is like comparing a Citro\xebn to a Ferrari.
                                This
                                watch was well under \xa3100! An absolute bargain.</p>
                            <a href="#"
                                class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                                more</a>
                        </article>
                        <article class="border border-primary rounded-lg p-4 mb-4">
                            <div class="flex items-center mb-4 ">
                                <img class="w-10 h-10 me-4 rounded-full" src="#" alt="">
                                <div class="font-medium dark:text-white">
                                    <p>Jese Leos
                                </div>
                            </div>
                            <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy
                                    another one!</h3>
                            </div>
                            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <p>Reviewed in the United Kingdom on <time datetime="2017-03-03 19:00">March 3,
                                        2017</time></p>
                            </footer>
                            <p class="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver.
                                They
                                are just fantastic value for money. This one arrived yesterday and the first thing I
                                did
                                was set the time, popped on an identical strap from another Invicta and went in the
                                shower with it to test the waterproofing.... No problems.</p>
                            <p class="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build
                                quality
                                as those very expensive watches. But that is like comparing a Citro\xebn to a Ferrari.
                                This
                                watch was well under \xa3100! An absolute bargain.</p>
                            <a href="#"
                                class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                                more</a>
                        </article>
                        <article class="border border-primary rounded-lg p-4 mb-4">
                            <div class="flex items-center mb-4 ">
                                <img class="w-10 h-10 me-4 rounded-full" src="#" alt="">
                                <div class="font-medium dark:text-white">
                                    <p>Jese Leos
                                </div>
                            </div>
                            <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy
                                    another one!</h3>
                            </div>
                            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <p>Reviewed in the United Kingdom on <time datetime="2017-03-03 19:00">March 3,
                                        2017</time></p>
                            </footer>
                            <p class="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver.
                                They
                                are just fantastic value for money. This one arrived yesterday and the first thing I
                                did
                                was set the time, popped on an identical strap from another Invicta and went in the
                                shower with it to test the waterproofing.... No problems.</p>
                            <p class="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build
                                quality
                                as those very expensive watches. But that is like comparing a Citro\xebn to a Ferrari.
                                This
                                watch was well under \xa3100! An absolute bargain.</p>
                            <a href="#"
                                class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                                more</a>
                        </article>
                    </div>


                    <div class="mb-14">
                        <p class="text-[30px] mb-5">Th\xeam 1 b\xe0i \u{111}\xe1nh gi\xe1</p>
                        <div>
                            <div class="mb-5">
                                <p>\u{110}\xe1nh gi\xe1 c\u{1EE7}a b\u{1EA1}n <span class="text-red-500">*</span></p>
                                <div class="mr-4 text-yellow-500">
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                            </div>
                            <div>
                                <p>B\xecnh lu\u{1EAD}n c\u{1EE7}a b\u{1EA1}n <span class="text-red-500">*</span></p>
                                <textarea name="" placeholder="Nh\u{1EAD}p \xfd ki\u{1EBF}n c\u{1EE7}a b\u{1EA1}n" id="" cols="30" rows="10"
                                    class="w-full p-4 border border-primary rounded-lg"></textarea>
                                <button
                                    class="text-base text-white bg-primary px-4 py-2 rounded-lg hover:bg-secondary">G\u{1EED}i
                                    \u{111}\xe1nh gi\xe1</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
            `;
        render.innerHTML = html;
        setupImageGallery();
        setupBoxArea();
        setupQuantityInputs();
    } catch (error) {
        console.log("L\u1ED7i: ", error);
        throw error;
    }
};
get_product_detail();
// Home show thể loại
const home_show_categorie_nav = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".nav_show_categories");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // console.log(item);
            html += `
            <a class="py-1 hover:text-primary" href="shop.html?tag=${item.tag_ct}">${item.name_ct}</a>
            `;
        });
        render.innerHTML = html;
        // Sau khi render xong danh mục, khởi tạo Swiper
        initSwiper();
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_categorie_nav();
// Home show thể loại
const home_show_categorie = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".home_show__categories-slide");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // console.log(item);
            html += `
                    <div class="swiper-slide bg-slate-100 rounded-lg">
                        <a href="shop.html?tag=${item.tag_ct}" class="flex flex-col items-center justify-center h-full">
                            <img src="http://localhost:3000/images/${item.image_ct}" alt=""
                                class="h-[70px] w-[70px] hover:-translate-y-1" style="transition: 0.5s;">
                            <p>${item.name_ct}</p>
                        </a>
                    </div>
            `;
        });
        render.innerHTML = html;
        // Sau khi render xong danh mục, khởi tạo Swiper
        initSwiper();
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_categorie();
// shop show product
const shop_show_all_product = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const category_tag = urlParams.get("tag");
    try {
        let url = "http://localhost:3000/products";
        if (category_tag) url = `http://localhost:3000/products/tagname/${category_tag}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".shop_show__product");
        if (!render) return;
        let html = "";
        data.forEach((item)=>{
            let priceNew = item.price_pr - item.price_pr * item.discount_pr / 100;
            const saleBoxHtml = item.discount_pr !== 0 ? `<div
            class="sale-box bg-yellow-300 absolute top-2 left-2 h-6 w-[70px] pl-1 overflow-hidden text-black">
            - ${item.discount_pr}%
        </div>` : "";
            html += `      
            <div>
            <a href="product_detail.html?id=${item._id}"
                class="shadow-2xl w-full lg:h-[380px] h-[280px] lg:p-5 p-2 rounded-lg flex flex-col justify-between relative overflow-hidden border-2 border-transparent hover:border-primary hover:border-2 hover:cursor-pointer">
                <div class="flex justify-center">
                    <img class="lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] object-cover text-center rounded-lg"
                        src="http://localhost:3000/images/${item.image_pr.image_pr_1}"
                        alt="">
                </div>

                <div>
                    <div class="home_productBox__name text-xs lg:text-base">
                        ${item.name_pr}
                    </div>
                    <div class="home_productBox__rating flex text-yellow-500">
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>

                    </div>
                    <div class="home_productBox__price font-bold lg:text-base text-xs">
                        ${formatCurrency(priceNew)} VND
                    </div>
                </div>
                <div
                    class="home_productBox__addCart absolute bottom-0 right-0 bg-primary hover:bg-secondary w-10 h-10 flex items-center justify-center rounded-tl-lg text-white hover:cursor-pointer ">
                    <i class="fa-solid fa-cart-arrow-down"></i>
                </div>
                <div
                    class="home_product__like absolute top-0 right-0 h-10 w-10  flex items-center justify-center rouded-tl-lg ">
                    <i class="fa-solid fa-heart text-gray-400 hover:text-red-600"></i>
                </div>
                ${saleBoxHtml}
            </a>
        </div>
            `;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
shop_show_all_product();
// home show product sale
const home_show_product_sale = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/products/discount/discountedProducts");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".home_show_product_sale");
        // Kiểm tra render có tồn tại và không null
        if (!render) return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // Kiểm tra nếu discount_pr không phải là 0 thì hiển thị sale-box
            let priceNew = item.price_pr - item.price_pr * item.discount_pr / 100;
            html += `
                    <div
                        class="w-full h-[500px] lg:h-[240px] flex border rounded-lg mb-4 overflow-hidden flex-col lg:flex-row relative">
                        <a href="product_detail.html?id=${item._id}" class="basis-1/3">
                            <img src="http://localhost:3000/images/${item.image_pr.image_pr_1}"
                                class="w-full h-full object-cover" alt="">
                        </a>
                        <div
                            class="absolute top-1 right-1 lg:top-4 lg:right-6 bg-yellow-500 rounded-3xl text-black px-5 py-1">
                            -${item.discount_pr}%
                        </div>
                        <div class="basis-2/3 lg:p-8 flex flex-col justify-around relative p-2">
                            <p class="lg:text-base font-bold">${item.name_pr}</p>
                            <div class="flex items-center">
                                <div class="mr-4">
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>${item.rating_pr}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="lg:text-xl mr-4">${formatCurrency(priceNew)} VND</div>
                                <div>${formatCurrency(item.price_pr)} VND</div>
                            </div>
                            <div>
                                <button
                                    class="bg-primary hover:bg-secondary flex items-center justify-center lg:px-5 px-2 lg:py-2 py-2 text-white font-bold rounded-lg">
                                    <p class="lg:mr-2 mr-4 text-sm">Th\xeam v\xe0o gi\u{1ECF} h\xe0ng</p>
                                    <i class="fa-solid fa-cart-arrow-down"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    `;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_product_sale();
// admin show category form add
const admin_show_category_form_add = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const render = document.querySelector(".admin_add_show_category");
        if (!render) return;
        let html = "";
        data.forEach((item)=>{
            html += `
            <option value="${item.tag_ct}">${item.name_ct}</option>
            `;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
admin_show_category_form_add();
async function admin_delete__product(id) {
    try {
        const confirmation = confirm("B\u1EA1n c\xf3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xf3a s\u1EA3n ph\u1EA9m n\xe0y?");
        if (confirmation) {
            const response = await fetch(`http://localhost:3000/products/delete/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            // console.log(data.message);
            alert("X\xf3a s\u1EA3n ph\u1EA9m th\xe0nh c\xf4ng");
            admin_render_product(); // Cập nhật danh sách sản phẩm
        }
    } catch (error) {
        console.log("L\u1ED7i: ", error);
        throw error;
    }
}
// admin sản phẩm
async function admin_render_product() {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".admin_show_product");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
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
                                <button onclick="admin_delete__product('${item._id}')">
                                    <kbd
                                        class="px-2 py-1.5 text-xs font-semibold text-white bg-red-300 border rounded-lg hover:bg-red-600">X\xf3a</kbd>
                                </button>
                                <a href="http://localhost:1234/admin_product_edit?id=${item._id}">
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
//show sản phẩm liên quan trang chi tiết
const show_san_pham_lienquan = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // Lấy productId từ URL thay vì category_tag
    try {
        // Gọi API từ router để lấy sản phẩm liên quan dựa trên productId
        const response = await fetch(`http://localhost:3000/products/sanphamlienquan/${productId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const render = document.querySelector(".show_san_pham_lienquan");
        if (!render) return;
        let html = "";
        data.forEach((item)=>{
            // Kiểm tra xem item.image_pr và item.category_pr có tồn tại không
            if (item.image_pr && item.image_pr.image_pr_1 && item.category_pr && item.category_pr.category_pr_tag) {
                let priceNew = item.price_pr - item.price_pr * item.discount_pr / 100;
                html += `      
                    <div>
                        <a href=""
                            class="shadow-2xl w-full lg:h-[380px] h-[280px] lg:p-5 p-2 rounded-lg flex flex-col justify-between relative overflow-hidden border-2 border-transparent hover:border-primary hover:border-2 hover:cursor-pointer">
                            <div class="flex justify-center">
                                <img class="lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] object-cover text-center rounded-lg"
                                    src="http://localhost:3000/images/${item.image_pr.image_pr_1}"
                                    alt="">
                            </div>

                            <div>
                                <div class="home_productBox__category text-sm  pt-2 text-primary font-bold lg:text-sm ">
                                    ${item.category_pr.category_pr_tag}
                                </div>
                                <div class="home_productBox__name text-xs lg:text-base">
                                    ${item.name_pr}
                                </div>
                                <div class="home_productBox__rating flex text-yellow-500">
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>

                                </div>
                                <div class="home_productBox__price font-bold lg:text-base text-xs">
                                    ${formatCurrency(priceNew)} VND <!-- S\u{1EED} d\u{1EE5}ng gi\xe1 m\u{1EDB}i t\xednh t\u{1EEB} d\u{1EEF} li\u{1EC7}u c\u{1EE7}a s\u{1EA3}n ph\u{1EA9}m -->
                                </div>
                            </div>
                            <div
                                class="home_productBox__addCart absolute bottom-0 right-0 bg-primary hover:bg-secondary w-10 h-10 flex items-center justify-center rounded-tl-lg text-white hover:cursor-pointer ">
                                <i class="fa-solid fa-cart-arrow-down"></i>
                            </div>
                            <div
                                class="home_product__like absolute top-0 right-0 h-10 w-10  flex items-center justify-center rouded-tl-lg ">
                                <i class="fa-solid fa-heart text-gray-400 hover:text-red-600"></i>
                            </div>
                            <div
                                class="sale-box bg-yellow-300 absolute top-2 left-2 h-6 w-[70px] pl-1 overflow-hidden text-black">
                                - 20%
                            </div>
                        </a>
                    </div>
                `;
            }
        });
        render.innerHTML = html;
    } catch (error) {
    // console.error('Error fetching or displaying data:', error.message);
    }
};
show_san_pham_lienquan();
const show_data_form_update_product = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    try {
        const productResponse = await fetch(`http://localhost:3000/products/${productId}`);
        const productData = await productResponse.json();
        // console.log(productData);
        // Lấy form
        const form = document.querySelector(".form_edit_product");
        // Đặt giá trị cho các trường input trong form
        form.querySelector("#name_pr").value = productData.name_pr;
        form.querySelector("#category_pr").value = productData.category_pr;
        form.querySelector("#price_pr").value = productData.price_pr;
        form.querySelector("#discount_pr").value = productData.discount_pr;
        form.querySelector("#quantity_pr").value = productData.quantity_pr;
        form.querySelector("#description_pr").value = productData.description_pr;
        form.querySelector("#description_pr_detail").value = productData.description_pr_detail;
        const categoryResponse = await fetch(`http://localhost:3000/categories`);
        const categoryData = await categoryResponse.json();
        console.log(categoryData);
        // Điền dữ liệu danh mục vào dropdown menu
        const categoryDropdown = document.querySelector("#category_pr");
        if (!categoryDropdown) return;
        categoryData.forEach((category)=>{
            const option = document.createElement("option");
            option.value = category.tag_ct;
            option.textContent = `${category.name_ct}`; // Assuming you want to add 's' at the end
            categoryDropdown.appendChild(option);
        });
        // Set selected value from productData
        categoryDropdown.value = productData.category_pr.category_pr_tag;
        // Cập nhật đường dẫn ảnh chính và ảnh phụ
        form.querySelector(".mb-6 img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_1}`;
        form.querySelector(".mb-6:nth-child(5) img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_2}`;
        form.querySelector(".mb-6:nth-child(6) img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_3}`;
        form.querySelector(".mb-6:nth-child(7) img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_4}`;
        form.querySelector(".mb-6:nth-child(8) img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_5}`;
    } catch (error) {
        console.log("L\u1ED7i: ", error);
        throw error;
    }
};
// // cập nhật form sản phẩm
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector(".form_edit_product");
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get("id");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn chặn form gửi dữ liệu mặc định
        var formData = new FormData(form);
        // Convert formData thành object JSON
        var jsonData = {};
        formData.forEach(function(value, key) {
            jsonData[key] = value;
        });
        // Hiển thị object JSON trong console cho mục đích kiểm tra
        // console.log(jsonData);
        // Gửi dữ liệu sản phẩm được chỉnh sửa đến máy chủ
        fetch(`http://localhost:3000/products/edit/${productId}`, {
            method: "PUT",
            body: JSON.stringify(jsonData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>response.json()).then((data)=>{
            console.log(data); // Log response từ máy chủ
            // Thực hiện các hành động khác (nếu cần) sau khi gửi dữ liệu thành công
            alert("C\u1EADp nh\u1EADt th\xe0nh c\xf4ng !");
        }).catch((error)=>console.error("Error:", error));
    });
});
// show admin all category
const admin_show_category = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".admin_show_category");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            html += ``;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
admin_show_category();

//# sourceMappingURL=admin_product.c36f364e.js.map
