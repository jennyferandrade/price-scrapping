import { Link } from "remix";
import type {Product} from "~/utils/product.server";

export interface ProductProps {
  product: Product;
}

// TODO: create scrollable list of skills

export function ProductCard({product}: ProductProps) {
  return (
    <div className="skill">
      <h4>{product.header}</h4>
      <p className="skill-description">{product.description}</p>
      {
        product.link ? (
          <Link to={product.link}>
            Monitorear
          </Link>
        ) : null
      }
    </div>
  );
}
