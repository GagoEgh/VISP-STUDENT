export interface AttendanceResponse{
    attendance:Attendance[]
}

export interface Attendance{
    subject: string,
    percent: string
    
}