import {LinksFunction, LoaderFunction, Outlet, useLoaderData} from "remix";
import stylesUrl from "~/styles/skills.css";
import {getUserAvailableProducts} from "~/utils/product.server";
import {ProductsMenu} from "~/components/productsMenu";

export let links: LinksFunction = () => {
  return [{rel: "stylesheet", href: stylesUrl}];
};

export let loader: LoaderFunction = async () => {
  let userAvailableSkills = getUserAvailableProducts();
  return {
    products: Object.values(userAvailableSkills),
  };
};

export default function Product() {
  let { products } = useLoaderData();

  return (
    <div className="skills-layout">
      <ProductsMenu products={products} />
      <div className="skill-section">
        <Outlet/>
      </div>
    </div>
  );
}
