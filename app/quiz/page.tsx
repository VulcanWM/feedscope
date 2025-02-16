import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { get_user_from_email, get_today_quiz } from "@/lib/database";
import QuizPage from '@/components/quiz-page';

export default async function Quiz() {
  // const authUser = await getServerSession(authOptions);
  // const email = authUser?.user?.email || null
  // var loggedIn = false;
  // var done = false;
  
  // if (email != null){
  //   const userDoc = await get_user_from_email(email)
  //   if (userDoc != false){
  //       loggedIn = true;
  //       const now = new Date();
  //       const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  //       done = userDoc.done.some((entry: { date: { getTime: () => number; }; }) => entry.date.getTime() === today.getTime());
  //   }
  // }

  // const quiz = await get_today_quiz()


  // return (
  //   <QuizPage loggedIn={loggedIn} done={done} quiz={JSON.parse(JSON.stringify(quiz))}/>
  // )
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Shutting Down My Daily Quiz Project – Here’s What I Learned
        </h1>
      </div>
      <p>Hey everyone,</p>
      <p>A few weeks ago, I launched a daily quiz platform as a quick experiment – built it in a weekend, launched it, and got some solid engagement. But now, I’ve decided to shut it down.</p>
      <h2 className="text-2xl font-bold">Why?</h2>
      <ul className="list-disc list-inside">
        <li>It was a fun idea, but not something I want to keep maintaining.</li>
        <li>Engagement was decent, but not enough to justify further work.</li>
        <li>Learned a lot about launching quickly and user behaviour!</li>
      </ul>
      <p>This was a great experience, and I might revisit something similar in the future, but for now, I’m moving on to other projects.</p>
      <p>If you’re curious about the process, happy to answer any questions!</p>
      <p>Thanks to everyone who checked it out!</p>
    </section>
  )
}