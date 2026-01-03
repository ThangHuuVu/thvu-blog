import Water from "./water";

export default function Home() {
  return (
    <div className="page">
      <Water />
      <main className="hero">
        <div className="name">
          <h1>thvu</h1>
          <section className="links">
            <div className="link-row">
              <a className="link" href="mailto:hi@thvu.dev">
                @
              </a>
              <a
                className="link"
                href="https://github.com/ThangHuuVu"
                target="_blank"
                rel="noreferrer"
              >
                gh
              </a>
              <a
                className="link"
                href="https://www.linkedin.com/in/thanghuuvu"
                target="_blank"
                rel="noreferrer"
              >
                in
              </a>
              <a
                className="link"
                href="https://x.com/thanghvu"
                target="_blank"
                rel="noreferrer"
              >
                x
              </a>
            </div>
          </section>
        </div>

        <span className="footer">© {new Date().getFullYear()} thang vu</span>
      </main>
    </div>
  );
}
