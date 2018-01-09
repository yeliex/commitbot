const query = (window.location.search || '').replace(/^\?/, '').split('&').reduce((total, kv) => {
  const [k, v] = kv.split('=');
  total[k] = v;
  return total;
}, {});

const listFrame = window.document.createElement('iframe');

listFrame.width = 0;
listFrame.height = 0;
listFrame.opacity = 0;
window.document.body.appendChild(listFrame);

const dimmer = window.document.createElement('div');
dimmer.style.position = 'fixed';
dimmer.style.left = 0;
dimmer.style.right = 0;
dimmer.style.top = 0;
dimmer.style.bottom = 0;
dimmer.style.backgroundColor = 'rgba(0,0,0,.6)';
dimmer.style.zIndex = 2147483648;
dimmer.style.display = 'none';

const modal = window.document.createElement('div');
dimmer.appendChild(modal);
modal.style.backgroundColor = 'rgba(255,255,255,.6)';
modal.style.width = '160px';
modal.style.height = '40px';
modal.style.padding = '6px';
modal.style.position = 'absolute';
modal.style.right = 0;
modal.style.top = 0;
modal.style.zIndex = 100;
modal.style.border = 'solid 1px #333';

const p1 = window.document.createElement('p');
modal.appendChild(p1);

const p2 = window.document.createElement('p');
modal.appendChild(p2);

window.onload = () => {
  window.document.querySelector('.hui-shopping-min').style.display = 'none';
};

window.document.body.appendChild(dimmer);

window.commitbot.elements = {
  listFrame,
  dimmer,
  modal,
  p1,
  p2
};

switch (query.sort) {
  case '0': {
    window.commitbot.orders();
    break;
  }
  case '1': {
    window.commitbot.photos();
    break;
  }
}
