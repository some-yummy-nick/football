export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/components/Leagues.vue"),
    },
    {
        path: '/league/:id',
        name: 'league',
        component: () => import("@/components/League.vue"),
    },
    {
        path: '/teams/:league_id',
        name: 'teams',
        component: () => import("@/components/Teams.vue")
    },
    {
        path: '/team/:id',
        name: 'team',
        component: () => import("@/components/Team.vue"),
    },
    {
        path: '/match/:id',
        name: 'match',
        component: () => import("@/components/Match.vue")
    },
]