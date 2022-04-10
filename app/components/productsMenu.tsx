import {Link, useLocation} from "remix";
import {Product} from "~/utils/product.server";

export interface HeaderProps {
  products: Array<Product>;
}

export function ProductsMenu({ products }: HeaderProps) {
  const location = useLocation()
  return (
    <div className="skills-menu">
      {products.map((product: Product) => (
        product.link ?
          <Link
            className={location.pathname.includes(product.link) ? "skill-link active" : "skill-link"}
            to={`/my-robot/${product.link}`}
            key={product.header}
          >
            <div>
              {product.header}
            </div>
            <div>
              {">"}
            </div>
          </Link>
          : null
      ))
      }
    </div>
  );
}
