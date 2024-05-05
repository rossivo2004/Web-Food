// products.controller.js
const mongoose = require('mongoose');

const productsModel = require('../model/productsModel');

async function getAllProduct() {
    try {
        const result = await productsModel.find();
        return result;
    } catch (error) {
        console.log('Loi: ', error);
        throw error;
    }
}

// Lấy sản phẩm nổi bật
async function getProductsHot() {
    try {
        const result = await productsModel.find().sort({ view_pr: -1 }).limit(8);
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

//lấy sản phẩm theo id
async function getProductById(id) {
    try {
        const result = await productsModel.findById(id);

        if (!result) {
            throw new Error('San pham khong ton tai')
        }
        return result;
    } catch (error) {
        console.log("Loi: ", error);
        throw error;
    }
}

// home show sản phẩm giảm giá bất kì
async function getDiscountedProducts() {
    try {
        const discountedProducts = await productsModel.aggregate([
            // Chỉ lấy các sản phẩm có giảm giá (discount_pr > 0)
            { $match: { discount_pr: { $gt: 0 } } },
            // Lấy mẫu ngẫu nhiên 4 sản phẩm
            { $sample: { size: 4 } }
        ]);
        return discountedProducts;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}


// lấy sản phẩm theo tag category
async function getProductByCategoryTag(categoryTag) {
    try {
        const result = await productsModel.find({ "category_pr.category_pr_tag": categoryTag });
        return result;
    } catch (error) {
        console.log('Lỗi khi lấy sản phẩm theo category tag:', error);
        throw error;
    }
}


async function getRelatedProducts(productId) {
    try {
        const product = await productsModel.findById(productId);
        if (!product) {
            throw new Error('Không tìm thấy sản phẩm');
        }
        const relatedProducts = await productsModel.find({ 'category_pr.category_pr_tag': product.category_pr.category_pr_tag, _id: { $ne: productId } }).limit(4).lean();
        return relatedProducts;
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm liên quan:', error);
        throw error;
    }
}


//Lấy danh sách sản phẩm theo trang và giới hạn số lượng
async function getProductsByPage(page, perPage) {
    try {
        // Tính toán chỉ số bắt đầu và kết thúc của sản phẩm cần lấy
        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;

        // Tìm kiếm sản phẩm dựa trên chỉ số bắt đầu và kết thúc
        const products = await productsModel.find().skip(startIndex).limit(perPage);

        return products;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm theo trang:', error);
        throw error;
    }
}

// thêm sản phẩm
async function insertProduct(body) {
    try {
        // Lấy thông tin từ form
        const { name_pr, description_pr, description_pr_detail, image_pr_1, price_pr, discount_pr, quantity_pr, view_pr, weight_pr, sale_pr, rating_pr, category_pr_tag } = body;

        // Tạo đối tượng productModel với dữ liệu đã được thiết lập giá trị mặc định
        const productData = {
            name_pr,
            category_pr: {
                // category_pr_name,
                category_pr_tag
            },
            price_pr: price_pr || 0,
            image_pr: {
                image_pr_1,
            },
            description_pr,
            description_pr_detail,
            discount_pr: discount_pr || 0,
            quantity_pr: quantity_pr || 0,
            view_pr: view_pr || 0,
            weight_pr: weight_pr || 0,
            sale_pr: sale_pr || 0,
            rating_pr: rating_pr || 0
        };

        // Tạo đối tượng productModel với dữ liệu đã được thiết lập giá trị mặc định
        const proNew = new productsModel(productData);

        const result = await proNew.save();
        return result;
    } catch (error) {
        console.log('Lỗi insert product: ', error);
        throw error;
    }
}

//xóa theo id
async function removeProduct(id) {
    try {
        const result = await productsModel.findByIdAndDelete(id)
        return result
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// cập nhật sản phẩm theo id
async function updateByIdProduct(id, body) {
    try {
        const pro = await productsModel.findById(id)
        if (!pro) {
            throw new Error('Không tìm thấy sản phẩm')
        }
        const { name_pr, description_pr, description_pr_detail, image_pr_1, price_pr, discount_pr, quantity_pr, view_pr, weight_pr, sale_pr, rating_pr, category_pr_tag } = body;
        const result = await productsModel.findByIdAndUpdate(id, { name_pr, description_pr, description_pr_detail, image_pr_1, price_pr, discount_pr, quantity_pr, view_pr, weight_pr, sale_pr, rating_pr, category_pr_tag }, { new: true })
        return result

    } catch (error) {
        console.log('Lỗi: ', error);
        throw error
    }
}

// tìm kiếm sản phẩm
async function searchProduct(keyword) {
    try {
        const result = await productsModel.find({ name_pr: { $regex: `.*${keyword}.*`, $options: 'i' } });
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}


module.exports = {
    getAllProduct, getProductsHot, getProductById, getProductByCategoryTag, getDiscountedProducts,
    getRelatedProducts, getProductsByPage, insertProduct, removeProduct, updateByIdProduct, searchProduct
};
