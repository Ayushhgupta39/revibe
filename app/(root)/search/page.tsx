import PostItem from "@/components/forms/PostItem";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import Image from "next/image";
import PostsTab from "@/components/shared/PostsTab";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;
  
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>
        </section>
    )    
}

export default Page;