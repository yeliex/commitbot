window.commitbot = {};

window.commitbot.defaultCommitContent = '\n来自自动评价插件 by yeliex \n这是我从别人那边复制过来的，他懒得写了，但这也是我想表达的意思。他为什么喜欢在京东买东西，因为今天买明天就可以送到。他为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以他统一用段话作为评价内容。京东购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用他的这段话来评价，说明这款产品没问题，至少85分以上，而比较垃圾的产品，我也不会偷懒到复制粘贴他的评价，那我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。';

window.commitbot.defaultCommitImage = '//img30.360buyimg.com/shaidan/jfs/t6565/276/1439852732/41507/d7dc6d5e/59522c69N31c33f50.jpg';

window.commitbot.commentListLocation = '//club.jd.com/myJdcomments/myJdcomment.action';

window.commitbot.wait = (time = 6000) => {
  return new Promise((rec) => {
    setTimeout(rec, time);
  });
};

const loadingCss = window.document.createElement('style');
loadingCss.type = 'text/css';
loadingCss.appendChild(window.document.createTextNode(`
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
`));
const loading = window.document.createElement('div');
loading.style.position = 'fixed';
loading.style.left = 0;
loading.style.right = 0;
loading.style.top = 0;
loading.style.bottom = 0;
loading.style.backgroundColor = 'rgba(0,0,0,.6)';
loading.style.zIndex = 2147483648;
loading.style.display = 'none';
loading.appendChild(loadingCss);
const loadingImage = window.document.createElement('img');
loadingImage.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMjk2IDQ4YzAgMjIuMDkxLTE3LjkwOSA0MC00MCA0MHMtNDAtMTcuOTA5LTQwLTQwIDE3LjkwOS00MCA0MC00MCA0MCAxNy45MDkgNDAgNDB6bS00MCAzNzZjLTIyLjA5MSAwLTQwIDE3LjkwOS00MCA0MHMxNy45MDkgNDAgNDAgNDAgNDAtMTcuOTA5IDQwLTQwLTE3LjkwOS00MC00MC00MHptMjQ4LTE2OGMwLTIyLjA5MS0xNy45MDktNDAtNDAtNDBzLTQwIDE3LjkwOS00MCA0MCAxNy45MDkgNDAgNDAgNDAgNDAtMTcuOTA5IDQwLTQwem0tNDE2IDBjMC0yMi4wOTEtMTcuOTA5LTQwLTQwLTQwUzggMjMzLjkwOSA4IDI1NnMxNy45MDkgNDAgNDAgNDAgNDAtMTcuOTA5IDQwLTQwem0yMC45MjItMTg3LjA3OGMtMjIuMDkxIDAtNDAgMTcuOTA5LTQwIDQwczE3LjkwOSA0MCA0MCA0MCA0MC0xNy45MDkgNDAtNDBjMC0yMi4wOTItMTcuOTA5LTQwLTQwLTQwem0yOTQuMTU2IDI5NC4xNTZjLTIyLjA5MSAwLTQwIDE3LjkwOS00MCA0MHMxNy45MDkgNDAgNDAgNDBjMjIuMDkyIDAgNDAtMTcuOTA5IDQwLTQwcy0xNy45MDgtNDAtNDAtNDB6bS0yOTQuMTU2IDBjLTIyLjA5MSAwLTQwIDE3LjkwOS00MCA0MHMxNy45MDkgNDAgNDAgNDAgNDAtMTcuOTA5IDQwLTQwLTE3LjkwOS00MC00MC00MHoiLz48L3N2Zz4=';
loadingImage.style.position = 'absolute';
loadingImage.style.left = 0;
loadingImage.style.right = 0;
loadingImage.style.top = 0;
loadingImage.style.bottom = 0;
loadingImage.style.width = '24px';
loadingImage.style.height = '24px';
loadingImage.style.margin = 'auto';
loadingImage.style.animation = 'spin 1.5s ease-out infinite';

loading.appendChild(loadingImage);
window.document.body.appendChild(loading);

loading.show = () => {
  loading.style.display = 'block';
};
loading.hide = () => {
  loading.style.display = 'none';
};

window.commitbot.loading = loading;
