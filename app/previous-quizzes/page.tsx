import { get_top_100_users } from "@/lib/database";
import LeaderboardPage from "@/components/leaderboard-page";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { get_user_from_email, get_today_quiz, get_previous_quizzes } from "@/lib/database";
import PreviousQuizzesPage from "@/components/previous-quizzes-page";

export default async function PreviousQuizzes() {
  await getServerSession(authOptions);
  const previousQuizzes = await get_previous_quizzes();

  return (
    <PreviousQuizzesPage previousQuizzes={JSON.parse(JSON.stringify(previousQuizzes))}/>
  );
}