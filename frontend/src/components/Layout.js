import { Helmet } from "react-helmet";

export default function Layout({ title = "QuickPulse", children }) {
  if (typeof document !== "undefined") {
    document.title = title;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
}
