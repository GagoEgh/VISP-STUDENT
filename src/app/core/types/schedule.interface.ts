export interface HomeSchedule{
    schedule:Schedule[]
}

export interface Schedule{
    day:string,
    lessons:Lessons[]
}


interface Lessons{
    time:string,
    lesson:string
}