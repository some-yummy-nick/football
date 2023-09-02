import Leagues from "@/components/Leagues.vue";
import League from "@/components/League.vue";
import Teams from "@/components/Teams.vue";
import Team from "@/components/Team.vue";

export const routes = [
    {
        path: '/',
        name: 'home',
        component: Leagues
    },
    {
        path: '/league/:id',
        name: 'league',
        component: League,
    },
    {
        path: '/teams/:league_id',
        name: 'teams',
        component: Teams
    },
    {
        path: '/team/:id',
        name: 'team',
        component: Team,
    },
]