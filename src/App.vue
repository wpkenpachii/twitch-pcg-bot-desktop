<template>
  <div id="app">
    <Header ref="header" />
    <keep-alive class="container">
      <router-view @setupTmi="setupTmi" :spawns="spawns" />
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue';
import Header from './components/Header.vue'
import tmi from "tmi.js"
import moment from "moment"
import getPokemons from "@/database/pokemon"

import { removeWordsAccents } from "@/utils.ts"
import { useGlobalStore } from "@/database/globalStore"
import { storeAllRules, getAllRules } from "@/database/models/catching-rules.model"
import { FIFTH_MINUTES_MS } from "@/utils/constants" 

import "@/services/pokemon-api"

const emotes = [
  'jorg1t3Anota', 'jorg1t3Dance', 'jorg1t3Hey', 'jorg1t3Panic2', 'jorg1t3Wiggle', 'jorg1t3F', 'jorg1t3Flor', 'jorg1t3Love', 'jorg1t3Lurk', 'jorg1t3Pipoca', 'jorg1t3Pray', 'jorg1t3Shrug', 'jorg1t3Triste', 'jorg1t3Uhh'
]

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
export default Vue.extend({
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      activityMessageListener: null,
      connected: false,
      globalStore: null,
      ws: null,
      token: "",
      channel: "",
      pcg_user: "",
      lang: "eng",
      preferences: [],
      spawns: []
    }
  },
  async mounted() {

    await storeAllRules([
      {
        rule_name: "weekly_missions",
        rules: [
            {
                "type": "BY_POKEMON_TYPE",
                "pokemon_types": ["DRAGON"],
                "pokeball": "cipherball"
            }
        ]
      }
    ])


    this.globalStore = useGlobalStore();
    this.globalStore.setSpawnMessages();

    // Set settings from the settings file
    const {
      TWITCH_OAUTH_TOKEN,
      CHANNEL_TO_LISTEN,
      PCG_USER,
      CHANNEL_LANG
    } = this.globalStore.settings;

    this.oauthToken   = TWITCH_OAUTH_TOKEN;
    this.channel      = CHANNEL_TO_LISTEN;
    this.pcgUsername  = PCG_USER;
    this.lang         = CHANNEL_LANG;
    this.setupTmi({
      oauthToken: this.oauthToken,
      channel: this.channel,
      pcgUsername: this.pcgUsername,
      lang: this.lang
    })
  },
  methods: {
    async setupTmi(config) {
      const {
        oauthToken,
        channel,
        pcgUsername,
        lang
      } = config;
      this.token = oauthToken;
      this.channel = channel;
      this.pcg_user = pcgUsername;
      this.lang = lang;

      if (this.ws) {
        try {
          await this.ws.removeAllListeners()
          this.ws = null;
        } catch (error) {
          console.log(error)
        }
      }

      this.ws = new tmi.Client({
        options: { debug: false },
        identity: {
          username: 'anyone',
          password: this.token
        },
        channels: [channel],
      });

      this.globalStore.setConnection("connecting");
      this.$refs.header.updateConnectionStatus();

      this.ws.connect().then(() => {
        this.globalStore.setConnection("connected");
        this.$refs.header.updateConnectionStatus();

        this.ws.say(channel, "!pokepass")

        console.log('Bot connected in following chats', [channel]);
        console.log('To stop the bot, close the terminal or use ctrl + c');
        console.log('Settings', {
          "Chat": channel,
          "PcgUser": this.pcg_user
        })
      }).catch((err) => {
        this.globalStore.setConnection("disconnected");
        this.$refs.header.updateConnectionStatus();
        if (err.message.match('No response from Twitch')) {
          console.log('Missing or Invalid Token')
        }
      });
      this.ws.on("message", this.onMessage);
    },


    async onMessage(channel, tags, message, self) {
      //if (self) return;

      if (["streamelements", this.pcg_user.toLocaleLowerCase()].includes(tags.username.toLocaleLowerCase())) {
        const regex = new RegExp(`^Saldo de @${this.ws.username}:\\s\\$([0-9]+)`, 'gmi')
        const match = regex.exec(message)
        if (match && parseInt(match[1])) {
          console.log('SALDO', parseInt(match[1]))
          this.globalStore.setBalance(parseInt(match[1]));
          console.log(this.globalStore.balance)
        }
      }

      
      if (tags.username.toLocaleLowerCase() === this.pcg_user.toLocaleLowerCase()) {
        const _msg = this.lang === 'ptbr' ? 'Tente capturar usando !pokecatch' : 'Catch it using !pokecatch'
        if (message.match(_msg)) {
          const pokemonName = this.messageHandler(message);
          console.log(pokemonName)
          if (!pokemonName) return console.log('Nome do Pokemon Nao resolvido')
          const pokemon = this.getPokemonFromName(pokemonName);
          if (!pokemon) return console.log('Pokemon Nao encontrado')
          console.log(pokemon)
          
          if (this.globalStore.keepActivity) this.verifyKeepActivityMessagesPreferences(pokemon, channel);
          if (this.globalStore.isBotDisabled) return console.log('O Bot esta inativo.')

          const result = this.verifyCatchPreferences(pokemon)
          console.log('Verifying Catch Preferences', result)

          // TRY CAUGHT POKEMON
          if (result !== 'skip') {
            this.ws.say(channel, "!pokepass").then(async () => {
              await sleep(1350)
              if (this.globalStore.balance < this.globalStore.limitMoney) {
                console.log('Balance', this.globalStore.balance, 'LimitMoney', this.globalStore.limitMoney)
                const index = (Math.floor(Math.random() * (emotes.length-1)));
                this.ws.say(channel, `FeelsBadMan ❌ 💸`);
              } else {
                this.ws.say(channel, `!pokeshop ${result}`).then(async () => {
                  await sleep(1200);
                  this.ws.say(channel, `!pokecatch ${result}`).then(async () => {
                    this.feedSpawns(pokemon, result)
                  })
                })
              }
            })
          } else {
            console.log('Skipped Pokemon')
          }


        }
      }
    },

    verifyKeepActivityMessagesPreferences(pokemon, channel) {
      const { Tier, "Base Stats Total": BaseStatsTotal } = pokemon;
      const { statsGt, tiers } = this.globalStore.onlyMessagesPreferences;
      console.log('VerifyOnlyMessage->', tiers[Tier], BaseStatsTotal, statsGt)
      if (tiers[Tier] && BaseStatsTotal >= statsGt) {
        this.activityMessage(channel)
      } else {
        console.log('Tier ou Base Status nao se enquadram.')
      }
    },

    activityMessage(channel) {
      const index = (Math.floor(Math.random() * (emotes.length-1)));
      this.ws.say(channel, emotes[index]);
      setTimeout(() => {
        this.ws.say(channel, emotes[index]);
      }, FIFTH_MINUTES_MS)
    },

    feedSpawns(pokemon, pokeball) {
      const id = String(pokemon["Pokedex ID"]) + moment(new Date()).format("hmm")
      const time = moment(new Date()).format("DD-MM h:mm");
      
      this.globalStore.storeSpawn({
        "#ID": id,
        Name: pokemon["Name"],
        "Pokedex ID": pokemon["Pokedex ID"],
        "Pokemon Order": pokemon["Pokedemon Order"],
        Tier: pokemon["Tier"],
        "Base Stats Total": pokemon["Base Stats Total"],
        Generation: pokemon["Generation"],
        pokeball: pokeball,
        Time: time
      })
    },

    verifyCatchPreferences(pokemon) {
      const { Tier, "Base Stats Total": BaseStatsTotal } = pokemon;
      const pokeball = ["ultraball", "greatball", "pokeball"].find(  ball => {
        const ball_settings = this.globalStore[ball];
        console.log("ball settings", ball_settings)
        console.log("Tier", ball_settings.tiers[Tier])
        console.log(BaseStatsTotal, ">=", ball_settings.statsGt)
        if (ball_settings.tiers[Tier] && BaseStatsTotal >= ball_settings.statsGt) {
          return ball
        }
      })

      console.log("result:", "skip" && pokeball)

      return !pokeball ? "skip" : pokeball
    },

    checkPreferencesPipeline() {
      
    },

    messageHandler(rawMessage) {
      const lang = this.globalStore.settings.CHANNEL_LANG;
      let match = null;
      this.globalStore.getSpawnMessages.forEach(spawn_message => {
        const regex = spawn_message[lang];
        const _match = rawMessage.match( new RegExp(regex, 'gmi') )
        if (_match && _match.length) {
          match = _match && _match[0].trim()
        }
      });
      console.log('Messagehandler', match)
      return match
    },

    getPokemonFromName(pokemonName) {
      try {
        const pokemon = getPokemons().find((pokemon) => pokemon.Name.toLowerCase() === (removeWordsAccents(pokemonName)).toLowerCase())
        if (!pokemon) return false
        if (!("Pokedex ID" in pokemon)) return false
        return pokemon
      } catch (error) {
        console.log(error)
        return false
      }
    },
  }
});
</script>

<style lang="css">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

body {
  width: 100%;
  height: 100%;
  margin: 0px !important;
  padding: 0px !important;
}
</style>
