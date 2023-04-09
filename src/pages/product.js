import productImg from '../assets/product_img.jpeg'
const Product = () =>{
    return             <section>
    <h2 className="heading2">Our Product</h2>
    <div className="product-section">


        <div className="product-image">
            <img src={productImg} alt="Product Image"/>
            <a href="https://github.com/sajanpoudel/Kissan" className="product-link">View Product</a>
        </div>
        <div className="product-description">
            <h2>Kissan</h2>
            <p>Farmers still grow their plants, seeds, and crops today without the aid of technology or the right understanding of the soil. They only raise the crops in accordance with their needs. When the crops don't develop properly, they employ toxic liquids, medications, and sanitizers. Kissan was created with the goal of using the extraordinary amount of data currently accessible to discover the best sustainable farming method in the future.</p>
        </div>
    </div>
</section>
} 
export default Product