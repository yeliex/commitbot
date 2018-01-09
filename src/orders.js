const commentItem = (url) => {
  return new Promise((rec, rej) => {
    const itemFrame = window.document.createElement('iframe');

    itemFrame.style.position = 'absolute';
    itemFrame.style.left = 0;
    itemFrame.style.right = 0;
    itemFrame.style.top = 0;
    itemFrame.style.bottom = 0;
    itemFrame.style.width = '1210px';
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

      // set all stars to star5
      Array.prototype.slice.call(itemFrame.contentDocument.querySelectorAll('.star.star5')).forEach(star => star.click());

      // fill all textarea
      Array.prototype.slice.call(itemFrame.contentDocument.querySelectorAll('.f-item.f-goods')).forEach((item) => {
        const classNames = `.${item.className.split(' ').join('.')}`;

        const itemName = itemFrame.contentDocument.querySelector(`${classNames} .p-name a`).innerText;
        const itemAttr = itemFrame.contentDocument.querySelector(`${classNames} .p-attr`).innerText;

        const textElement = itemFrame.contentDocument.querySelector(`${classNames} .f-textarea textarea`);

        const tags = Array.prototype.slice.call(itemFrame.contentDocument.querySelectorAll(`${classNames} .m-tagbox`));

        tags.forEach((tagList) => {
          const tag = tagList.querySelector('a');
          if (tag) {
            tag.click();
          }
        });

        textElement.value = `${itemName} ${itemAttr} ${window.commitbot.defaultCommitContent}`;
      });

      window.commitbot.wait(1000).then(() => {
        return new Promise((rec) => {
          itemFrame.onload = () => {
            rec();
          };
          itemFrame.contentDocument.querySelector('.btn-submit').click();
        });
      }).then(() => {
        window.commitbot.elements.dimmer.removeChild(itemFrame);
        return window.commitbot.wait();
      }).then(() => {
        rec();
      });
    };

    itemFrame.src = url;
  });
};

const commentCurrentPage = (page) => {
  return new Promise((rec, rej) => {
    window.commitbot.elements.listFrame.onload = () => {
      const currentItems = Array.prototype.slice.call(window.commitbot.elements.listFrame.contentDocument.querySelectorAll('.operate .btn-def'));
      let stack = Promise.resolve();

      currentItems.forEach((e, index) => {
        stack = stack.then(() => {
          window.commitbot.elements.p2.innerText = `正在评价 ${index + 1}/${currentItems.length}条`;
          return commentItem(e.href);
        });
      });

      stack.then(() => {
        rec();
      });

      stack.catch((e) => {
        rej(e);
      });
    };

    window.commitbot.elements.listFrame.src = `${window.commitbot.commentListLocation}?page=${page}`;
  });
};

const getPages = () => {
  const elements = Array.prototype.slice.call(window.document.querySelectorAll('.ui-page a'));

  if (!elements || elements.length < 1) {
    return {
      pages: [],
      currentPage: 0
    };
  }

  const pages = elements.map(e => e.rel).sort().reduce((total, current) => {
    if (total.indexOf(current) < 0) {
      total.push(current);
    }
    return total;
  }, []);

  const currentPage = window.document.querySelector('.ui-page a.ui-page-curr').rel;

  return {
    pages,
    currentPage
  };
};

const commentAll = () => {
  // 获取页码
  const { pages, currentPage } = getPages();

  const validPages = pages.filter(p => p >= currentPage).reverse();

  let stack = Promise.resolve();

  validPages.forEach((page, index) => {
    stack = stack.then(() => {
      window.commitbot.elements.p1.innerText = `正在评价 ${index + 1}/${validPages.length}页`;
      return commentCurrentPage(page);
    });
  });

  return stack;
};

window.commitbot.orders = () => {
  const button = window.document.createElement('div');

  window.document.querySelector('.m-tab-wrap.clearfix').appendChild(button);

  button.style.fontSize = '12px';
  button.style.width = '87px';
  button.style.height = '27px';
  button.style.lineHeight = '27px';
  button.style.padding = 0;
  button.style.marginTop = '15px';
  button.style.marginRight = '95px';
  button.style.cssFloat = 'right';

  button.className = 'btn-def';
  button.innerText = '自动评价';

  button.onclick = (e) => {
    e.preventDefault();
    button.style.display = 'none';
    window.commitbot.elements.dimmer.style.display = 'block';
    window.commitbot.loading.show();

    window.document.body.style.width = '100%';
    window.document.body.style.height = '100%';
    window.document.body.style.overflow = 'hidden';

    const res = commentAll();

    res.then(() => {
      alert('评价成功');
      window.location.reload();
    });

    res.catch((e) => {
      alert(e.message || e.error || JSON.stringify(e));
      window.location.reload();
    });
  };
};
