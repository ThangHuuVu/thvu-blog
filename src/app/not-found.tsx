import Link from "next/link";
import NotFoundCanvas from "./not-found-canvas";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-card">
        <NotFoundCanvas />
        <div className="not-found-text">
          <h1>404</h1>
          <div className="not-found-row">
            <span>page not found.</span>
            <Link className="link" href="/">
              back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
