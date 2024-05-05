import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const user = await currentUser();

    const userInfo = {};

    const userData = {
        id: "FROM DATABASE",
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    }

    return (
        <main className="mx-auto bg-dark-1 flex text-light-2 max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="text-2xl head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular">Complete your profile now to use Revibe</p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    )
}

export default Page;