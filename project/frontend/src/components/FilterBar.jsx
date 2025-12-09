import "./FilterBar.css";

export default function FilterBar({ onFilterChange }) {
  return (
    <div className="filter-bar">
      
      <select onChange={(e) => onFilterChange("price", e.target.value)}>
        <option value="">Sort by price</option>
        <option value="low">Increasing price</option>
        <option value="high">Decreasing price</option>
      </select>

      <select onChange={(e) => onFilterChange("size", e.target.value)}>
        <option value=""> Size</option>
        <option value="s">S</option>
        <option value="m">M</option>
        <option value="l">L</option>
        <option value="xl">XL</option>
      </select>

    </div>
  );
}
