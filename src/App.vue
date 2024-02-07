<template>
  <div id="main">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
}
html, body{
  height: 100%;
  width: 100%;
}
#main {
  color: #ffffff;
  height: 100%;
  width: 100%;
}
ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
