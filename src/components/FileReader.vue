<template>
  <div class="form-group">
    <span> Settings File: </span>
    <input type="file" @change="loadTextFromFile">
  </div>
</template>
  
<script>
export default {
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const json = JSON.parse(e.target.result)
        this.$emit("load", json)
        console.log('loadTextFromFile', json)
      };
      reader.readAsText(file);
      ev.target.value = null;
    }
  }
};
</script>

<style>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  /* Fancy button style 😎 */
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>