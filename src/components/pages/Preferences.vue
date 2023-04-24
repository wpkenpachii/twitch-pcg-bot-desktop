<template lang="">
    <section id="section" style="display: flex">
        <form>
          <div class="form-group">
            <!-- eslint-disable-next-line -->
            <span> <i>(Not working yet)</i> Stop Trying to Catch when money is lower then (<=) </span>
            <input type="number" v-model="limitMoney" placeholder="1000">
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
    this.globalStore = this.$root.$data.globalStore;
  },
  methods: {
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