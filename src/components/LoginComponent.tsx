import Image from "next/image";

export default function LoginComponent({
  handleGoogleSignIn,
  loading,
}: {
  handleGoogleSignIn: () => void;
  loading: boolean;
}) {
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-teal text-md sm:text-lg font-medium">
          <span className="h-5 w-5 rounded-full border-2 border-teal border-t-transparent animate-spin" />
          <span>Rerouting...</span>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-background">
      <button
        onClick={handleGoogleSignIn}
        className="py-3 px-8 sm:px-12 sm:py-4 rounded-lg bg-secondary text-moreWhite hover:bg-secondary/80 text-md sm:text-lg transition duration-200 font-semibold"
      >
        Sign in with Google
      </button>
    </div>
  );
}
