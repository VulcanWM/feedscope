import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { get_user_from_email, get_today_quiz } from "@/lib/database";
import QuizPage from '@/components/quiz-page';

export default async function Quiz() {
  const authUser = await getServerSession(authOptions);
  const email = authUser?.user?.email || null
  var loggedIn = false;
  var done = false;
  
  if (email != null){
    const userDoc = await get_user_from_email(email)
    if (userDoc != false){
        loggedIn = true;
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        done = userDoc.done.some((entry: { date: { getTime: () => number; }; }) => entry.date.getTime() === today.getTime());
    }
  }

  const quiz = await get_today_quiz()


  return (
    <QuizPage loggedIn={loggedIn} done={done} quiz={JSON.parse(JSON.stringify(quiz))}/>
  )
}