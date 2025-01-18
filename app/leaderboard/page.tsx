import { get_top_100_users } from "@/lib/database"; // Make sure this function is correctly fetching the top users

export default async function LeaderboardPage() {
  // Fetch the top 100 users
  const topUsers = await get_top_100_users();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Leaderboard
        </h1>
      </div>

      <div className="w-full max-w-[700px] flex flex-col gap-3">
        {topUsers.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="font-bold text-lg">{index + 1}.</span>
              <span className="text-lg">{user.username}</span>
            </div>
            <span className="text-lg font-semibold">{user.points} points</span>
          </div>
        ))}
      </div>
    </section>
  );
}
