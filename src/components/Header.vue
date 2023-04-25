<template lang="">
  <header class="toolbar toolbar-header">
    <h1 class="title"> PCG Twitch Catcher BOT </h1>
    <div class="toolbar-actions" style="display: flex; justify-content: center;">
      <div class="btn-group pull-center">
        <button class="btn btn-large btn-default" v-on:click="goto('home')">
          <span class="icon icon-signal" :class="connectionStatus"></span>
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
import { useGlobalStore } from "@/database/globalStore"

export default {
    name: "Header",
    data() {
      return {
        store: null,
        connectionStatus: "disconnected",
      }
    },
    mounted() {
      this.store = useGlobalStore();
      this.connectionStatus = window.localStorage.getItem("connection");
    },
    methods: {
      updateConnectionStatus() {
        console.log('CHANGE CONNECTION STATUS', this.connectionStatus);
        if (this.store.connectionStatus == "connected") {
          this.connectionStatus = window.localStorage.getItem("connection")
          // console.log(this.connectionStatus, '|', this.store.connectionStatus);
        } else if (this.store.connectionStatus === "connecting") {
          this.connectionStatus = window.localStorage.getItem("connection");
          // console.log(this.connectionStatus, '|', this.store.connectionStatus);
        } else {
          this.connectionStatus = window.localStorage.getItem("connection");
          // console.log(this.connectionStatus, '|', this.store.connectionStatus);
        }
      },
      goto(page) {
        const route_name = this.$route.name;
        if(route_name.toLowerCase() === page) return
        this.$router.push({ path: "/"+page })
      }
    }
}
</script>
<style lang="css">
.connected {
  color: green !important;
}

.connecting {
  color: #eed535 !important;
}

.disconnected {
  color: red !important;
}

</style>