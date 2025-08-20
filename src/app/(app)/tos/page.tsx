export default function TosPage() {
  return (
    <div className="min-h-screen bg-background text-moreWhite p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-teal">Terms of Service</h1>

      <div className="max-w-2xl text-body space-y-4">
        <p>
          Welcome to Finance HK! By using this application, you agree to the
          following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold text-accent">1. Use of the App</h2>
        <p>
          This app is intended for personal and educational use only. You agree
          not to use it for any illegal or unauthorized purposes.
        </p>

        <h2 className="text-xl font-semibold text-accent">2. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account and password. You agree to notify us immediately of any
          unauthorized use of your account.
        </p>

        <h2 className="text-xl font-semibold text-accent">3. Data Privacy</h2>
        <p>
          All data you enter into the app is private and will not be shared with
          third parties. For details, please refer to our Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold text-accent">4. No Warranty</h2>
        <p>
          The app is provided "as is" without any warranties of any kind. We do
          not guarantee uninterrupted or error-free use.
        </p>

        <h2 className="text-xl font-semibold text-accent">5. Changes</h2>
        <p>
          We may update these Terms of Service from time to time. Continued use
          of the app constitutes acceptance of any changes.
        </p>

        <p className="mt-6 text-sm text-muted">Last updated: August 2025</p>
      </div>
    </div>
  );
}
