<script setup lang="ts">

</script>

<template>
<div class="container">
  <div class="text-button-container">
    <h1>三维球</h1>
    <p>这是一段文字，用于描述这个球。</p>
    <button>开始探索</button>
  </div>
  <div id="globe-container">
    <!-- 这里可以放置球体的图片或者用其他技术如 WebGL 来实现 -->
    <div id="globe"></div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.text-button-container {
  margin-left: 2rem;
}

.globe-container {
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: 50%;
  overflow: hidden;
}
</style>
