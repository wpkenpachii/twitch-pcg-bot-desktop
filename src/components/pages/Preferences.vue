<template lang="">
    <section id="section" style="display: flex">
        <form>
          <div class="form-group">
            <span> <b>Desativar</b>&nbsp;<b style="color: red">Bot</b>&nbsp;&nbsp;</span>
            <input type="checkbox" v-model="botStatus"> <br>
            <span>(Pausar a tentativa de captura)</span>
          </div>
          <div class="form-group">
            <span> <b> Quanto tempo depois da tentativa de captura, enviar prova de atividade (mensagem)?</b> </span> &nbsp;&nbsp;
            <input type="number" :disabled="editable === false" v-model="activityTime" min="5" max="15" placeholder="1000" step="2"> minutos <br>
            <span>(Caso numero negativo, apenas mensagens de tentativa de captura serao enviadas)</span>
          </div>

          <div class="form-group">
            <label> Launch <b style="color: red">Pokeball</b> when: </label>
            <ul>
                <li style="display: flex;">
                    <span> Base Stats >= </span>&nbsp;<input :disabled="!editable" style="width: 60px;" maxlength="4" size="4" type="number" v-model="pokeball.statsGt">
                </li>
                <li style="display: flex;">
                    <span> Tiers: </span> &nbsp;
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="pokeball.tiers.A"> A &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="pokeball.tiers.B"> B &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="pokeball.tiers.C"> C &nbsp;&nbsp;
                    </span>
                </li>
            </ul>
          </div>
          <div class="form-group">
            <label> Launch <b style="color: blue">Greatball</b> when: </label>
            <ul>
                <li style="display: flex;">
                    <span> Base Stats >= </span>&nbsp;<input :disabled="!editable" style="width: 60px;" maxlength="4" size="4" type="number" v-model="greatball.statsGt">
                </li>
                <li style="display: flex;">
                    <span> Tiers: </span> &nbsp;
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="greatball.tiers.A"> A &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="greatball.tiers.B"> B &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="greatball.tiers.C"> C &nbsp;&nbsp;
                    </span>
                </li>
            </ul>
          </div>
          <div class="form-group">
            <label> Launch <b style="color: black">Ultraball</b> when: </label>
            <ul>
                <li style="display: flex;">
                    <span> Base Stats >= </span>&nbsp;<input :disabled="!editable" style="width: 60px;" maxlength="4" size="4" type="number" v-model="ultraball.statsGt">
                </li>
                <li style="display: flex;">
                    <span> Tiers: </span> &nbsp;
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="ultraball.tiers.A"> A &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="ultraball.tiers.B"> B &nbsp;&nbsp;
                    </span>
                    <span>
                        <input :disabled="!editable" type="checkbox" v-model="ultraball.tiers.C"> C &nbsp;&nbsp;
                    </span>
                </li>
            </ul>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-form btn-primary" @click="save"> Save </button>
            <button type="button" class="btn btn-form btn-default" @click="edit"> Edit </button>
          </div>
        </form>
    </section>
</template>
<script>
export default {
  name: "preferences",
  data() {
    return {
      botStatus: false,
      activityTime: 5,
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
  mounted() {
    this.globalStore        = this.$root.$data.globalStore;
    this.activityTime       = this.globalStore.activityTime;
    this.shadowbanSecurity  = this.globalStore.shadowbanSecurity;
  },
  watch: {
    activityTime(new_value) {
      this.globalStore.setActivityTime(new_value);
    },
    botStatus(new_value) {
      this.globalStore.setBotStatus(new_value);
    }
  },
  methods: {
    updatePreferences() {
      const { pokeball, greatball, ultraball } = this.globalStore.getPokeballSettings
      this.pokeball           = pokeball;
      this.greatball          = greatball;
      this.ultraball          = ultraball;
    },
    save() {
      this.editable = false;
      this.globalStore.updatePreferences({
        pokeball: this.pokeball,
        greatball: this.greatball,
        ultraball: this.ultraball
      })
    },
    edit() {
      this.editable = true;
    }
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
</style>