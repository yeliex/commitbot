const commentItemP = (element) => {
  element.querySelector('.op-btns .btn-9').click();

  const image = element.querySelector('.img-lists input');

  const btn = element.querySelector('.btn-5.mr10.setcomment');

  return window.commitbot.wait(1000).then(() => {
    image.value = window.commitbot.defaultCommitImage;

    return window.commitbot.wait(1000);
  }).then(() => {
    btn.click();
    return window.commitbot.wait();
  });
};

const commentCurrentPageP = (page) => {
  return new Promise((rec, rej) => {
    const itemFrame = window.document.createElement('iframe');

    itemFrame.style.position = 'absolute';
    itemFrame.style.left = 0;
    itemFrame.style.right = 0;
    itemFrame.style.top = 0;
    itemFrame.style.bottom = 0;
    itemFrame.style.width = '1090px';
    itemFrame.style.height = '90%';
    itemFrame.style.margin = 'auto';

    window.commitbot.elements.dimmer.appendChild(itemFrame);

    itemFrame.onload = () => {
      // hide useless elements
      itemFrame.contentDocument.querySelector('#shortcut-2014').style.display = 'none';
      itemFrame.contentDocument.querySelector('#o-header-2013').style.display = 'none';
      itemFrame.contentDocument.querySelector('#nav').style.display = 'none';
      itemFrame.contentDocument.querySelector('#service-2017').style.display = 'none';
      itemFrame.contentDocument.querySelector('#footer-2017').style.display = 'none';
      itemFrame.contentDocument.querySelector('#menu').style.display = 'none';
      itemFrame.contentDocument.querySelector('#sub').style.display = 'none';
      itemFrame.contentDocument.querySelector('.mod-main.mod-comm.mod-comt').style.display = 'none';
      itemFrame.contentDocument.querySelector('.mod-main.mod-comm.lefta-box .mt').style.display = 'none';
      itemFrame.contentDocument.body.style.overflow = 'hidden';

      itemFrame.contentDocument.body.appendChild(loading);

      const currentItems = Array.prototype.slice.call(itemFrame.contentDocument.querySelectorAll('.comt-plist'));
      let stack = Promise.resolve();

      currentItems.forEach((e, index) => {
        stack = stack.then(() => {
          window.commitbot.elements.p2.innerText = `正在晒单 ${index + 1}/${currentItems.length}条`;
          return commentItemP(e);
        });
      });

      stack.then(() => {
        rec();
      });

      stack.catch((e) => {
        rej(e);
      });
    };

    itemFrame.src = `${window.commitbot.commentListLocation}?sort=1&page=${page}`;
  });
};

const getPagesP = () => {
  const elements = Array.prototype.slice.call(window.document.querySelectorAll('.pagin.pagin-m.fr a'));

  if (!elements || elements.length < 1) {
    return {
      pages: [],
      currentPage: 0
    };
  }

  const pages = elements.filter(e => !['prev', 'next'].includes(e.className)).map(e => e.innerText).sort();

  const currentPage = window.document.querySelector('.pagin.pagin-m.fr a.current').innerText;

  return {
    pages,
    currentPage
  };
};

const commentAllP = () => {
  const { pages, currentPage } = getPagesP();

  const validPages = pages.filter(p => p >= currentPage).reverse();

  let stack = Promise.resolve();

  validPages.forEach((page, index) => {
    stack = stack.then(() => {
      window.commitbot.elements.p1.innerText = `正在晒单 ${index + 1}/${validPages.length}页`;
      return commentCurrentPageP(page);
    });
  });

  return stack;
};

window.commitbot.photos = () => {
  const button = window.document.createElement('div');

  window.document.querySelector('.mod-main.mod-comm.lefta-box .mt').appendChild(button);

  button.style.fontSize = '12px';
  button.style.width = '87px';
  button.style.height = '27px';
  button.style.lineHeight = '27px';
  button.style.padding = 0;
  button.style.marginTop = '-10px';
  button.style.marginRight = '95px';
  button.style.cssFloat = 'right';
  button.style.textAlign = 'center';
  button.style.cursor = 'pointer';

  button.className = 'btn-9';
  button.innerText = '自动晒单';

  button.onclick = (e) => {
    e.preventDefault();
    button.style.display = 'none';
    window.commitbot.elements.dimmer.style.display = 'block';
    window.commitbot.loading.show();

    window.document.body.style.width = '100%';
    window.document.body.style.height = '100%';
    window.document.body.style.overflow = 'hidden';

    const res = commentAllP();

    res.then(() => {
      alert('晒单成功');
      window.location.reload();
    });

    res.catch((e) => {
      alert(e.message || e.error || JSON.stringify(e));
      window.location.reload();
    });
  };
};