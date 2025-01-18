import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { get_user_from_email } from '@/lib/database';
import { subMonths, eachDayOfInterval, format, parseISO, isSameDay } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function isDoneToday(done: {date: Date, correct: boolean}[]) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Ensure UTC midnight
  
  return done.find(entry => {
    return isSameDay(entry.date, today);
  });
}


export default async function Home() {
  const authUser = await getServerSession(authOptions);
  const email = authUser?.user?.email || null;
  if (email == null) {
    redirect('/api/auth/signin');
  }
  const userDoc = await get_user_from_email(email);
  if (userDoc == false) {
    redirect('/create-account');
  }

  // Prepare streak data
  const today = new Date();
  const startDate = subMonths(today, 6); // Last 6 months
  const allDates = eachDayOfInterval({ start: startDate, end: today }).map(date =>
    format(date, 'yyyy-MM-dd')
  );

  const doneData = userDoc.done.reduce((acc: Record<string, string>, entry: { date: Date | string; correct: boolean }) => {
  const dateKey = typeof entry.date === 'string' ? format(new Date(entry.date), 'yyyy-MM-dd') : format(entry.date, 'yyyy-MM-dd');
  acc[dateKey] = entry.correct ? 'correct' : 'wrong';
  return acc;
}, {});

  const heatmapData = allDates.map(date => ({
    date,
    status: doneData[date] || 'none', // Default to 'none' if no activity
  }));

  const todayEntry = isDoneToday(userDoc.done);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
      </div>
      <p>Hello {userDoc.username}</p>
      <p>Points: {userDoc.points}</p>
      <div>
        {todayEntry ? (
          <p className="text-green-600">
            You have completed today's quiz. {todayEntry.correct ? 'You got the correct answer!' : 'You got the wrong answer!'}
          </p>
        ) : (
          <p className="text-red-600">You have not completed today's quiz. Don't forget to participate!</p>
        )}
      </div>

      <h2 className="text-xl font-bold mt-8">Your Quiz Streak</h2>
      <div className="mt-4 flex justify-start">
        <TooltipProvider>
          <div
            className="grid gap-1"
            style={{
              gridTemplateRows: `repeat(7, 1fr)`, // Always 7 rows
              gridAutoFlow: 'column',            // Flow into new columns
            }}
          >
            {heatmapData.map(({ date, status }, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <div
                    title={`${date}`} // Optional native tooltip for fallback
                    className={`w-6 h-6 rounded-sm ${
                      status === 'correct'
                        ? 'bg-green-500'
                        : status === 'wrong'
                        ? 'bg-red-500'
                        : 'bg-gray-300'
                    }`}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{`${date}: ${
                    status === 'correct' ? 'Correct' : status === 'wrong' ? 'Wrong' : 'No activity'
                  }`}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}