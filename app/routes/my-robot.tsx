import { LinksFunction, LoaderFunction, MetaFunction, Outlet, redirect, useLoaderData } from "remix";
import stylesUrl from "../styles/robotPage.css";
import { getUser } from "~/utils/session.server";
import {Header} from "~/components/header";

type LoaderData = {
  user: { username: string };
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  if (!user) return redirect('/login', 302);
  return {
    user,
  };
};

export let meta: MetaFunction = () => {
  return {
    title: "Robot",
    description: "A robot that will scrap prices for you",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function MyRobot () {
  let data = useLoaderData<LoaderData>();

  return (
    <div className="robot-layout">
      <main className="robot-main">
      <Header username={data.user.username}/>
        <div className="robot-outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
