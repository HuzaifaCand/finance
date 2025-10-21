import localFont from "next/font/local";
import Loading from "./Loading";

const aquire = localFont({
  src: [
    {
      path: "../../public/fonts/Aquire.otf",
    },
  ],
});

export default function LoginComponent({
  handleGoogleSignIn,
  loading,
}: {
  handleGoogleSignIn: () => void;
  loading: boolean;
}) {
  if (loading) return <Loading text="Routing" />;
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-background">
      <div className="text-center mb-4">
        <div className={aquire.className}>
          <h1 className="text-4xl sm:text-5xl text-moreWhite mb-3">
            FINANCE<span className="text-teal">HK</span>
          </h1>
        </div>
        <p className="text-muted max-w-[300] text-xs sm:text-sm">
          Lightweight, fast, efficient finance tracker for students in Hong
          Kong.{" "}
        </p>
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="py-3.5 px-16 sm:px-24 rounded-lg bg-secondary focus:outline-none focus:bg-secondary/80 text-moreWhite hover:bg-secondary/80 text-sm sm:text-md  transition duration-200 font-semibold"
      >
        Sign in with Google
      </button>
    </div>
  );
}
