import ProductItem from './ProductItem';

const ProductList = ({ products, formatPrice }) => {
  return (
    <>
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product, index) => (
          <ProductItem
            key={index}
            index={index}
            product={product}
            formatPrice={formatPrice}
          />
        ))}
      </ul>
    </>
  );
};

export default ProductList;
