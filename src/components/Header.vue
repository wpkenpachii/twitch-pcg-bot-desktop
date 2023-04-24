<template lang="">
  <header class="toolbar toolbar-header">
    <h1 class="title"> PCG Twitch Catcher BOT </h1>
  
    <div class="toolbar-actions" style="display: flex; justify-content: center;">
      <div class="btn-group pull-center">
        <button class="btn btn-large btn-default" v-on:click="goto('home')">
          <span class="icon icon-signal"></span>
        </button>
        <button class="btn btn-large btn-default" v-on:click="goto('settings')">
          <span class="icon icon-database"></span>
        </button>
        <button class="btn btn-large btn-default" v-on:click="goto('preferences')">
          <span class="icon icon-user"></span>
        </button>
      </div>
    </div>
  </header>
</template>
<script>
export default {
    name: "Header",
    methods: {
      goto(page) {
        const route_name = this.$route.name;
        console.log(this.$route)
        if(route_name.toLowerCase() === page) return
        this.$router.push({ path: "/"+page })
      }
    }
}
</script>
<style lang="">
    
</style>