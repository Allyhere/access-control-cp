import { type PropsWithChildren } from "react";

function Wrapper({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen w-full grid rows-[1fr_max-content_1fr]">
      {children}
    </main>
  );
}

export { Wrapper };
