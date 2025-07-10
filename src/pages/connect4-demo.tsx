import { useEffect, useRef, /*useState*/ } from "react";
import Head from "next/head";
import Link from "next/link";

const CONNECT4_GITHUB_URL = "https://github.com/TSSchaef/connect-4";
const ASPECT_RATIO = 5 / 4;

const Connect4Demo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /*const [containerWidth, setContainerWidth] = useState(320);

  // Responsive canvas sizing
  useEffect(() => {
    function handleResize() {
      const max = Math.min(window.innerWidth, 700);
      setContainerWidth(max - 32); // 32 = px-4 padding left + right
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);*/

  useEffect(() => {
    //@ts-expect-error Weird stuff with window.Module
    window.Module = {
      locateFile: (path: string) => `/connect4/${path}`,
      canvas: canvasRef.current,
    };

    if (!document.getElementById("connect4-glue-script")) {
      const script = document.createElement("script");
      script.id = "connect4-glue-script";
      script.src = "/connect4/connect-4.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
        //@ts-expect-error Weird stuff with window.Module
        delete window.Module;
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>Connect-4 Demo | Portfolio</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center px-4 py-8 bg-background text-foreground transition-colors">
        <div className="w-full max-w-2xl mx-auto">

          <section className="rounded-lg shadow-md border border-border bg-card p-6 mb-6">
          {/* Back navigation */}
          <div className="mb-4">
            <Link href="/" passHref legacyBehavior>
              <a className="inline-flex items-center text-sm px-3 py-1.5 rounded bg-muted hover:bg-muted-2 border border-border text-foreground transition-colors">
                ← Back to Projects
              </a>
            </Link>
          </div>

            <h1 className="text-2xl font-bold mb-4 text-center">Connect-4 Demo</h1>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-1">Overview</h2>
              <p className="text-muted-foreground text-sm">
                Play a classic game of Connect-4 right in your browser! This demo runs entirely client-side using WebAssembly for fast, native-like gameplay.
              </p>
            </div>

            {/* Responsive aspect-ratio game container */}
            <div
              className="w-full bg-muted rounded flex justify-center items-center mb-8"
              style={{
                aspectRatio: `${ASPECT_RATIO}`,
                maxWidth: 1000,
                margin: "0 auto",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <canvas
                ref={canvasRef}
                id="canvas"
                // The canvas must be styled to fill the parent absolutely
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  // Remove background if you want transparency
                  background: "transparent",
                  borderRadius: "inherit",
                  display: "block",
                }}
              />
            </div>

            {/* Technical Details BELOW, now always below the game */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-1">Technical Details</h2>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>WebAssembly (WASM) via Emscripten-compiled C++/SDL code</li>
                <li>Runs entirely client-side—no backend required</li>
                <li>Responsive, automatically resizes for desktop and mobile</li>
                <li>Integrated into this Next.js SSG portfolio as a standalone page</li>
              </ul>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href={CONNECT4_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 transition-colors"
              >
                <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                  <path d="M10 0C4.48 0 0 4.58 0 10.23c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.48 0-.23-.01-.84-.01-1.65-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.05 1.54 1.05.89 1.56 2.34 1.11 2.91.85.09-.65.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.29.09-2.7 0 0 .84-.28 2.75 1.05a9.34 9.34 0 012.5-.34c.85.01 1.7.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.54 1.41.19 2.44.09 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.96.68 1.94 0 1.4-.01 2.53-.01 2.87 0 .27.18.58.69.48C17.13 18.58 20 14.75 20 10.23 20 4.58 15.52 0 10 0z"/>
                </svg>
                View Source on GitHub
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Connect4Demo;
