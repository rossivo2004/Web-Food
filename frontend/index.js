//Hàm cấu hình định dạng tiền tệ kiểu VND
function formatCurrency(amount) {
    const parts = amount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}

function getIntPartFromString(numberString) {
    const integerValue = parseInt(numberString.replace(/\D/g, ""), 10);
    return integerValue;
}


function toast_add_success() {
    const toastSuccess = document.getElementById('toast-success');
    toastSuccess.style.transform = 'translateX(0)';
    // Tự động ẩn đi toast sau 3 giây
    setTimeout(() => {
        toastSuccess.style.transform = 'translateX(1000px)';
    }, 3000);
}

const home_show_productsHot = async () => {
    try {
        const response = await fetch('http://localhost:3000/products/productsHot');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('No data returned from the server');
        }

        const render = document.querySelector('.home_product__hot-show');

        if (!render) {
            return;
        }

        let html = '';

        data.forEach((item) => {
            const saleBoxHtml = item.discount_pr !== 0 ? `<div
                            class="sale-box bg-yellow-300 absolute top-2 left-2 h-6 w-[70px] pl-1 overflow-hidden text-black">
                            - ${item.discount_pr}%
                        </div>` : '';
            let priceNew = item.price_pr - (item.price_pr * item.discount_pr / 100);

            html += `      
                <div class="shadow-2xl w-full lg:h-[380px] h-[280px] lg:p-5 p-2 rounded-lg flex flex-col justify-between relative overflow-hidden border-2 border-transparent hover:border-primary hover:border-2 hover:cursor-pointer">
                    <a href="product_detail.html?id=${item._id}">
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
                    </a>
                    
                    <div 
                        class="fa-solid fa-cart-arrow-down home_productBox__addCart absolute bottom-0 right-0 bg-primary hover:bg-secondary w-10 h-10 flex items-center justify-center rounded-tl-lg text-white hover:cursor-pointer"
                        data-id="${item._id}"
                        data-name="${item.name_pr}"
                        data-price="${priceNew}"
                        data-image="${item.image_pr.image_pr_1}"
                        data-quantity="1"
                    >
                    </div>
                    <div
                        class="home_product__like absolute  top-0 right-0 h-10 w-10  flex items-center justify-center rouded-tl-lg ">
                        <i class="fa-solid fa-heart text-gray-400 hover:text-red-600 "></i>
                    </div>
                    ${saleBoxHtml}
                </div>`;
        });

        render.innerHTML = html;

        const btn_add = document.querySelectorAll('.home_productBox__addCart');
        btn_add.forEach((btn) => {
            btn.addEventListener('click', add_cart);
        });
    } catch (error) {
        console.error('Error fetching or displaying data:', error.message);
    }
};

home_show_productsHot();

// Home show danh mục nav mobile 
const home_show_categories_nav_mobile = async () => {
    try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('No data returned from the server');
        }

        const render = document.querySelector('.home_show_categories_nav_mobile');

        // Kiểm tra render có tồn tại và không null
        if (!render) {
            return; // Thoát khỏi hàm nếu không có phần tử render
        }

        let html = '';

        data.forEach((item) => {
            // console.log(item);
            html += `
            <a href="shop.html?tag=${item.tag_ct}"
            class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">${item.name_ct}</a>
            `;
        });

        render.innerHTML = html;

        // Sau khi render xong danh mục, khởi tạo Swiper
        initSwiper();
    } catch (error) {
        console.error('Error fetching or displaying data:', error.message);
    }
}
home_show_categories_nav_mobile();

// Lấy sản phẩm chi tiết
const get_product_detail = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Kiểm tra xem có id sản phẩm hay không
    if (!productId) {
        // console.error('Không tìm thấy id sản phẩm trong URL');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const data = await response.json();
        let priceNew = data.price_pr - (data.price_pr * data.discount_pr / 100);

        // console.log(data);

        const render = document.querySelector('.render_detail');

        if (!render) {
            return;
        }
        let html = '';

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
                        Khối lượng: ${data.weight_pr} Kg
                    </div>
                    <div class="mb-4">
                        <div class="flex">
                            <div class="relative flex max-w-[8rem] mr-2">
                                <div id="" data-input-counter-decrement="quantity-input"
                                    class=" decrement-button bg-[#f1f8e9] text-primary dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </div>
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
                            <div class="home_productBox__addCart hover:cursor-pointer px-4 py-2 text-white bg-primary rounded-lg hover:bg-secondary"
                            data-id="${data._id}"
                            data-name="${data.name_pr}"
                            data-price="${priceNew}"
                            data-image="${data.image_pr.image_pr_1}"
                            data-quantity="1"
                            >
                                Thêm vào giỏ hàng
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Thể loại: <span class="p-[2px] bg-[#f1f8e9] text-primary rounded-lg"><a href="">${data.category_pr.category_pr_tag}</a></span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class="flex gap-4 mb-4">
                <div
                    class="productDetail_btn__a basis-2/4 flex items-center justify-center h-[60px] w-full border-primary border rounded-lg text-primary font-bold hover:cursor-pointer active">
                    Mô tả</div>
                <div
                    class="productDetail_btn__b basis-2/4 flex items-center justify-center h-[60px] w-full border-primary border rounded-lg text-primary font-bold hover:cursor-pointer">
                    Bình luận</div>
            </div>

            <div>
                <div class="productDetail_area__a w-full">
                    <p class="text-[26px] mb-2 font-bold">Thông tin nhanh</p>
                    <div class="text-sm my-2">
                       ${data.description_pr_detail}
                    </div>
                </div>
                <div class="productDetail_area__b hidden">
                    <p class="text-[26px]">1 bình luận cho sản phẩm <span class="font-bold underline">Cá</span></p>

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
                                as those very expensive watches. But that is like comparing a Citroën to a Ferrari.
                                This
                                watch was well under £100! An absolute bargain.</p>
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
                                as those very expensive watches. But that is like comparing a Citroën to a Ferrari.
                                This
                                watch was well under £100! An absolute bargain.</p>
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
                                as those very expensive watches. But that is like comparing a Citroën to a Ferrari.
                                This
                                watch was well under £100! An absolute bargain.</p>
                            <a href="#"
                                class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                                more</a>
                        </article>
                    </div>


                    <div class="mb-14">
                        <p class="text-[30px] mb-5">Thêm 1 bài đánh giá</p>
                        <div>
                            <div class="mb-5">
                                <p>Đánh giá của bạn <span class="text-red-500">*</span></p>
                                <div class="mr-4 text-yellow-500">
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                            </div>
                            <div>
                                <p>Bình luận của bạn <span class="text-red-500">*</span></p>
                                <textarea name="" placeholder="Nhập ý kiến của bạn" id="" cols="30" rows="10"
                                    class="w-full p-4 border border-primary rounded-lg"></textarea>
                                <button
                                    class="text-base text-white bg-primary px-4 py-2 rounded-lg hover:bg-secondary">Gửi
                                    đánh giá</button>
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

        const btn_add = document.querySelectorAll('.home_productBox__addCart');
        btn_add.forEach((btn) => {
            btn.addEventListener('click', add_cart);
        });
    } catch (error) {
        console.log('Lỗi: ', error);
        throw error;
    }
}
get_product_detail();

