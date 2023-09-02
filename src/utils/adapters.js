export function adapterPlayers(players) {
    for (const [key, value] of Object.entries(players)) {
        if (!value) {
            players[key] = '-'
        }
    }
    return players
}