module.exports = function vgsSearch(mod) {
    let VanguardQuests;
    let AvailableQuests = {};
    let possibleVanguards = [];
    let once = false;

    LoadQuests();

    mod.game.on("enter_game", () => {
        once = true;
    })

    mod.hook("S_AVAILABLE_EVENT_MATCHING_LIST", 2, (event) => {
        if (once) {
            event.quests.forEach(quest => {
                if (VanguardQuests[quest.id] != undefined) {
                    AvailableQuests[quest.id] = quest;
                } else {
                    mod.warn(`Vanguard quest: ${quest.id} not mapped yet! DM Haato#0704 on Discord so I can fix it.`)
                }
            })
            once = false;
        }
        if (possibleVanguards.length < 1) return;
        event.quests = event.quests.filter(quest => possibleVanguards.includes(quest.id.toString()))
        possibleVanguards = []
        return true;
    })

    mod.command.add("vgs", (query) => {
        if (query == undefined || query.toString().length < 3) {
            mod.command.message("Search queries must have at least 3 characters!");
            return;
        }
        ExecuteSearchQuery(query)
    })

    function LoadQuests() {
        if (mod.region.toUpperCase() == "RU") {
            VanguardQuests = require('./vgs-ru.json');
        } else {
            VanguardQuests = require('./vgs-us.json');
        }
    }

    function ExecuteSearchQuery(query) {
        Object.keys(VanguardQuests).forEach(quest_id => {
            if (VanguardQuests[quest_id].search(query) != -1 && AvailableQuests[quest_id] != undefined) {
                possibleVanguards.push(quest_id);
            }
        })
        if (possibleVanguards.length < 1) {
            mod.command.message("No vanguard request found with that name!")
            return;
        }
        mod.send("C_AVAILABLE_EVENT_MATCHING_LIST", 1, {
            unk: 1
        });
    }

}