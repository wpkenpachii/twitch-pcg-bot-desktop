<template lang="">
    <section id="section">
        <form>
          <div class="form-group">
            <label v-show="editable">Twitch OAuth Token: </label>
            <span v-show="!editable"> Twitch OAuth Token: {{ "*".repeat(oauthToken.length) }} </span> <br>
            <input v-if="editable" type="text" class="form-control" placeholder="oauth:dkpaceh16uirjk5x6b2raf88jg83131" v-model="oauthToken">
          </div>
          <div class="form-group">
            <label>Channel to Listen: <b><span v-show="!editable"> {{ channel }} </span></b></label>
            <input v-show="editable" type="text" class="form-control" :placeholder="channel" v-model="channel">
          </div>
          <div class="form-group">
            <label>PCG Username: <b><span v-show="!editable"> {{ pcgUsername }} </span></b></label>
            <input v-show="editable" type="text" class="form-control" :placeholder="pcgUsername" v-model="pcgUsername">
          </div>
          <div class="form-group" v-if="editable">
            <label> Language: </label>
            <select class="form-control" v-model="lang">
              <option value="eng">English</option>
              <option value="ptbr">Portuguese (Brasil)</option>
            </select>
          </div>
          <div class="form-group" v-else>
            <span> Langauge: <b>{{ lang === 'eng' ? 'English' : 'Portuguese (Brasil)' }}</b></span>
          </div>

          <FileReader @load="rawData = $event" />

          <div class="form-actions">
            <button type="button" class="btn btn-form btn-primary" @click="save"> Save </button>
            <button type="button" class="btn btn-form btn-default" @click="setEditable"> Edit </button>
          </div>
        </form>
    </section>
</template>

<script>
import FileReader from "@/components/FileReader.vue"
import { useGlobalStore } from "@/database/globalStore"
export default {
  name: "Settings",
  components: {
    FileReader
  },
  data() {
    return {
      store: null,
      rawData: "",
      editable: false,
      oauthToken: "oauth:dkpaceh16uirjk5x6b2raf88jg83131",
      channel: "deemonrider",
      pcgUsername: "PokemonCommunityGame",
      lang: "eng"
    }
  },
  watch: {
    rawData: {
      deep: true,
      handler(newValue, oldValue) {
        console.log('watch:', newValue, oldValue);
        const {
          TWITCH_OAUTH_TOKEN,
          CHANNEL_TO_LISTEN,
          PCG_USER,
          CHANNEL_LANG,
          SETTINGS
        } = newValue;
        this.oauthToken   = TWITCH_OAUTH_TOKEN;
        this.channel      = CHANNEL_TO_LISTEN;
        this.pcgUsername  = PCG_USER;
        this.lang         = CHANNEL_LANG;
        // const { pokeball, greatball, ultraball } = SETTINGS;
        // this.store.setPokeballSettings(pokeball, greatball, ultraball);
      }
    }
  },
  mounted() {
    this.store = useGlobalStore();
    const {
      TWITCH_OAUTH_TOKEN,
      CHANNEL_TO_LISTEN,
      PCG_USER,
      CHANNEL_LANG
    } = this.store.settings;
    this.oauthToken   = TWITCH_OAUTH_TOKEN;
    this.channel      = CHANNEL_TO_LISTEN;
    this.pcgUsername  = PCG_USER;
    this.lang         = CHANNEL_LANG;
  },
  methods: {
    setEditable() {
      this.editable = true;
    },
    save() {
      this.editable = false;
      this.store.updateSettings(this.rawData)
      this.$emit("setupTmi", {
        oauthToken: this.oauthToken,
        channel: this.channel,
        pcgUsername: this.pcgUsername,
        lang: this.lang
      })
      console.table({
        editable: this.editable,
        oauthToken: this.oauthToken,
        channel: this.channel,
        pcgUsername: this.pcgUsername,
        lang: this.lang
      })
    }
  }
}
</script>
<style lang="css">
#section {
  display: flex;
  justify-content: center;
}

.form-froup {
  display: flex;
  justify-content: left;
}
</style>