// Home show thể loại
const home_show_categorie_nav = async () => {
    try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('No data returned from the server');
        }

        const render = document.querySelector('.nav_show_categories');

        // Kiểm tra render có tồn tại và không null
        if (!render) {
            // console.error('Render element not found');
            return; // Thoát khỏi hàm nếu không có phần tử render
        }

        let html = '';

        data.forEach((item) => {
            // console.log(item);
            html += `
            <a class="py-1 hover:text-primary" href="shop.html?tag=${item.tag_ct}">${item.name_ct}</a>
            `;
        });

        render.innerHTML = html;

        // Sau khi render xong danh mục, khởi tạo Swiper
        initSwiper();
    } catch (error) {
        console.error('Error fetching or displaying data:', error.message);
    }
}
home_show_categorie_nav();


// Home show thể loại
const home_show_categorie = async () => {
    try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('No data returned from the server');
        }

        const render = document.querySelector('.home_show__categories-slide');

        // Kiểm tra render có tồn tại và không null
        if (!render) {
            // console.error('Render element not found');
            return; // Thoát khỏi hàm nếu không có phần tử render
        }

        let html = '';

        data.forEach((item) => {
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
        console.error('Error fetching or displaying data:', error.message);
    }
}
home_show_categorie();

// shop show product
const shop_show_all_product = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category_tag = urlParams.get('tag');

    try {
        let url = 'http://localhost:3000/products';

        if (category_tag) {
            url = `http://localhost:3000/products/tagname/${category_tag}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('No data returned from the server');
        }

        const render = document.querySelector('.shop_show__product');

        if (!render) {
            return;
        }

        let html = '';

        data.forEach((item) => {
            let priceNew = item.price_pr - (item.price_pr * item.discount_pr / 100);
            const saleBoxHtml = item.discount_pr !== 0 ? `<div
            class="sale-box bg-yellow-300 absolute top-2 left-2 h-6 w-[70px] pl-1 overflow-hidden text-black">
            - ${item.discount_pr}%
        </div>` : '';

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
        console.error('Error fetching or displaying data:', error.message);
    }
}
shop_show_all_product();

// home show product sale
const home_show_product_sale = async () => {
    try {
        const response = await fetch('http://localhost:3000/products/discount/discountedProducts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();



        if (!data || data.length === 0) {
            throw new Error('No data returned from the server');
        }

        const render = document.querySelector('.home_show_product_sale');

        // Kiểm tra render có tồn tại và không null
        if (!render) {
            return; // Thoát khỏi hàm nếu không có phần tử render
        }

        let html = '';

        data.forEach((item) => {
            // Kiểm tra nếu discount_pr không phải là 0 thì hiển thị sale-box
            let priceNew = item.price_pr - (item.price_pr * item.discount_pr / 100);

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
                                <div
                                    class="home_productBox__addCart cursor-pointer bg-primary hover:bg-secondary flex items-center justify-center lg:px-5 px-2 lg:py-2 py-2 text-white font-bold rounded-lg"
                                    data-id="${item._id}"
                                    data-name="${item.name_pr}"
                                    data-price="${priceNew}"
                                    data-image="${item.image_pr.image_pr_1}"
                                    data-quantity="1"
                                    >
                                    <p class="lg:mr-2 mr-4 text-sm">Thêm vào giỏ hàng</p>
                                    <i class="fa-solid fa-cart-arrow-down"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                    `;


        });

        render.innerHTML = html;
        const btn_add = document.querySelectorAll('.home_productBox__addCart');
        btn_add.forEach((btn) => {
            btn.addEventListener('click', add_cart);
        });
    } catch (error) {
        console.error('Error fetching or displaying data:', error.message);
    }
}
home_show_product_sale();



// admin show category form add
const admin_show_category_form_add = async () => {
    try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const render = document.querySelector('.admin_add_show_category');
        if (!render) {
            return;
        }

        let html = '';

        data.forEach((item) => {
            html += `
            <option value="${item.tag_ct}">${item.name_ct}</option>
            `;
        });

        render.innerHTML = html;
    } catch (error) {
        console.error('Error fetching or displaying data:', error.message);
    }
}
admin_show_category_form_add();


