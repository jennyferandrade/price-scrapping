import {Form, Link, useLocation} from "remix";

export interface HeaderProps {
  username?: string;
}

export function Header({username}: HeaderProps) {
  const location = useLocation()
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className={username ? "home-link-user": "home-link"}>My robot skills</Link>
        {username ? (
          <div className="user-info">
            <span>{`Hola ${username}`}</span>
            <Form action="/logout" method="post">
              <button type="submit" className="button">
                Cerrar sesión
              </button>
            </Form>
          </div>
        ) : null}
      </div>
    </header>
  );
}
