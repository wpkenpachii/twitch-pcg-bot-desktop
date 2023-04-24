import { defineStore } from "pinia"
import moment from "moment"

export const useGlobalStore = defineStore("Spawn", {
  state: () => {
    return {
      settings: {
        "TWITCH_OAUTH_TOKEN": "dkpaceh16uirjk5x6b2raf88jg83131",
        "CHANNEL_TO_LISTEN": "wpkenpachi",
        "PCG_USER": "wpkenpachi",
        "CHANNEL_LANG": "ptbr",
        "SPAWN_MESSAGES": [
          {
            "name": "default",
            "active": true,
            "ptbr": "(?<=TwitchLit\\sum|uma)\\s([a-zA-Zà-úÀ-Ú0-9]+)",
            "eng": "(?<=TwitchLit\\sa\\swild\\s)([a-zA-Zà-úÀ-Ú0-9]+)"
          },
          {
            "name": "fish_event",
            "active": true,
            "ptbr": "(?<=deemon8FishRed\\sum|uma)\\s([a-zA-Zà-úÀ-Ú0-9]+)",
            "eng": "(?<=deemon8FishRed\\sa\\swild\\s)([a-zA-Zà-úÀ-Ú0-9]+)"
          }
        ]
      },
      spawns: [],
      limitMoney: 1000,
      pokeball: {
        statsGt: 380,
        tiers: {
          A: true,
          B: true,
          C: true
        }
      },
      greatball: {
        statsGt: 450,
        tiers: {
          A: true,
          B: true,
          C: false
        }
      },
      ultraball: {
        statsGt: 500,
        tiers: {
          A: true,
          B: true,
          C: true
        }
      },
      spwan_messages: []
    }
  },
  getters: {
    getSpawns: (state: any) => state.spawns,
    getSpawnMessages: (state: any) => state.spwan_messages
  },
  actions: {
    updateSettings(settings: any) {
      this.settings = settings;
    },
    setSpawnMessages() {
      const _spawnMessages = this.settings.SPAWN_MESSAGES.filter( (item: any) => item.active === true)
      _spawnMessages.forEach( (spmsg: any) => {
        if (spmsg.active) {
          this.spwan_messages.push({
            name: spmsg.name,
            ptbr: spmsg.ptbr,
            eng: spmsg.eng
          } as never)
        }
      })
      console.log("SpawnMessages:", this.spwan_messages)
    },
    updatePreferences(preferences: any) {
      const {
        pokeball,
        greatball,
        ultraball
      } = preferences;
      this.pokeball = pokeball
      this.greatball = greatball
      this.ultraball = ultraball
      console.table([
        this.pokeball,
        this.greatball,
        this.ultraball,
      ])
    },
    storeSpawn(pokemon: any) {
      const id = String(pokemon["Pokedex ID"]) + moment(new Date()).format("HHMM")
      const time = moment(new Date()).format("DD-MM HH:MM")
      const spawnAlreadyStored = this.spawns.find((sp: any) => sp["#ID"] === id && sp["Time"] === time)
      if (!spawnAlreadyStored) {
        this.spawns.push(pokemon as never)
        console.log({
          id,
          time
        })
      } else {
        console.log("this is a repeated spawn!", {
          id, time
        })
      }
    }
  }
});