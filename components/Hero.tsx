export default function Hero() {
  return (
    <h1 className="w-full mt-14 mb-28 text-9xl ">
      <span
        data-content="Develop."
        className="
          relative block
          leading-none tracking-tighter
          font-extrabold text-transparent text-center bg-clip-text 
          bg-gradient-to-br from-gradient-1-start to-gradient-1-end 
          before:content-[attr(data-content)] before:w-full before:z-0 before:block 
          before:absolute before:top-0 before:bottom-0 before:left-0 
          before:text-center before:text-white
          before:animate-faded-background-1
        "
      >
        <span className="block animate-faded-foreground-1 relative z-10">Develop.</span>
      </span>
      <span
        data-content="Preview."
        className="
          relative block
          leading-none tracking-tighter
          font-extrabold text-transparent text-center bg-clip-text 
          bg-gradient-to-br from-gradient-2-start to-gradient-2-end 
          before:content-[attr(data-content)] before:w-full before:z-0 before:block 
          before:absolute before:top-0 before:bottom-0 before:left-0 
          before:text-center before:text-white
          before:animate-faded-background-2
        "
      >
        <span className="block animate-faded-foreground-2 relative z-10">Preview.</span>
      </span>
      <span
        data-content="Ship."
        className="
          relative block
          leading-none tracking-tighter
          font-extrabold text-transparent text-center bg-clip-text 
          bg-gradient-to-br from-gradient-3-start to-gradient-3-end 
          before:content-[attr(data-content)] before:w-full before:z-0 before:block 
          before:absolute before:top-0 before:bottom-0 before:left-0 
          before:text-center before:text-white
          before:animate-faded-background-3
      "
      >
        <span className="block animate-faded-foreground-3 relative z-10">Ship.</span>
      </span>
    </h1>
  );
}
