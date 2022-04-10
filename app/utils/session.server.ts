import { createCookieSessionStorage, redirect } from "remix";
import path from "path";
import { promises as fs } from "fs";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";

const bcrypt = require('bcryptjs');
const usersPath = path.join(__dirname, "../", "users");

type LoginForm = {
  username: string;
  password: string;
};

function isValidUserAttributes(
    attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.password && attributes?.id;
}
export type PostMarkdownAttributes = {
  password: string;
  id: string;
};

export type User = {
  user: string;
  passwordHash: string;
  id: string;
}


export async function getUserInfo(user: string) {
  const filepath = path.join(usersPath, user + ".md");
  let file
  try {
    file = await fs.readFile(filepath);
  } catch (err) {
    console.log(`********** not user found on:${filepath}`)
    return  { user : '', passwordHash: '', id: ''}
  }
  const { attributes } = parseFrontMatter(file.toString());
  invariant(
      isValidUserAttributes(attributes),
      `User ${filepath} is invalid`
  );
  return { user, passwordHash: attributes.password, id: attributes.id};
}

export async function register({ username, password }: LoginForm) {
  let passwordHash = await bcrypt.hash(password, 10);
  return { passwordHash };
}

export async function login({ username, password }: LoginForm) {
  let { user, passwordHash, id} = await getUserInfo(username);
  if (!user) return null;
  const isCorrectPassword = await bcrypt.compare(password, passwordHash);
  if (!isCorrectPassword) return null;
  return {user, passwordHash, id};
}

let sessionSecret = process.env.SESSION_SECRET || 'secret-replace-me';
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

let { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(request: Request) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (!userId || typeof userId !== "string") throw redirect("/login");
  return userId;
}

async function getAllUsers() {
  const dir = await fs.readdir(usersPath);
  return Promise.all(
      dir.map(async filename => {
        const file = await fs.readFile(
            path.join(usersPath, filename)
        );
        const { attributes } = parseFrontMatter(
            file.toString()
        );
        invariant(
            isValidUserAttributes(attributes),
            `${filename} has bad meta data!`
        );

        return {
          username: filename.replace('.md', ''),
          passwordHash: attributes.password,
          id: attributes.id
        };
      })
  );
}

export async function getUser(request: Request) {
  let userId = await getUserId(request);
  if (typeof userId !== "string") return null;
  let users = await getAllUsers()

  try {
    let user = users.find(userData => userData.id === userId);
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  let session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}

export async function createUserSession(userId: string, redirectTo: string) {
  let session = await getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
