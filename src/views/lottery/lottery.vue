<template>
  <div class="lottery-wrap">
    <header class="lottery-header">
      <span>{{ headerTitle }}</span>
    </header>
    <div class="lottery-content">
      <div class="left-side">
      <div class="placeholder"></div>
        <div class="content-title">
          <p class="first-title">邮奖</p>
          <p class="second-title">总是邮人抽到奖</p>
        </div>
        <Prize/>
      </div>
      <Lottery3d/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lottery-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/backgrand.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
}
.lottery-header {
  flex: none;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.696);
  font-size: 26px;
  letter-spacing: 5px;
  font-weight: bold;
  //position: fixed;
}
.lottery-content {
  height: 100%;
  flex: 1;
  display: flex;
  
}
.content-title {
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #fff;
  text-align: left;
  margin: 30px;
  p {
    margin-bottom: 35px;
  }
}
.left-side{
  flex: 3;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 70px;
}
.placeholder {
    height: 30%;
    width: 100%;
  }
.first-title {
  font-size: 90px;
  height: 50px;
  font-weight: bold;
  color: #fff;
  //font-style: italic;
  letter-spacing: 15px;
}
.second-title {
  font-size: 50px;
  color: #fff;
  letter-spacing: 8px;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Lottery3d from './lottery-3d.vue';
import Prize from './lottery-prize.vue';
import lotteryConfig from './lottery-config.js';

@Component({
  components: {
    Lottery3d, Prize
  }
})
export default class Lottery extends Vue {
  headerTitle = lotteryConfig.headerTitle;
}
</script>
