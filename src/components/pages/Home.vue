<template lang="">
    <section>
        <article>
            <table class="table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Tier </th>
                    <th>Stats</th>
                    <th>Generation</th>
                    <th>Pokeball</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="spawn in pokemons" :key="spawn.Name">
                    <td>{{ spawn["Pokedex ID"] }}</td>
                    <td>{{ spawn.Name }}</td>
                    <td>{{ spawn.Tier }}</td>
                    <td>{{ spawn["Base Stats Total"] }}</td>
                    <td>{{ spawn.Generation }}</td>
                    <td> {{ spawn.pokeball }} </td>
                    <td> {{ spawn.Time }} </td>
                  </tr>
                </tbody>
            </table>
        </article>
    </section>
</template>
<script>
import moment from "moment"
export default {
  name: "Home",
  data() {
    return {
      globalStore: null,
      pokemons: []
    }
  },
  mounted() {
    this.globalStore = this.$root.$data.globalStore;
    this.pokemons = this.globalStore.getSpawns;
  }
}
</script>
<style lang="">
    
</style>