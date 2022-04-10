import { Links, LiveReload, Meta, Outlet, Scripts, useCatch, redirect } from "remix";
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";

import globalStylesUrl from "./styles/global.css";
import globalMediumStylesUrl from "./styles/global-medium.css";
import globalLargeStylesUrl from "./styles/global-large.css";
import React from "react";

export let loader: LoaderFunction = ({ request }) => {
    let url = new URL(request.url);
    let hostname = url.hostname;
    let proto = request.headers.get("X-Forwarded-Proto") ?? url.protocol;
    url.host =
        request.headers.get("X-Forwarded-Host") ??
        request.headers.get("host") ??
        url.host;
    url.protocol = "https:";
    if (proto === "http" && hostname !== "localhost") {
        return redirect(url.toString(), {
            headers: {
                "X-Forwarded-Proto": "https",
            },
        });
    }
    return {};
};

export let links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: globalStylesUrl },
        {
            rel: "stylesheet",
            href: globalMediumStylesUrl,
            media: "print, (min-width: 640px)",
        },
        {
            rel: "stylesheet",
            href: globalLargeStylesUrl,
            media: "screen and (min-width: 1024px)",
        },
    ];
};

export let meta: MetaFunction = () => {
  let description = `Price scraping`;
  return {
    viewport: "width=device-width,initial-scale=1",
    description,
    keywords: "scraping, price"
  };
};

function Document({
                      children,
                      title,
                  }: {
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <Meta />
            {title ? <title>{title}</title> : null}
            <Links />
        </head>
        <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
        </html>
    );
}

export default function App() {
  return (
      <Document title="Price scraping">
        <Outlet />
      </Document>
  );
}

export function CatchBoundary() {
    let caught = useCatch();

    return (
        <Document title={`${caught.status} ${caught.statusText}`}>
            <div className="error-container">
                <h1>
                    {caught.status} {caught.statusText}
                </h1>
            </div>
        </Document>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);

    return (
        <Document title="Uh-oh!">
            <div className="error-container">
                <h1>App Error</h1>
                <pre>{error.message}</pre>
            </div>
        </Document>
    );
}
