export default function LoginComponent({
  handleGoogleSignIn,
  loading,
}: {
  handleGoogleSignIn: () => void;
  loading: boolean;
}) {
  if (loading)
    return (
      <div className="flex items-center justify-center ">
        <div className="flex items-center gap-2 text-teal text-md sm:text-lg font-medium">
          <span className="h-5 w-5 rounded-full border-2 border-teal border-t-transparent animate-spin" />
          <span>Rerouting...</span>
        </div>
      </div>
    );
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <button
        onClick={handleGoogleSignIn}
        className="px-12 py-4 rounded-md bg-secondary text-moreWhite hover:bg-secondary/80 text-lg transition duration-200 font-semibold"
      >
        Sign in with Google
      </button>
    </div>
  );
}
