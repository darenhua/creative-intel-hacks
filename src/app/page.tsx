import { redirect } from "next/navigation";

export default async function Home() {
    const username = "linkedin-demo";
    redirect(`/${username}/projects`);
    return null;
    // return <LandingPage onLogin={handleLogin} />;
}
