import HomeView from "@/views/HomeView.vue";
import Leagues from "@/components/Leagues.vue";
import League from "@/components/League.vue";
import Teams from "@/components/Teams.vue";

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/leagues',
        name: 'leagues',
        component: Leagues
    },
    {
        path: '/league/:id',
        name: 'league',
        component: League,
    },
    {
        path: '/teams',
        name: 'teams',
        component: Teams
    },
]