import lotteryConfig from './lottery-config.js';
import axios from 'axios';


const getRandomCard = async function(currentPrize) {
  let prizeId = 0; //err

  if(currentPrize.id === "一等奖") {
    prizeId = 1;
  }else if(currentPrize.id === "二等奖") {
    prizeId = 2;
  }else if(currentPrize.id === "三等奖") {
    prizeId = 3;
  }else{
    prizeId = 0;
  }

  const selectCount = currentPrize.countRemain < currentPrize.everyTimeGet ? currentPrize.countRemain : currentPrize.everyTimeGet;

  console.log('currentPrize', currentPrize);
  let url = 'http://lt.t1.lllccc.top:8080/pickWeb';
  try {
    const pickNumUrl = url + `/pick?awardType=${prizeId}&pickNum=${selectCount}`;
    let selectCardList = [];

    // 发起请求并等待响应
    const response = await axios.get(pickNumUrl);
    console.log('response', response);
    if(response.data.code === 200 && response.data.data.pickNum === selectCount){
      selectCardList = response.data.data.picked; // 假设后端返回中奖者信息数组

      // 分别统计出获奖和未获奖的名单
      lotteryConfig.cardListWinAll = [...lotteryConfig.cardListWinAll, ...selectCardList];
      lotteryConfig.cardListRemainAll = lotteryConfig.cardList.filter((item) => {
        const winItem = lotteryConfig.cardListWinAll.find(_ => _.id === item.id);
        return !winItem;
      });

      //currentPrize.countRemain -= selectCount;
    }else{
      console.log('getRandomCard', 'err');
      throw new Error('getRandomCard', 'err');
    }

    // 将当前奖项中奖人员统计
    currentPrize.cardListWin = [...currentPrize.cardListWin, ...selectCardList];
    currentPrize.countRemain = currentPrize.countRemain - selectCardList.length;
    currentPrize.round += 1;

    lotteryConfig.setLocalStorage();
    console.log('selectCardList', selectCardList);
    return selectCardList;
  } catch (error) {
    console.error('Error fetching winners from backend', error);
    throw error; // 或者处理错误
  }

  // const cardListRemainAllCopy = JSON.parse(JSON.stringify(lotteryConfig.cardListRemainAll));
  // const selectCount = currentPrize.countRemain < currentPrize.everyTimeGet ? currentPrize.countRemain : currentPrize.everyTimeGet;

  // // 随机抽取数据
  // const selectCardList = [];

  // 正式抽奖逻辑
  // for (let i = 0; i < selectCount; i++) {
  //   const curSelectIndex = random(0, cardListRemainAllCopy.length - 1);
  //   const card = cardListRemainAllCopy.splice(curSelectIndex, 1)[0];
  //   selectCardList.push(card);
  // }
  // console.log('getRandomCard', JSON.parse(JSON.stringify(lotteryConfig)));

  // // 分别统计出获奖和未获奖的名单
  // lotteryConfig.cardListWinAll = [...lotteryConfig.cardListWinAll, ...selectCardList];
  // lotteryConfig.cardListRemainAll = lotteryConfig.cardList.filter((item) => {
  //   const winItem = lotteryConfig.cardListWinAll.find(_ => _.id === item.id);
  //   return !winItem;
  // });

  // // 将当前奖项中奖人员统计
  // currentPrize.cardListWin = [...currentPrize.cardListWin, ...selectCardList];
  // currentPrize.countRemain = currentPrize.countRemain - selectCardList.length;
  // currentPrize.round += 1;

  // lotteryConfig.setLocalStorage();
  // return selectCardList;
}

export { getRandomCard }