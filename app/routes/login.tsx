import {
  HeadersFunction,
  MetaFunction,
} from "remix";

export let meta: MetaFunction = () => {
  return {
    tittle: "Price scrapping | Login",
    description: "Login to start monitoring your product prices!",
  };
};

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${
      60 * 60 * 24 * 30
    }`,
  };
};


export default function Login() {

  return (
    <main>
      under construction
    </main>
  );
}