async function admin_delete__product(id) {
    try {
        const confirmation = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmation) {
            const response = await fetch(`http://localhost:3000/products/delete/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            // console.log(data.message);
            alert("Xóa sản phẩm thành công");
            admin_render_product(); // Cập nhật danh sách sản phẩm
        }
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// admin sản phẩm
async function admin_render_product() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();



        if (!data || data.length === 0) {
            throw new Error('No data returned from the server');
        }

        const render = document.querySelector('.admin_show_product');

        // Kiểm tra render có tồn tại và không null
        if (!render) {
            // console.error('Render element not found');
            return; // Thoát khỏi hàm nếu không có phần tử render
        }

        let html = '';

        data.forEach((item) => {
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
                                        class="px-2 py-1.5 text-xs font-semibold text-white bg-red-300 border rounded-lg hover:bg-red-600">Xóa</kbd>
                                </button>
                                <a href="http://localhost:1234/admin_product_edit?id=${item._id}">
                                    <kbd
                                        class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-400">Sửa
                                    </kbd>
                                </a>
                            </div>
                        </td>
                    </tr>`;
        });

        render.innerHTML = html;
    } catch (error) {
        console.error('Error fetching or displaying data:', error.message);
    }
}
admin_render_product()

//show sản phẩm liên quan trang chi tiết
const show_san_pham_lienquan = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Lấy productId từ URL thay vì category_tag

    try {
        // Gọi API từ router để lấy sản phẩm liên quan dựa trên productId
        const response = await fetch(`http://localhost:3000/products/sanphamlienquan/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const render = document.querySelector('.show_san_pham_lienquan');
        if (!render) {
            return;
        }

        let html = '';

        data.forEach((item) => {
            // Kiểm tra xem item.image_pr và item.category_pr có tồn tại không
            if (item.image_pr && item.image_pr.image_pr_1 && item.category_pr && item.category_pr.category_pr_tag) {
                let priceNew = item.price_pr - (item.price_pr * item.discount_pr / 100);

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
                                    ${formatCurrency(priceNew)} VND <!-- Sử dụng giá mới tính từ dữ liệu của sản phẩm -->
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
}
show_san_pham_lienquan();

const show_data_form_update_product = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    try {
        const productResponse = await fetch(`http://localhost:3000/products/${productId}`);
        const productData = await productResponse.json();
        // console.log(productData);
        // Lấy form
        const form = document.querySelector('.form_edit_product');

        // Đặt giá trị cho các trường input trong form
        form.querySelector('#name_pr').value = productData.name_pr;
        form.querySelector('#category_pr').value = productData.category_pr;
        form.querySelector('#price_pr').value = productData.price_pr;
        form.querySelector('#discount_pr').value = productData.discount_pr;
        form.querySelector('#quantity_pr').value = productData.quantity_pr;
        form.querySelector('#description_pr').value = productData.description_pr;
        form.querySelector('#description_pr_detail').value = productData.description_pr_detail;




        const categoryResponse = await fetch(`http://localhost:3000/categories`);
        const categoryData = await categoryResponse.json();
        console.log(categoryData);
        // Điền dữ liệu danh mục vào dropdown menu
        const categoryDropdown = document.querySelector('#category_pr');

        if (!categoryDropdown) {
            return;
        }

        categoryData.forEach(category => {
            const option = document.createElement('option');
            option.value = category.tag_ct;
            option.textContent = `${category.name_ct}`; // Assuming you want to add 's' at the end
            categoryDropdown.appendChild(option);
        });

        // Set selected value from productData
        categoryDropdown.value = productData.category_pr.category_pr_tag;

        // Cập nhật đường dẫn ảnh chính và ảnh phụ
        form.querySelector('.mb-6 img').src = `http://localhost:3000/images/${productData.image_pr.image_pr_1}`;
        form.querySelector('.mb-6:nth-child(5) img').src = `http://localhost:3000/images/${productData.image_pr.image_pr_2}`;
        form.querySelector('.mb-6:nth-child(6) img').src = `http://localhost:3000/images/${productData.image_pr.image_pr_3}`;
        form.querySelector('.mb-6:nth-child(7) img').src = `http://localhost:3000/images/${productData.image_pr.image_pr_4}`;
        form.querySelector('.mb-6:nth-child(8) img').src = `http://localhost:3000/images/${productData.image_pr.image_pr_5}`;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// // cập nhật form sản phẩm
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.form_edit_product');
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn form gửi dữ liệu mặc định

        var formData = new FormData(form);

        // Convert formData thành object JSON
        var jsonData = {};
        formData.forEach(function (value, key) {
            jsonData[key] = value;
        });

        // Hiển thị object JSON trong console cho mục đích kiểm tra
        // console.log(jsonData);

        // Gửi dữ liệu sản phẩm được chỉnh sửa đến máy chủ
        fetch(`http://localhost:3000/products/edit/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log response từ máy chủ
                // Thực hiện các hành động khác (nếu cần) sau khi gửi dữ liệu thành công
                alert("Cập nhật thành công !")
            })
            .catch(error => console.error('Error:', error));
    });
});


async function admin_delete__categories(id) {
    try {
        const confirmation = confirm("Bạn có chắc chắn muốn xóa danh mục này?");
        if (confirmation) {
            const response = await fetch(`http://localhost:3000/categories/delete/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            // console.log(data.message);
            alert("Xóa sản phẩm thành công");
            admin_show_category(); // Cập nhật danh sách sản phẩm
        }
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// show admin all category
const admin_show_category = async () => {
    try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();



        if (!data || data.length === 0) {
            throw new Error('No data returned from the server');
        }

        const render = document.querySelector('.admin_show_category');

        // Kiểm tra render có tồn tại và không null
        if (!render) {
            // console.error('Render element not found');
            return; // Thoát khỏi hàm nếu không có phần tử render
        }

        let html = '';

        data.forEach((item) => {
            html += ` <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                .
            </th>
            <td class="px-6 py-4">
                <img src="http://localhost:3000/images/${item.image_ct}" class="w-20 h-20 object-cover" alt="">
            </td>
            <td class="px-6 py-4">
                ${item.name_ct}
            </td>
            <td class="px-6 py-4">
                ${item.tag_ct}
            </td>
            <td class="px-6 py-4">
                .
            </td>
            <td class="px-6 py-4 text-right">
                <div>
                <button onclick="admin_delete__categories('${item._id}')">
                <kbd
                    class="px-2 py-1.5 text-xs font-semibold text-white bg-red-300 border rounded-lg hover:bg-red-600">Xóa</kbd>
            </button>
                    <a href="http://localhost:1234/admin_category_edit?id=${item._id}">
                        <kbd
                            class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-400">Sửa
                        </kbd>
                    </a>
                </div>
            </td>
        </tr>`;
        });

        render.innerHTML = html;
    } catch (error) {
        console.error('Error fetching or displaying data:', error.message);
    }
}


// const admin_show_data_form_category = async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const categoryId = urlParams.get('id');

//     try {
//         const categoryResponse = await fetch(`http://localhost:3000/categories/${categoryId}`);
//         const categoryData = await categoryResponse.json();
//         // console.log(categoryData);

//         // Lấy form
//         const form = document.querySelector('.form_edit_category');

//         form.querySelector('#name_ct').value = categoryData.name_ct;
//         form.querySelector('#tag_ct').value = categoryData.tag_ct;

//     } catch (error) {
//         console.log("Lỗi: ", error);
//         throw error;
//     }
// }
const processPayment = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút

    const cartDataString = localStorage.getItem("cart");
    if (!cartDataString) {
        alert(
            "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi tiến hành thanh toán."
        );
        return;
    }

    try {
        const existingCart = JSON.parse(cartDataString);

        // Kiểm tra xem giỏ hàng có trống không
        if (existingCart.length === 0) {
            alert(
                "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi tiến hành thanh toán."
            );
            return;
        }

        // Tính tổng số tiền đơn hàng
        let sum = 0;
        existingCart.forEach((item) => {
            const priceSum = item.productPrice * item.quantity;
            sum += priceSum;
        });
        const totalAmount = sum + 30000; // Ví dụ: Phí vận chuyển là 30000 VND

        const userDataJSON = localStorage.getItem('currentUser');
        const userData = JSON.parse(userDataJSON);
        const userID = userData._id;

        // Lấy thời gian hiện tại và định dạng nó theo mong muốn
        const currentTime = new Date();
        const orderDate = currentTime.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        // Dữ liệu đơn hàng
        const orderData = {
            cartItems: existingCart,
            totalAmount: totalAmount,
            orderDate: orderDate,
            status: 1, // Trạng thái đơn hàng, ví dụ: 1 - Đang xử lý, 2 - Đã thanh toán, ...
            fullName: document.getElementById("full_name").value,
            phoneNumber: document.getElementById("phone_number").value,
            address: document.getElementById("address").value,
            userId: userID
        };

        // Gửi dữ liệu đơn hàng đến máy chủ và xóa giỏ hàng sau khi đặt hàng
        await sendOrderToServer(orderData);
    } catch (error) {
        console.error("Lỗi khi xử lý thanh toán:", error);
        alert("Đã xảy ra lỗi khi xử lý thanh toán.");
    }
}



