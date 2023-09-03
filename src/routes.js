export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/pages/Leagues.vue"),
    },
    {
        path: '/league/:id',
        name: 'league',
        component: () => import("@/pages/League.vue"),
    },
    {
        path: '/teams/:league_id',
        name: 'teams',
        component: () => import("@/pages/Teams.vue")
    },
    {
        path: '/team/:id',
        name: 'team',
        component: () => import("@/pages/Team.vue"),
    },
    {
        path: '/match/:id',
        name: 'match',
        component: () => import("@/pages/Match.vue")
    },
]