import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import PostsTab from "@/components/shared/PostsTab";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="text-white">
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab mx-4">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="flex tab items-center gap-2">
                {tab.icon}
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Posts" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                        {userInfo?.posts?.length}
                    </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {
            profileTabs.map((tab) => (
                <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                    <PostsTab
                        currentUserId={user.id}
                        accountId={userInfo.id}
                        accountType="User"
                    />
                </TabsContent>
            ))
          }
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
