import Profile from "@/components/Profile";

export const metadata = {
  title: "shimmerthelabel — Profile",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full bg-[var(--bg)]">
      <Profile />
    </div>
  );
}
