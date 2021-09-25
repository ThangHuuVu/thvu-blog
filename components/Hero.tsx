export default function Hero() {
  const data = ["Front-end", "Stuff", "Pizza"];
  return (
    <h1 className="w-full mt-14 mb-28 text-9xl leading-none tracking-tighter font-extrabold text-center">
      {data.map((d, i) => {
        const order = i + 1;
        return (
          <span
            key={d}
            data-content={d}
            className={`relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:text-center before:text-white before:animate-faded-background-${order}`}
          >
            <span
              className={`relative z-10 px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-${order}-start to-gradient-${order}-end animate-faded-foreground-${order}`}
            >
              {d}
            </span>
          </span>
        );
      })}
    </h1>
  );
}