async function sendOrderToServer(orderData) {
    try {
        const response = await fetch("http://localhost:3000/orders/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            // Xóa giỏ hàng sau khi đã đặt hàng thành công
            localStorage.removeItem("cart");
            // Hiển thị thông báo hoặc chuyển hướng tới trang cảm ơn, ...
            window.location.href = "http://localhost:1234/camondathang"
        } else {
            console.error(
                "Error sending order to server. Server responded with status:",
                response.status
            );
            alert("Đã xảy ra lỗi khi gửi đơn hàng đến server.");
        }
    } catch (error) {
        console.error("Error sending order to server:", error);
        alert("Đã xảy ra lỗi khi gửi đơn hàng đến server.");
    }
}


const add_cart = async (event) => {
    const productId = event.target.getAttribute("data-id");
    const productName = event.target.getAttribute("data-name");
    const productPrice = event.target.getAttribute("data-price");
    const productImage = event.target.getAttribute("data-image");

    if (productId && productName && productPrice && productImage) {
        addToLocalStorageCart(productId, productName, productPrice, productImage);
    }
}

const addToLocalStorageCart = async (productId, productName, productPrice, productImage) => {
    try {
        let existsCart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingProductIndex = existsCart.findIndex(
            (item) => item.productId === productId
        );

        if (existingProductIndex !== -1) {
            existsCart[existingProductIndex].quantity = (existsCart[existingProductIndex].quantity || 0) + 1;
        } else {
            existsCart.push({
                productId: productId ?? "",
                productName: productName ?? "",
                productPrice: productPrice ?? "",
                productImage: productImage ?? "",
                quantity: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(existsCart));
        toast_add_success()
        show_product_cart_mini()
    } catch (error) {
        console.error('Error:', error);
    }
}

// Lấy data trên localstorage render ra box cart 
const show_product_cart_mini = async () => {
    let sum = 0;
    let quantitySum = 0; // Khởi tạo quantitySum bằng 0
    let render = document.querySelector('.render_product_cart_mini');
    let render_sum = document.querySelector('.sum_cart_mini');
    let render_nav = document.querySelectorAll('.render_sum_nav');
    let render_sum_quantity = document.querySelectorAll('.nav_sum_quantity_pr');

    let html = '';
    let html_cart_sum_mini = '';
    if (render) {
        try {
            const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

            if (existingCart.length === 0) {
                render.innerHTML = `
                    <div class="col-12 cart_area__box-hollow flex items-center justify-center flex-col mt-10">
                        <p>Giỏ hàng trống</p>
                        <a href="http://localhost:1234/shop" class="text-primary">Tiếp tục mua sắm</a>
                    </div>`;
                // Cập nhật render_sum_quantity khi giỏ hàng trống
                render_sum_quantity.forEach((element) => {
                    element.innerHTML = `<div>0</div>`;
                });
                return;
            }

            existingCart.forEach((item) => {
                // Calculate price sum for each item and update the total sum
                const priceSum = item.productPrice * item.quantity;
                sum += priceSum;
                quantitySum += item.quantity;
                html += `<li class="flex py-6">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src="http://localhost:3000/images/${item.productImage}"
                                    alt="${item.productName}"
                                    class="h-full w-full object-cover object-center">
                            </div>
                            <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3><a href="#">${item.productName}</a></h3>
                                        <p class="ml-4">${formatCurrency(item.productPrice)} VND</p>
                                    </div>
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                    <p class="text-gray-500">Qty ${item.quantity}</p>
                                    <div class="flex">
                                        <button type="button" class="remove-item-btn font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </li>`;
            });

            render.innerHTML = html;

            function render_sum_mini_cart() {
                html_cart_sum_mini += `
            <p>Tổng</p>
            <p>${formatCurrency(sum)} VND</p>`;
                render_sum.innerHTML = html_cart_sum_mini;
            }
            render_sum_mini_cart();


            function render_nav_dr() {
                render_nav.forEach((element) => {
                    element.innerHTML = `<div>${formatCurrency(sum)} VND</div>`;
                });

            }
            render_nav_dr();

            // Cập nhật render_sum_quantity với quantitySum
            render_sum_quantity.forEach((element) => {
                element.innerHTML = `<div>${quantitySum}</div>`;
            });

            // Sử dụng hàm processPayment sau khi hiển thị giỏ hàng

            // Xóa sản phẩm khỏi giỏ hàng khi nút Remove được click
            const removeButtons = document.querySelectorAll('.remove-item-btn');
            removeButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    try {
                        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
                        // Xác định sản phẩm cần xóa dựa trên index
                        const removedItem = existingCart.splice(index, 1)[0];
                        // Cập nhật lại local storage
                        localStorage.setItem("cart", JSON.stringify(existingCart));
                        show_product_cart_mini();
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
show_product_cart_mini();

const orderFinalBtn = document.querySelector('.order_final_btn');
if (orderFinalBtn) {
    orderFinalBtn.addEventListener('click', processPayment);
} else {
    console.error("Element with class 'order_final_btn' not found.");
}




const show_product_checkout_pay = async () => {
    let sum = 0;
    let ship = 20000;
    let tax = 0;
    let totalSum = 0;
    let priceSum = 0;
    const render_pay = document.querySelector('.check_out_show_pay');
    let html_pay = '';

    if (render_pay) {
        try {
            const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

            existingCart.forEach((item) => {
                priceSum = item.productPrice * item.quantity;
                sum += priceSum;
                tax = sum * 0.05;
                totalSum = sum + tax + ship;

                // Lấy phần nguyên của các biến sum, ship, tax, và totalSum
                const sumInteger = parseInt(sum);
                const shipInteger = parseInt(ship);
                const taxInteger = parseInt(tax);
                const totalSumInteger = parseInt(totalSum);

                html_pay = `<div class="flex w-full justify-between py-3">
                                <div>Tổng phụ:</div>
                                <div>${formatCurrency(sumInteger)} VND</div>
                            </div>
                            <div>
                                <div class="flex w-full justify-between py-3">
                                    <div>Phí vận chuyển</div>
                                    <div>${formatCurrency(shipInteger)} VND</div>
                                </div>
                                <div class="flex w-full justify-between py-3">
                                    <div>Thuế</div>
                                    <div>${formatCurrency(taxInteger)} VND</div>
                                </div>
                                <hr>
                                <div class="flex w-full justify-between py-3 font-bold">
                                    <div>Tổng thanh toán</div>
                                    <div>${formatCurrency(totalSumInteger)} VND</div>
                                </div>
                                <hr class="h-[2px] mb-4">
                               
                            </div>`;
            });
            render_pay.innerHTML = html_pay;
        } catch (error) {
            console.error('Error:', error);
        }
    }
};
show_product_checkout_pay();

const show_product_checkout = async () => {
    let sum = 0;
    const render = document.querySelector('.show_product_checkout');
    let html = '';

    if (render) {
        try {
            const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

            existingCart.forEach((item) => {
                const priceSum = item.productPrice * item.quantity;
                sum += priceSum;
                html += `   <div class="flex items-center justify-between py-3">
                <div class="flex items-center">
                    <div class="h-20 w-20 rounded-lg bg-[#f1f8e9] overflow-hidden mr-3">
                        <img src="http://localhost:3000/images/${item.productImage}" alt=""
                            class="w-full h-full object-cover">
                    </div>
                    <div>
                        <p class="mb-2">${item.productName}</p>
                        <div class="text-sm">${formatCurrency(item.productPrice)}</div>
                    </div>
                </div>

                <div class="flex flex-col items-end">
                    <div class="mb-2"> x ${item.quantity}</div>
                    <div>${formatCurrency(priceSum)} VND</div>
                </div>
            </div>`;
                // console.log(sum);

            });
            render.innerHTML = html;

            // render_nav.forEach((element) => {
            //     element.innerHTML = `<div>${formatCurrency(sum)} VND</div>`;
            // });

            // render_sum_quantity.forEach((element) => {
            //     element.innerHTML = `<div>${quantitySum}</div>`;
            // });

        } catch (error) {
            console.error('Error:', error);
        }
    }


}
show_product_checkout()

const show_user_checkout = async () => {
    const render = document.querySelector('.checkout_show_data_user');
    let html = '';


}



function form_register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{}|;':",.<>?])[a-zA-Z0-9!@#$%^&*()_+[\]{}|;':",.<>?]{8,}$/;

    const register = document.querySelector('.form_register');

    register.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.querySelector('.register_username').value.trim();
        const email = document.querySelector('.register_email').value.trim();
        const password = document.querySelector('.register_password').value.trim();

        const username_error = document.querySelector('.rg_username__error');
        const email_error = document.querySelector('.rg_email__error');
        const password_error = document.querySelector('.rg_password__error');

        // Xóa thông báo lỗi cũ trước khi kiểm tra lại
        username_error.textContent = '';
        email_error.textContent = '';
        password_error.textContent = '';

        // Kiểm tra tên đăng nhập
        if (username === '') {
            username_error.textContent = 'Tên đăng nhập không được để trống';
        } else if (username.length < 8) {
            username_error.textContent = 'Tên đăng nhập tối thiểu 8 kí tự';
        }

        // Kiểm tra định dạng email
        if (email === '') {
            email_error.textContent = 'Email không được để trống';
        } else if (!emailRegex.test(email)) {
            email_error.textContent = 'Định dạng email không hợp lệ';
        }

        // Kiểm tra mật khẩu
        if (password === '') {
            password_error.textContent = 'Mật khẩu không được để trống';
        } else if (!passwordRegex.test(password)) {
            password_error.textContent = 'Mật khẩu không hợp lệ';
        } else if (password.length < 8) {
            password_error.textContent = 'Mật khẩu tối thiểu 8 kí tự';
        }

        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        // console.log(data);
        const isUserExist = data.some(item => item.user_name_us === username || item.email_us === email);

        if (isUserExist) {
            alert("Tên đăng nhập hoặc email đã tồn tại");
        } else {
            // Nếu không có lỗi, gửi dữ liệu đăng kí lên server
            if (!username_error.textContent && !email_error.textContent && !password_error.textContent) {
                const name_us = ""; // Thay "" bằng giá trị tương ứng từ form
                const image_us = ""; // Thay "" bằng giá trị tương ứng từ form
                const phone_us = ""; // Thay "" bằng giá trị tương ứng từ form
                const address_us = ""; // Thay "" bằng giá trị tương ứng từ form

                try {
                    const response = await fetch("http://localhost:3000/users/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_name_us: username,
                            email_us: email,
                            password_us: password,
                            name_us,
                            image_us,
                            phone_us,
                            address_us
                        }),
                    });

                    if (response.ok) {
                        // const userData = await response.json();
                        // // Lưu dữ liệu người dùng vào local storage
                        // localStorage.setItem("currentUser", JSON.stringify(userData));
                        // // Thông báo thành công
                        alert("Đăng kí thành công!");
                        // Chuyển hướng người dùng đến trang chủ
                        window.location.href = "http://localhost:1234/login"; // Thay đường dẫn "trangchu.html" bằng đường dẫn đến trang chủ của bạn
                    } else {
                        // Xử lý khi có lỗi từ máy chủ
                        alert("Đăng kí không thành công. Vui lòng thử lại sau!");
                    }
                } catch (error) {
                    console.log("Lỗi: ", error);
                    alert("Đã xảy ra lỗi. Vui lòng thử lại sau!");
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    form_register();
});


const form_login = async () => {
    const login = document.querySelector('.form_login');
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();

    if (!login) {
        return;
    }

    login.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.querySelector('.lg_username').value.trim();
        const password = document.querySelector('.lg_password').value.trim();

        const isUserExist = data.some(item => item.user_name_us === username && item.password_us === password);

        if (isUserExist) {
            const currentUserData = data.find(item => item.user_name_us === username && item.password_us === password);
            // Lưu thông tin cần thiết của người dùng hiện tại vào localStorage
            localStorage.setItem("currentUser", JSON.stringify(currentUserData));
            alert("Đăng nhập thành công");
            window.location.href = "http://localhost:1234/";
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu")

        }
    })
}
document.addEventListener('DOMContentLoaded', function () {
    form_login();
});

const showAvUser = async () => {
    const render = document.querySelector('.nav_show_av_user');
    let html = '';

    if (!render) {
        return;
    }

    // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        html = `
            <div class="flex items-center ms-3">
                <div>
                    <button type="button"
                        class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded="false" data-dropdown-toggle="dropdown-user">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-8 h-8 rounded-full"
                            src="https://e7.pngegg.com/pngimages/694/639/png-clipart-computer-icons-user-profile-female-symbol-miscellaneous-purple.png"
                            alt="${userData.user_name_us}">
                    </button>
                </div>
                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user">
                    <div class="px-4 py-3" role="none">
                        <p class="text-sm text-gray-900 dark:text-white" role="none">
                            ${userData.user_name_us}
                        </p>
                    </div>
                    <ul class="py-1" role="none">
                        <li>
                            <a href="http://localhost:1234/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem">Dashboard</a>
                        </li>
                            <div class="btn_nav_logout block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem">Sign out</div>
                        </li>
                    </ul>
                </div>
            </div>`;
    } else {
        html = `<a href="http://localhost:1234/register"><i class="fa-regular fa-user text-[24px]"></i></a>`;
    }

    render.innerHTML = html;
}

showAvUser();

const nav_logout = async () => {
    const btns = document.querySelectorAll('.btn_nav_logout');

    if (!btns) {
        return;
    }

    // Loop through each button
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hiển thị hộp thoại xác nhận
            const confirmed = confirm("Bạn có chắc chắn muốn đăng xuất?");

            // Nếu người dùng xác nhận muốn đăng xuất
            if (confirmed) {
                // Xóa thông tin người dùng khỏi Local Storage
                localStorage.removeItem('currentUser');
                location.reload();
            }
        });
    });
}
nav_logout();


const showAvUserSp = async () => {
    const render = document.querySelector('.nav_show_av_user_sp');
    let html = '';

    if (!render) {
        return;
    }
    // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        html = `
            <div class="flex items-center ms-3">
               
<button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" class="flex items-center text-sm  font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
<span class="sr-only">Open user menu</span>
<img class="w-8 h-8  rounded-full" src="https://e7.pngegg.com/pngimages/694/639/png-clipart-computer-icons-user-profile-female-symbol-miscellaneous-purple.png" alt="user photo">
</svg>
</button>

<!-- Dropdown menu -->
<div id="dropdownAvatarName" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div class="truncate">${userData.user_name_us}</div>
    </div>
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
      <li>
        <a href="http://localhost:1234/profile" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
    </ul>
    <div class="py-2">
      <div  class="btn_nav_logout block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</div>
    </div>
</div>

            </div>`;
    } else {
        html = `<a href="http://localhost:1234/register"><i class="fa-regular fa-user text-[24px]"></i></a>`;
    }

    render.innerHTML = html;
}

showAvUserSp();

const admin_delete__user = async (id) => {
    try {
        const confirmation = confirm("Bạn có chắc chắn muốn xóa user này?");

        if (confirmation) {
            const response = await fetch(`http://localhost:3000/users/delete/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            // console.log(data.message);
            alert("Xóa user thành công");
            show_admin_user(); // Cập nhật danh sách sản phẩm
        }

    } catch (error) {
        console.log("Looix: ".error);
    }
}

