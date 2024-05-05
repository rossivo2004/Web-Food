* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Reddit Mono, monospace;
}

.nav_menu__mobile {
  transition: all .5s;
}

.dropdown {
  align-items: center;
  display: flex;
  position: relative;
}

.dropdown-content {
  z-index: 1;
  display: none;
  position: absolute;
}

.dropdown-content a, .dropdown:hover .dropdown-content {
  display: block;
}

.prev, .next {
  cursor: pointer;
  color: #fff;
  -webkit-user-select: none;
  user-select: none;
  border-radius: 0 3px 3px 0;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  transition: all .6s;
  position: absolute;
  top: 50%;
}

.next {
  border-radius: 3px 0 0 3px;
  right: 0;
}

.slideshow-container {
  margin: auto;
  position: relative;
}

.header_scroll {
  transition: all .5s;
}

.sale-box:before, .sale-box:after {
  content: "";
  border-style: solid;
  width: 0;
  height: 0;
  position: absolute;
}

.sale-box:after {
  border-width: 50px 0 0 50px;
  border-color: #0000 #0000 #0000 #fff;
  bottom: -13px;
  right: -48px;
  transform: rotate(45deg);
}

.home_im1__inn {
  background-image: url("h1-img-7.2323d68f.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.home_im2__inn {
  background-image: url("s3qqpek5.0e773528.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.home_product__sale-banner {
  background-image: url("https://images.pexels.com/photos/1391487/pexels-photo-1391487.jpeg?auto=compress&cs=tinysrgb&w=600");
  background-repeat: no-repeat;
  background-size: cover;
}

.box_tranform {
  transition: all 1s;
  transform: translateX(1000px);
}

.box_tranform-overplay {
  transition: all 1s;
}

.box_opacity {
  opacity: 0;
}

.shop_filter__box {
  transition: all 1s;
}

.content-box {
  display: none;
}

.content-box.active {
  color: #fff;
  display: block;
}

.nav-list_item.active {
  color: #fff;
  background-color: #698141;
}

.admin_product__tg-edit {
  transform: translate3d(950.6px, 120.8px, 0) !important;
}

.box_dropdown {
  display: none;
}
/*# sourceMappingURL=admin_category.4a94d384.css.map */
