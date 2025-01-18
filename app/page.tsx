import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Crown, FlameIcon as Fire, Timer, Trophy, Users } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="container px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Test Your Knowledge,{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Daily
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-muted-foreground md:text-xl">
          Join the daily quiz challenge. Compete with others, maintain your streak,
          and discover how your knowledge stacks up against the world.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">Join Now</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container grid gap-8 px-4 py-24 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Timer className="h-12 w-12 text-primary" />
            <CardTitle>Daily Quizzes</CardTitle>
            <CardDescription>
              A new quiz every day on random topics. Test your knowledge across
              various subjects.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Fire className="h-12 w-12 text-primary" />
            <CardTitle>Maintain Your Streak</CardTitle>
            <CardDescription>
              Come back daily to keep your streak going. How many days can you
              maintain it?
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Trophy className="h-12 w-12 text-primary" />
            <CardTitle>Competitive Points</CardTitle>
            <CardDescription>
              First 99 correct answers get bonus points. Be quick to climb the
              leaderboard!
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* How It Works */}
      <section className="border-t bg-muted/50">
        <div className="container px-4 py-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <p className="font-medium">
                      A new quiz appears every day at midnight
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <p className="font-medium">
                      Answer correctly to earn points based on your position
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <p className="font-medium">
                      First 99 correct answers get bonus points
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <p className="font-medium">
                      Come back daily to maintain your streak
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Points System</CardTitle>
                <CardDescription>
                  The earlier you answer correctly, the more points you earn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1st</TableCell>
                      <TableCell>100 points</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2nd</TableCell>
                      <TableCell>99 points</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3rd</TableCell>
                      <TableCell>98 points</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>100th+</TableCell>
                      <TableCell>1 point</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="container flex flex-col items-center gap-4 px-4 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Test Your Knowledge?
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            Join others in this daily quest for knowledge. Start your
            streak today!
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">  
            <span className="text-sm">© 2025 FeedScope</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
