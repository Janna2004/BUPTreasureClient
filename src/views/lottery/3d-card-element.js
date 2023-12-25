import lotteryConfig from './lottery-config.js';
const { cardList, colCount, rowCount } = lotteryConfig;
import { scene, objects } from './3d-core.js';

const THREE = window.THREE;

const { CSS3DObject } = THREE;
const create3DCard = function(_objects = objects) {
  // 中奖的卡片要染色
  const cardListWinAll = lotteryConfig.cardListWinAll;
  const cardListWinAllIds = cardListWinAll.map(_ => _.id);

  for (let i = 0; i < cardList.length; i++) {
    const currentCardData = cardList[i];
    const element = document.createElement( 'div' );
    element.className = 'element';
    //element.style.backgroundColor = 'rgba(135,120,230,' + ( Math.random() * 0.25 + 0.1 ) + ')';
    if (cardListWinAllIds.includes(currentCardData.id)) {
      element.classList.add('prize');
    }else{
      element.style.backgroundColor = 'rgba(240, 240, 240,' + ( Math.random() * 0.25 + 0.2 ) + ')';
    }

    const imgEle = document.createElement('img');
    imgEle.src = currentCardData.avatar;
    imgEle.className = 'card-avatar';
    element.appendChild(imgEle);

    const symbol = document.createElement( 'div' );
    symbol.className = 'symbol';
    symbol.textContent = currentCardData.name;
    element.appendChild( symbol );

    // const details = document.createElement( 'div' );
    // details.className = 'details';
    // details.innerHTML = currentCardData.id;
    // element.appendChild( details );

    const objectCSS = new CSS3DObject( element );
    objectCSS.position.x = Math.random() * 4000 - 2000;
    objectCSS.position.y = Math.random() * 4000 - 2000;
    objectCSS.position.z = Math.random() * 4000 - 2000;
    scene.add( objectCSS );

    objects.push( objectCSS );
  }
}

export { create3DCard }
