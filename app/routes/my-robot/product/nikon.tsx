import {LoaderFunction, Outlet, redirect} from "remix";
import {getUser} from "~/utils/session.server";

export const loader: LoaderFunction = async ({request}) => {
  let user = await getUser(request);
  if (!user) return redirect('/login', 302);
  return null;
};

export default function Nikon() {
  return (
    <Outlet/>
  );
}
