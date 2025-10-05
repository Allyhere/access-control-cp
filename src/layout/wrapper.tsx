import { type PropsWithChildren } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

function Wrapper({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="h-full w-full grid rows-[1fr_max-content_1fr]">
        {children}
      </main>
      <Footer />
    </>
  );
}

export { Wrapper };
