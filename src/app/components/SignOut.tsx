type SignOutProps = {
  handleSignOut: () => void;
};

export function SignOut({ handleSignOut }: SignOutProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <button
        className="w-full max-w-xs bg-gray-500 text-white rounded p-2 hover:bg-gray-600 transition"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
