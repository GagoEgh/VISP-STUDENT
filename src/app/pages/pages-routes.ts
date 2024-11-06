export enum AppRoutes {
    home = 'home',
    educational = 'educational',
    family = 'family',
    grades = 'grades',
    hostel = 'hostel',
    issues = 'issues',
    personalInfo = 'personal-info',
    proctor = 'proctor'
}

export default[
    {   path:AppRoutes.home,
        loadComponent:()=>import('./home/home.component').then(m=>m.HomeComponent)
    },
    {
        path:AppRoutes.educational,
        loadComponent:()=>import('./educational/educational.component').then(m=>m.EducationalComponent)
    },
    {
        path:AppRoutes.family,
        loadComponent:()=>import('./family/family.component').then(m=>m.FamilyComponent)
    },
    {
        path:AppRoutes.grades,
        loadComponent:()=>import('./grades/grades.component').then(m=>m.GradesComponent)
    },
    {
        path:AppRoutes.hostel,
        loadComponent:()=>import('./hostel/hostel.component').then(m=>m.HostelComponent)
    },
    {
        path:AppRoutes.issues,
        loadComponent:()=>import('./issues/issues.component').then(m=>m.IssuesComponent)
    },
    {
        path:AppRoutes.personalInfo,
        loadComponent:()=>import('./personal-info/personal-info.component').then(m=>m.PersonalInfoComponent)
    },
    {
        path:AppRoutes.proctor,
        loadComponent:()=>import('./proctor/proctor.component').then(m=>m.ProctorComponent)
    },
]