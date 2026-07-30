"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function AddToCartButton({
  productId,
  slug,
  categorySlug,
  name,
  price,
}: {
  productId: string;
  slug: string;
  categorySlug: string;
  name: string;
  price: number | null;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({ productId, slug, categorySlug, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <MagneticButton strength={0.2}>
      <button
        type="button"
        onClick={handleClick}
        className="rounded-pill bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white"
      >
        {added ? "Добавлено ✓" : "В корзину"}
      </button>
    </MagneticButton>
  );
}