const show_admin_user = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();

    const render = document.querySelector('.admin_show_user');
    let html = '';


    if (!render) {
        return;
    }

    data.forEach(item => {
        // console.log(item);
        html += `
        
        <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            # ${item._id}
        </th>
        <td class="px-6 py-4">
            <img src="http://localhost:3000/images/${item.image_us}" class="w-20 h-20 object-cover" alt="">
        </td>
        <td class="px-6 py-4">
            ${item.user_name_us}
        </td>
        <td class="px-6 py-4">
            ${item.email_us}
        </td>
        <td class="px-6 py-4 text-right">
            <div>
                <button onclick="admin_delete__user('${item._id}')">
                    <kbd
                        class="px-2 py-1.5 text-xs font-semibold text-white bg-red-300 border rounded-lg hover:bg-red-600">Xóa</kbd>
                </button>
                <a href="">
                    <kbd
                        class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-400">Sửa
                    </kbd>
                </a>
            </div>
        </td>
    </tr>
        `;

        render.innerHTML = html;
    });
}
show_admin_user();

const show_admin_order = async () => {
    try {
        const response = await fetch('http://localhost:3000/orders');
        const data = await response.json();

        const render = document.querySelector('.show_admin_order');
        let html = '';


        if (!render) {
            return;
        }

        data.forEach(item => {
            console.log(item);
            html += `                            <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                # ${item._id}
            </th>
            <td class="px-6 py-4">
                ${item.orderDate}
            </td>
            <td class="px-6 py-4">
                ${formatCurrency(item.totalAmount)}
            </td>
            <td class="px-6 py-4">
                ${item.status}
            </td>
            <td class="px-6 py-4 text-right">
                <div>
                    <a href="">
                        <kbd
                            class="px-2 py-1.5 text-xs font-semibold text-white bg-red-300 border rounded-lg hover:bg-red-600">Xóa</kbd>
                    </a>
                    <a href="http://localhost:1234/admin_order_detail?id_order=${item._id}">
                        <kbd
                            class="px-2 py-1.5 text-xs font-semibold text-white bg-primary border rounded-lg hover:bg-secondary">Chi
                            tiết</kbd>
                    </a>
                    <span class="relative">

                        <button id=""
                            class="btn_dropdown text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-xs px-2 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button">Trạng thái <svg class="w-2.5 h-2.5 ms-3"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <!-- Dropdown menu -->
                        <div id=""
                            class="box_dropdown z-10 absolute right-0 top-8 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <a href=""
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                                        out</a>
                                </li>
                            </ul>
                        </div>

                    </span>

                </div>
            </td>
        </tr>`;
            render.innerHTML = html;
        })
    } catch (error) {
        console.log("Loi: ", error);
    }
}
show_admin_order();


