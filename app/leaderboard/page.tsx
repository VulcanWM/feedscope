import { get_top_100_users } from "@/lib/database";
import LeaderboardPage from "@/components/leaderboard-page";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { get_user_from_email, get_today_quiz } from "@/lib/database";

export default async function Leaderboard() {
  const authUser = await getServerSession(authOptions);
  const email = authUser?.user?.email || null
  var points = null;
  
  if (email != null){
    const userDoc = await get_user_from_email(email)
    if (userDoc != false){
        points = userDoc.points
    }
  }
  const topUsers = await get_top_100_users();

  return (
    <LeaderboardPage topUsers={JSON.parse(JSON.stringify(topUsers))} points={points}/>
  );
}