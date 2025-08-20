export default function LoginComponent({
  handleGoogleSignIn,
}: {
  handleGoogleSignIn: () => void;
}) {
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
