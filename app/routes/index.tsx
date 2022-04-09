import {LoaderFunction, redirect} from "remix";
import type { MetaFunction, HeadersFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Price scrapping",
    description: "Helping you to be more competitive on the market",
  };
};

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${
      60 * 60 * 24 * 30
    }`,
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  return redirect('/login', 302);
};