const show_admin_order_detail = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id_order');

    if (!orderId) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}`);
        const data = await response.json();
        console.log(data);

        const render = document.querySelector('.admin_show_order_detail');
        if (!render) {
            return;
        }
        let html = '';

        data.forEach((item) => {
            html += `
                <div>
                    <div class="flex flex-col justify-start mb-5">
                        <div>Đang xem đơn hàng : #<span>${item._id}</span></div>
                        <div>Ngày đặt : <span>${item.orderDate}</span></div>
                        <div>Trạng thái : <kbd class="px-2 py-1.5 text-xs font-semibold text-white bg-primary border rounded-lg">Chi tiết</kbd></div>
                        <div>Tổng tiền : <span>${formatCurrency(item.totalAmount)} VND</span></div>
                    </div>

                    <div>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg h-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-auto">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">ID</th>
                                        <th scope="col" class="px-6 py-3">Ảnh</th>
                                        <th scope="col" class="px-6 py-3">Tên</th>
                                        <th scope="col" class="px-6 py-3">Giá</th>
                                        <th scope="col" class="px-6 py-3">Số lượng</th>
                                        <th scope="col" class="px-6 py-3">Tổng giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"># ${item.productId}</th>
                                        <td class="px-6 py-4"><img src="${item.productImage}" class="w-20 h-20 object-cover" alt=""></td>
                                        <td class="px-6 py-4">${item.productName}</td>
                                        <td class="px-6 py-4">${formatCurrency(item.productPrice)}</td>
                                        <td class="px-6 py-4">${item.quantity}</td>
                                        <td class="px-6 py-4">${formatCurrency(item.totalPrice)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>`;
        });

        render.innerHTML = html;

    } catch (error) {
        console.log("Loi: ", error);
    }
}

show_admin_order_detail();

const show_infor_user_checkout = async () => {
    // Lấy dữ liệu người dùng từ local storage
    const userDataJSON = localStorage.getItem('currentUser');

    if (userDataJSON) {
        // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
        const userData = JSON.parse(userDataJSON);

        // Lấy _id từ đối tượng userData
        const userID = userData._id;
        try {
            // Gửi yêu cầu đến máy chủ để lấy dữ liệu người dùng dựa trên _id
            const response = await fetch(`http://localhost:3000/users/${userID}`);
            const userDataFromServer = await response.json();

            // Lấy ra các phần tử input trong form

            const emailCheckout = document.querySelector('.email_checkout');
            const nameCheckout = document.querySelector('.name_checkout');
            const phoneCheckout = document.querySelector('.phone_checkout');
            const addressCheckout = document.querySelector('.address_checkout');

            // Gán giá trị từ dữ liệu người dùng

            emailCheckout.value = userDataFromServer.email_us ? userDataFromServer.email_us : "";
            nameCheckout.value = userDataFromServer.name_us ? userDataFromServer.name_us : "";
            phoneCheckout.value = userDataFromServer.phone_us ? userDataFromServer.phone_us : "";
            addressCheckout.value = userDataFromServer.address_us ? userDataFromServer.address_us : "";

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu người dùng từ máy chủ:', error);
        }
    } else {
        console.log("Không có dữ liệu người dùng trong local storage.");
    }
}
show_infor_user_checkout();

