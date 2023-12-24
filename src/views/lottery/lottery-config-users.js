let lotteryConfigUsersRawJson;

try {
  // 尝试导入JSON文件
  lotteryConfigUsersRawJson = require('./../../buffer/lottery-config-users.json');
  console.log('lotteryConfigUsersRawJson', lotteryConfigUsersRawJson);
} catch (error) {
  // 发生错误时，输出错误信息
  console.error('Failed to import lottery-config-users.json:', error);

  // 刷新页面
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

const cardUserList = lotteryConfigUsersRawJson;

// table模式下行列数
let row = 1;
let col = 1;
const colCount = Math.sqrt(cardUserList.length).valueOf() + 3;
cardUserList.forEach((item, i) => {
  // 每行结束 另起一行
  item.index = i;
  if (col > colCount) {
    col = 1;
    row++;
  }
  item.row = row;
  item.col = col;
  col++;
});

export { colCount };
export const rowCount = row;
export const cardList = cardUserList;
