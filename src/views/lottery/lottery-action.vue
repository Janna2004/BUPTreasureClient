<template>
  <div class="lottery-action">
    <div id="menu">
      <div style="margin-bottom: 10px;">
        <button id="table" v-show="showBtn">TABLE</button>
        <button id="sphere" v-show="showBtn">SPHERE</button>
        <button id="helix" v-show="showBtn">HELIX</button>
        <button id="grid" v-show="showBtn">GRID</button>
      </div>
      <div class="menu-item" style="margin-bottom: 10px;">
        <button id="lotteryStart" @click="lotteryStart">开始抽奖</button>
        <button id="lotteryStop" @click="lotteryStop">停止旋转</button>

      </div>
      <div class="menu-item">
        <button id="tableShow" @click="tableShow">展示全部</button>
        <button id="winShow" @click="showAllWinUserPanel = true">展示中奖</button>
        <button id="reset" @click="resetData">重置所有数据</button>
      </div>
      <div style="margin-bottom: 10px;"></div>
    </div>
    <div class="show-all-win-user" v-if="showAllWinUserPanel">
      <span class="close-btn" @click="showAllWinUserPanel = false">✖</span>
      <div class="prize-win-item" v-for="(item, index) in prizeList" :key="index">
        <div class="prize-name">{{ item.name }}</div>
        <div class="prize-win-user">
         <!-- <div class="prize-win-user-name"-->
<!--                v-for="(user, _index) in item.cardListWin" :key="_index">-->
<!--            {{ user.name }}-->
<!--            <br v-if="_index % 10 === 0 && _index !== 0"/>-->
<!--          </div>-->
          <!-- 每十个换行 -->
          <div class="prize-win-user-name-wrap" v-for="(arr, arrIndex) in getRenderArr(item.cardListWin)" :key="arrIndex">
            <span class="prize-win-user-name" v-for="(user, userIndex) in arr" :key="userIndex">
              {{ user.name }}
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { setSphereDist } from './3d-calc-distance.js';
import { transform, transformStatus } from './3d-animate.js';
import lotteryConfig from './lottery-config.js';
import { cardFlyAnimation, rotateBall, rotateBallStop } from './3d-action.js';
import { getRandomCard } from './lottery-algorithm.js';
import STATUS from './3d-status.js';
import {fire1, fire2} from './lottery-fire.js';

@Component({
  components: {}
})
export default class Prize extends Vue {
  showBtn = false;
  showAllWinUserPanel = false;
  prizeList = lotteryConfig.prizeList;
  getUserById = lotteryConfig.getUserById;
  getRenderArr(arr) {
    const arrRes = [];
    const n = 10;
    const len = arr.length;
    const lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
    for (let i = 0; i < lineNum; i++) {
      const temp = arr.slice(i*n, i*n+n);
      arrRes.push(JSON.parse(JSON.stringify(temp)));
    }
    return arrRes;
  }

  async lotteryStart() {
    if (STATUS.getStatus() !== STATUS.WAIT_LOTTERY) {
      alert('正在抽奖或初始化，请等待一下');
      return void 0;
    }
    const currentPrize = lotteryConfig.getCurrentPrize();
    if (!currentPrize) {
      alert('请选择奖项');
      STATUS.setStatusWait();
      return void 0;
    }
    if (currentPrize.countRemain <= 0) {
      alert(lotteryConfig.getCurrentPrize().name + '已经抽取完毕，请选择其他奖项');
      STATUS.setStatusWait();
      return void 0;
    }

    // 先回到table状态再抽奖
    STATUS.setStatusRun();
    transformStatus !== 'table' && await transform( 'table', 500 );
    await transform( 'sphere', 300 );
    rotateBall();
  }
  async lotteryStop() {
    const currentPrize = lotteryConfig.getCurrentPrize();
    const confetti = require('canvas-confetti');

    if (!currentPrize) {
      alert('请选择奖项');
      STATUS.setStatusWait();
      return void 0;
    }
    rotateBallStop();
    const cardSelect = await getRandomCard(currentPrize); // 当前的奖项
    const cardSelectIndex = cardSelect.map((item) => item.id);

    await setSphereDist(2, 500);
    await cardFlyAnimation(cardSelectIndex);
    STATUS.setStatusWait();

    fire1(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire1(0.2, {
      spread: 60,
    });
    fire1(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire1(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire1(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    fire2(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire2(0.2, {
      spread: 60,
    });
    fire2(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire2(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire2(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  async tableShow() {
    if (STATUS.getStatus() !== STATUS.RUNNING_LOTTERY) {
      STATUS.setStatusRun();
      await transform( 'table', 1000 ); // sphere
      STATUS.setStatusWait();
    } else {
      alert('抽奖正在运行中，请等待后再操作！')
    }
  }
  resetData () {
    if (confirm('是否要重置所有抽奖数据，此操作不可恢复！')) {
      lotteryConfig.clearLocalStorage();
      location.reload();
    }
  }

  mounted () {
    this.$bus.$on('lottery-3d-init', () => {
      STATUS.setStatusWait();
    });
  }
}
</script>

<style lang="scss" scoped>
button{
  height: 45px;
  width: 100%;
  margin-right: 15px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 2px;
  border: 1px solid #8778e6;
  background-color: rgba(0, 0, 0, 0.454);
  color: #ffffffd8;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
.menu-item {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.lottery-action {
  flex: none;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#menu {
  background-image: url("../../assets/menu-backgrand.png");
  height: 130px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right top;
  border-radius: 10px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.show-all-win-user {
  position: fixed;
  width: calc(100vw - 60px);
  height: calc(100vh - 50px - 60px);
  left: 30px;
  top: calc(50px + 30px);
  background-color: rgba(0, 0, 0, 1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid rgba(0, 127, 127, 0.314);
  color: #fff;
  .close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 30px;
    cursor: pointer;
    display: block;
    color: rgba(255, 255, 255, .7);
  }
  .prize-win-item {
    //flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 50px;
    .prize-name {
      font-size: 36px;
      line-height: 1;
    }
    .prize-win-user {
      margin-top: 20px;
      .prize-win-user-name {
        font-size: 18px;
        //margin-right: 10px;
        width: 80px;
        display: inline-block;
        text-align: center;
      }
    }
  }
}
</style>