const show_infor_user = async () => {
    // Lấy dữ liệu người dùng từ local storage
    const userDataJSON = localStorage.getItem('currentUser');

    if (userDataJSON) {
        // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
        const userData = JSON.parse(userDataJSON);

        // Lấy _id từ đối tượng userData
        const userID = userData._id;
        // console.log(userID);
        try {
            // Gửi yêu cầu đến máy chủ để lấy dữ liệu người dùng dựa trên _id
            const response = await fetch(`http://localhost:3000/users/${userID}`);
            const userDataFromServer = await response.json();

            // Lấy ra các phần tử input trong form
            const userNameInput = document.querySelector('.profile_userName');
            const nameInput = document.querySelector('.profile_name');
            const emailInput = document.querySelector('.profile_email');
            const phoneInput = document.querySelector('.profile_phone');
            const addressInput = document.querySelector('.profile_address');

            const emailCheckout = document.querySelector('.email_checkout');
            const nameCheckout = document.querySelector('.name_checkout');
            const phoneCheckout = document.querySelector('.phone_checkout');
            const addressCheckout = document.querySelector('.address_checkout');

            // Gán giá trị từ dữ liệu người dùng
            userNameInput.value = userDataFromServer.user_name_us;
            nameInput.value = userDataFromServer.name_us;
            emailInput.value = userDataFromServer.email_us;
            phoneInput.value = userDataFromServer.phone_us ? userDataFromServer.phone_us : "";
            addressInput.value = userDataFromServer.address_us ? userDataFromServer.address_us : "";

            emailCheckout.value = userDataFromServer.email_us ? userDataFromServer.email_us : "";
            nameCheckout.value = userDataFromServer.name_us ? userDataFromServer.name_us : "";
            phoneCheckout.value = userDataFromServer.phone_us ? userDataFromServer.phone_us : "";
            addressCheckout.value = userDataFromServer.address_us ? userDataFromServer.address_us : "";

            // Đảm bảo ảnh đại diện được hiển thị nếu có
            const previewImg = document.getElementById('profile_previewImg');
            if (userDataFromServer.avatar) {
                previewImg.src = userDataFromServer.avatar;
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu người dùng từ máy chủ:', error);
        }
    } else {
        console.log("Không có dữ liệu người dùng trong local storage.");
    }
}
show_infor_user();



// Xử lý sự kiện khi form được gửi đi
document.querySelector('.profile_user').addEventListener('submit', async function (event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy các giá trị từ các trường input
    const userName = document.querySelector('.profile_userName').value;
    const name = document.querySelector('.profile_name').value;
    const email = document.querySelector('.profile_email').value;
    const phone = document.querySelector('.profile_phone').value;
    const address = document.querySelector('.profile_address').value;

    const userDataJSON = localStorage.getItem('currentUser');
    const userData = JSON.parse(userDataJSON);
    const userID = userData._id;

    // Tạo payload để gửi lên server
    const payload = {
        name_us: name,
        user_name_us: userName,
        email_us: email,
        phone_us: phone,
        address_us: address
    };

    try {
        const response = await fetch(`http://localhost:3000/users/edit/${userID}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Cập nhật thông tin người dùng thất bại');
        }

        const responseData = await response.json();
        alert("Cập nhật thành công")
        // Thực hiện các thao tác khác sau khi cập nhật thành công
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        // Xử lý lỗi và hiển thị thông báo cho người dùng nếu cần
    }
});


const render_order_user = async () => {
    const userDataJSON = localStorage.getItem('currentUser');
    const userData = JSON.parse(userDataJSON);
    const userID = userData._id;

    try {
        const response = await fetch(`http://localhost:3000/orders/userbyid/${userID}`);
        const orderDataFromServer = await response.json();

        const render = document.querySelector('.render_order_by_id_user');
        let html = '';

        if (!render) {
            return;
        }

        orderDataFromServer.forEach((item) => {
            html += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${item._id}
            </th>
            <td class="px-6 py-4">
                ${item.orderDate}
            </td>
            <td class="px-6 py-4">
                ${item.status}
            </td>
            <td class="px-6 py-4">
                ${formatCurrency(item.totalAmount)}
            </td>
            <td class="px-6 py-4">
                <div class="dropdown">
                    <button onclick="myFunction()" class="dropbtn py-2">Dropdown</button>
                    <div id="myDropdown"
                        class="dropdown-content p-2 w-[100px] top-6 border border-primary bg-white rounded-lg">
                        <a class="py-1 hover:text-primary" href="#home">Home</a>
                        <a class="py-1 hover:text-primary" href="#about">About</a>
                        <a class="py-1 hover:text-primary" href="#contact">Contact</a>
                    </div>
                </div>
            </td>
        </tr>`;

            render.innerHTML = html;
        })
    } catch (error) {

    }
}
render_order_user();

