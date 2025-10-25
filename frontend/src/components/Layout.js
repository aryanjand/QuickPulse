import { Helmet } from "react-helmet";

export default function Layout({ children }) {
  if (typeof document !== "undefined") document.title = "QuickPulse";

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>QuickPulse</title>
      </Helmet>
      {children}
    </>
  );
}
