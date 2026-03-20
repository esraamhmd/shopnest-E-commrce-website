import { useRef, useState, useEffect } from "react";
import "./Categorynav.css";

// Redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setActiveCategory } from "../store/slices/categorySlice";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  setActiveCategory as setProductsCategory,
} from "../store/slices/ProductsSlice";

import downArrowIcon from "../assets/icons/down-arrow.png";

function CategoryNav() {
  const dispatch = useAppDispatch();

  // ── Redux state ──────────────────────────────────────────
  const categories = useAppSelector((state) => state.products.categories);
  const activeCategory = useAppSelector(
    (state) => state.category.activeCategory,
  );

  // ── Local UI state ───────────────────────────────────────
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ── Fetch categories on mount ────────────────────────────
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ── Scroll arrows ────────────────────────────────────────
  function updateArrows() {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [categories]);

  // ── Category click → update both slices + fetch products ─
  function handleCategoryClick(slug: string) {
    dispatch(setActiveCategory(slug));
    dispatch(setProductsCategory(slug));

    if (slug === "all") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(slug));
    }
  }

  // Format slug → readable label e.g. "mens-shirts" → "Men's Shirts"
  function formatLabel(slug: string): string {
    if (slug === "all") return "All";
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <nav className="category-nav">
      <div className="container">
        <div className="category-nav-wrapper">
          {/* Left arrow */}
          <button
            className={`scroll-arrow left ${!canScrollLeft ? "hidden" : ""}`}
            onClick={() =>
              trackRef.current?.scrollBy({ left: -240, behavior: "smooth" })
            }
            aria-label="Scroll left"
          >
            <img
              src={downArrowIcon}
              alt="←"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>

          {/* Track */}
          <div className="category-nav-track" ref={trackRef}>
            {/* "All" tab always first */}
            <button
              className={`category-nav-item ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryClick("all")}
            >
              All
            </button>

            {categories.map((slug) => (
              <button
                key={slug}
                className={`category-nav-item ${activeCategory === slug ? "active" : ""}`}
                onClick={() => handleCategoryClick(slug)}
              >
                {formatLabel(slug)}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            className={`scroll-arrow right ${!canScrollRight ? "hidden" : ""}`}
            onClick={() =>
              trackRef.current?.scrollBy({ left: 240, behavior: "smooth" })
            }
            aria-label="Scroll right"
          >
            <img
              src={downArrowIcon}
              alt="→"
              style={{ transform: "rotate(-90deg)" }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CategoryNav;
