const express = require('express');
const router = express.Router();
//import products from productController.js like array destrcturing
const { newProduct, getProducts, getAdminProducts, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


//we called our route by selecting route type like get post and put and pass our method to it getProducts
router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);


//get perticuler  product from the  database
router.route('/product/:id').get(getSingleProduct);

//post new product in database
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
//admin can update,delete the  product
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


//create a review by user
router.route('/review').put(isAuthenticatedUser, createProductReview);
//Get all the reviews for a perticular product
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
//Delete A review by Admin
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);



//exports all routes and will import in our app.js file
module.exports = router;