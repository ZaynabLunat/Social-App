import { SignInButton } from "@clerk/nextjs";

export default function NoUser() {
  return (
    <div>
      <p>Sign in for access</p>
      <SignInButton />
    </div>
  );
}
