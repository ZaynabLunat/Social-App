import { NoUser } from "@/components/NoUser";
import { ProfileForm } from "@/components/ProfileForm";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const user = await currentUser();
}

// not signed in - don't carry on - sign in!
if (!user) {
  return <NoUser />;
}

// check database to see if theres a profile with this clerk_id
const response = await db.query(`SELECT * FROM profiles WHERE clerk_id = $1`, [
  user.id,
]);

// if we dont have a profle, show the form to add one
if (response.rowCount === 0) {
  return <ProfileForm />;
}

// have a profile - show the details
const profile = response.rows[0];

return (
  <div>
    <h2>{profile.username}</h2>
    <p>{profile.bio}</p>
  </div>
);
