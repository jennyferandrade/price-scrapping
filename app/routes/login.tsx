import {
  ActionFunction,
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from "remix";
import { useActionData, Form } from "remix";
import { login, createUserSession } from "~/utils/session.server";
import stylesUrl from "../styles/login.css";
import {Header} from "~/components/header";
import {useState} from "react";

export let meta: MetaFunction = () => {
  return {
    tittle: "Price scrapping | Login",
    description: "Login to start monitoring your product prices!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${
        60 * 60 * 24 * 30
    }`,
  };
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Debes llenar este campo con tu usuario`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Debes llenar este campo con tu password`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: { username: string | undefined; password: string | undefined };
  fields?: { username: string; password: string };
};

export let action: ActionFunction = async ({
                                             request,
                                           }): Promise<Response | ActionData> => {
  let { username, password } = Object.fromEntries(
      await request.formData()
  );
  if (
      typeof username !== "string" ||
      typeof password !== "string"
  ) {
    return { formError: `Algo salio mal, datos nos validos` };
  }

  let fields = { username, password };
  let fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

  const user = await login({ username, password });
  if (!user) {
    return {
      fields,
      formError: `Usuario/Contraseña estan incorrectos, por favor verificalos.`,
    };
  }
  return createUserSession(user.id, "/my-robot");

};


export default function Login() {
  const actionData = useActionData<ActionData | undefined>();
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="tittle">
          <img src="/robot.png" alt="tu robot" className="robot-image"/>
          <h1>Price Scraper</h1>
        </div>
        <p className="subtitle">Te ayudamos a monitorear precios</p>
        <div className="content">
          <h2>Iniciar sesión</h2>
          <p className="help-text">Ingresa tu usuario y contraseña para empezar</p>
          <Form
              method="post"
              aria-describedby={
                actionData?.formError ? "form-error-message" : undefined
              }
          >
            <div>
              <input
                  type="text"
                  id="username-input"
                  name="username"
                  placeholder="Usuario"
                  defaultValue={actionData?.fields?.username}
                  aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                  aria-describedby={
                    actionData?.fieldErrors?.username ? "username-error" : undefined
                  }
              />
              {actionData?.fieldErrors?.username ? (
                  <p
                      className="form-validation-error"
                      role="alert"
                      id="username-error"
                  >
                    {actionData.fieldErrors.username}
                  </p>
              ) : null}
            </div>
            <div>
              <input
                  id="password-input"
                  name="password"
                  defaultValue={actionData?.fields?.password}
                  type={passwordShown ? "text" : "password"}
                  placeholder="Contraseña"
                  aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                  aria-describedby={
                    actionData?.fieldErrors?.password ? "password-error" : undefined
                  }
              />
              <div className="show-password">
                <input
                    type="checkbox"
                    id="password-shown"
                    name="passwordShown"
                    onChange={() => setPasswordShown(!passwordShown)}
                />
                <label htmlFor="password-shown" className="help-text">Mostrar contraseña</label>
              </div>
              {actionData?.fieldErrors?.password ? (
                  <p
                      className="form-validation-error"
                      role="alert"
                      id="password-error"
                  >
                    {actionData.fieldErrors.password}
                  </p>
              ) : null}
            </div>
            {actionData?.formError ? (
                <div id="form-error-message">
                  <p className="form-validation-error" role="alert">
                    {actionData.formError}
                  </p>
                </div>
            ) : null}
            <button type="submit" className="button">
              Empezar monitorear precios
            </button>
          </Form>
        </div>
        <br />
      </div>
    </main>
  );
}
