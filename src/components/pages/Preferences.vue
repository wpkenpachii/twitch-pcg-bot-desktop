<template lang="">
    <section id="section" style="display: flex">
        <form>
          <div class="form-group">
            <span> <b>Desativar</b>&nbsp;<b style="color: red">Bot</b>&nbsp;&nbsp;</span>
            <input type="checkbox" v-model="disableBot"> <br>
            <span>(Pausar a tentativa de captura)</span>
          </div>

          <div class="form-group">
            <span> <b> Habilitar manter atividade no chat </b> </span> &nbsp;&nbsp;
            <input :disabled="!this.disableBot || !this.editable" type="checkbox" v-model="keepActivity"> <br>
          </div>

          <div class=form-group v-if="isOnlyMessage">
            <label> Enviar Mensagem ao aparecer pokemon: </label>
            <ul>
              <li style="display: flex;">
                  <span> Base Stats </span>&nbsp;
              </li>
              
              <li class="slidecontainer">
                <input :disabled="disabled || isAllTiersFalse(onlyMessage.tiers)" type="range" step="5" min="0" max="600" class="slider" v-model="onlyMessage.statsGt">&nbsp;&nbsp;
                <span> {{ onlyMessage.statsGt }} </span>
              </li>

              <li style="display: flex;">
                  <span> Tiers: </span> &nbsp;

                  <span>
                      <input :disabled="disabled" type="checkbox" v-model="onlyMessage.tiers.A"> A &nbsp;&nbsp;
                  </span>
                  <span>
                      <input :disabled="disabled" type="checkbox" v-model="onlyMessage.tiers.B"> B &nbsp;&nbsp;
                  </span>
                  <span>
                      <input :disabled="disabled" type="checkbox" v-model="onlyMessage.tiers.C"> C &nbsp;&nbsp;
                  </span>
              </li>
            </ul>
          </div>

          <div class="form-group" v-if="!isOnlyMessage">
            <label> Launch <b style="color: red">Pokeball</b> when: </label>
            <ul>
              <li style="display: flex;">
                  <span> Base Stats </span>&nbsp;
              </li>
              
              <li class="slidecontainer">
                <input :disabled="disabled || isAllTiersFalse(pokeball.tiers)" type="range" min="0" step="5" max="600" class="slider" v-model="pokeball.statsGt">&nbsp;&nbsp;
                <span> {{ pokeball.statsGt }} </span>
              </li>

              <li style="display: flex;">
                  <span> Tiers: </span> &nbsp;

                  <span>
                      <input :disabled="disabled" type="checkbox" v-model="pokeball.tiers.A"> A &nbsp;&nbsp;
                  </span>
                  <span>
                      <input :disabled="disabled" type="checkbox" v-model="pokeball.tiers.B"> B &nbsp;&nbsp;
                  </span>
                  <span>
                      <input :disabled="disabled" type="checkbox" v-model="pokeball.tiers.C"> C &nbsp;&nbsp;
                  </span>
              </li>
            </ul>
          </div>

          <div class="form-group" v-if="!isOnlyMessage">
            <label> Launch <b style="color: blue">Greatball</b> when: </label>
            <ul>
                <li style="display: flex;">
                    <span> Base Stats </span>&nbsp;
                </li>

                <li class="slidecontainer">
                  <input :disabled="disabled || isAllTiersFalse(greatball.tiers)" type="range" min="0" step="5" max="600" class="slider" v-model="greatball.statsGt">
                  <span> {{ greatball.statsGt }} </span>
                </li>

                <li style="display: flex;">
                    <span> Tiers: </span> &nbsp;
                    <span>
                        <input :disabled="disabled" type="checkbox" v-model="greatball.tiers.A"> A &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="disabled" type="checkbox" v-model="greatball.tiers.B"> B &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="disabled" type="checkbox" v-model="greatball.tiers.C"> C &nbsp;&nbsp;
                    </span>
                </li>
            </ul>
          </div>

          <div class="form-group" v-if="!isOnlyMessage">
            <label> Launch <b style="color: black">Ultraball</b> when: </label>
            <ul>
                <li style="display: flex;">
                    <span> Base Stats </span>&nbsp;
                </li>

                <li class="slidecontainer">
                  <input :disabled="disabled || isAllTiersFalse(ultraball.tiers)" type="range" min="0" step="5" max="600" class="slider" v-model="ultraball.statsGt">
                  <span> {{ ultraball.statsGt }} </span>
                </li>

                <li style="display: flex;">
                    <span> Tiers: </span> &nbsp;
                    <span>
                        <input :disabled="disabled" type="checkbox" v-model="ultraball.tiers.A"> A &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="disabled" type="checkbox" v-model="ultraball.tiers.B"> B &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="disabled" type="checkbox" v-model="ultraball.tiers.C"> C &nbsp;&nbsp;
                    </span>
                </li>
            </ul>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-form btn-primary" @click="save"> Save </button>
            <!-- <button type="button" class="btn btn-form btn-default" @click="edit"> Edit </button> -->
          </div>
        </form>
    </section>
</template>
<script>
export default {
  name: "preferences",
  data() {
    return {
      disableBot: false,
      keepActivity: false,

      onlyMessage: {
        statsGt: 350,
        tiers: {
          A: true,
          B: true,
          C: false
        }
      },


      spawnStore: null,
      editable: true,
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
      }
    }
  },
  computed: {
    isOnlyMessage() {
      return this.disableBot && this.keepActivity
    },
    disabled() {
      return (!this.keepActivity && this.disableBot) || !this.editable
    }
  },
  mounted() {
    this.globalStore        = this.$root.$data.globalStore;
    this.shadowbanSecurity  = this.globalStore.shadowbanSecurity;
    this.disableBot         = this.globalStore.disableBot;
    this.setKeepActivity    = this.globalStore.setKeepActivity;
    this.onlyMessage        = this.globalStore.onlyMessagesPreferences;
  },
  watch: {
    keepActivity(new_value) {
      this.globalStore.setKeepActivity(new_value);
    },
    disableBot(new_value) {
      if (!new_value) this.keepActivity = false;
      this.globalStore.setDisableBot(new_value);
    }
  },
  methods: {
    save() {
      this.editable = false;
      setTimeout(() => {
        this.editable = true
      }, 1000)
      this.globalStore.setOnlyMessagesPreferences(this.onlyMessage)
      this.globalStore.updatePreferences({
        pokeball: this.pokeball,
        greatball: this.greatball,
        ultraball: this.ultraball,
      })
    },
    isAllTiersFalse(pokeball) {
      return !Object.keys(pokeball).find( key => pokeball[key]===true)
    }
    // edit() {
    //   this.editable = true;
    // }
  }
}
</script>
<style lang="css">
#section {
  display: flex;
  margin: 10mm;
  justify-content: left;
}

form {
  display: flex;
  flex-direction: column;
}

.form-froup {
  display: flex;
  justify-content: left;
}

li {
  list-style-type: none !important;
}
</style>