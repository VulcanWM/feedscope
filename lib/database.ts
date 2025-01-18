import dbConnect from './mongodb';
import User from '../models/User';
import Quiz from '@/models/Quiz';

// Function to convert a date string (YYYY-MM-DD) to a UTC Date object
function createUTCDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day)); // Month is 0-indexed
}

export async function get_user(username: string) {
    await dbConnect();
    const user = await User.find({username: username})
    if (user.length == 0){
        return false
    } else {
        return user[0]
    }
}

export async function get_user_from_email(email: string) {
    await dbConnect();
    const user = await User.find({email: email})
    if (user.length == 0){
        return false
    } else {
        return user[0]
    }
}

export async function create_user(username: string, email: string) {
    await dbConnect();
    username = username.toLowerCase();
    username = username.replaceAll(" ", "_")
    if (await get_user(username) != false){
        return "This username already exists!"
    }
    if (await get_user_from_email(email) != false){
        return "This email is already being used for an account!"
    }
    if (username.length > 20){
        return "Your username cannot have more than 20 characters!"
    }
    if (username.length < 3){
        return "Your username must be at least 3 characters long!"
    }
    const created = new Date()
    const user = await User.create({
        username: username,
        email: email,
        created: created,
        badges: ['Early User'],
        points: 0,
        currency: 0,
        done: []
    })
    return true
}

export async function create_quiz(
    question: string,
    answer: string,
    category: string,
    options: Array<{Option: string, Count: number}>,
    date: string
){
    await Quiz.create({
        question: question,
        answer: answer,
        category: category,
        options: options,
        date: createUTCDate(date),
    })
}

export async function get_today_quiz() {
    await dbConnect();
    const now = new Date();
    const quiz = await Quiz.findOne({date: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))})
    if (!quiz){
        return false
    } else {
        return quiz
    }
}

export async function do_quiz(email: string, answer: string){

    const user = await get_user_from_email(email)
    if (user == false){
        return "You don't have an account!"
    }
    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const done = user.done.some((entry: { date: { getTime: () => number; }; }) => entry.date.getTime() === today.getTime());
    if (done == true){
        return "You've already done today's quiz!"
    }
    const quiz = await get_today_quiz()
    if (quiz == false){
        return "There is no quiz today!"
    }
    const optionEntry = quiz.options.find((entry: { Option: string; }) => entry.Option === answer);
    const count = optionEntry ? optionEntry.Count : 0;
    var correct = false;
    if (quiz.answer == answer){
        correct = true;
        if (count < 100){
            user.points += (100 - count)
        } else {
            user.points += 1;
        }
    }
    user.done.push({date: today, correct: correct});
    await user.save();
    await Quiz.updateOne(
        { _id: quiz._id, 'options.Option': answer }, 
        { $inc: { 'options.$.count': 1 } }
    );
    return true;
}

export async function get_top_100_users(){
    const topUsers = await User.find()
      .sort({ points: -1 }) 
      .limit(100); 
    return topUsers;
}

// create_quiz(
//     "Which year did the Titanic sink?",
//     "1912",
//     "History",
//     [
//         {"Option": "1908", "Count": 0},
//         {"Option": "1912", "Count": 0},
//         {"Option": "1915", "Count": 0},
//         {"Option": "1920", "Count": 0}
//     ],
//     "2025-01-18"
// )