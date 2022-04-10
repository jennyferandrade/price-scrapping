import {LoaderFunction, useCatch, useLoaderData} from "remix";
import { ProductCard } from "~/components/productCard";
import {getUserAvailableProducts} from "~/utils/product.server";

export let loader: LoaderFunction = async () => {
  return getUserAvailableProducts();
};

export default function Robot (){
  let product = useLoaderData();

  return (
    <div className="container">
      <div className="robot-greeting">
        <div>
          <h1>Hola, soy tu Robot</h1>
          <p className="subtitle">¿Qué productos te gustaría monitorear?</p>
        </div>
        <img src="/robot-transparent.png" alt="tu robot" className="robot-image"/>
      </div>
      <div className="robot-list">
        <ProductCard product={product.nikonD780}/>
        <ProductCard product={product.anotherProduct}/>
      </div>
    </div>
  )
}

export async function CatchBoundary() {
  let caught = useCatch();

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="error-container">
      Algo fue mal. Lo sentimos. Reportalo:
    </div>
  );
}
