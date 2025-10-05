import { getCurrentPage } from '../common/utils';


const onPageScroll = function (event) {
  const page = getCurrentPage();

  if (!page) return;
  const { pageScroller } = page;

  pageScroller?.forEach((scroller) => {
    if (typeof scroller === 'function') {
      // @ts-ignore
      scroller(event);
    }
  });
};

export default (funcName = 'onScroll') => ({
  mounted() {
    const bindScroller = this[funcName]?.bind(this);
    // #ifdef H5
    this._scroller = getScroller(this.$el);
    if (this._scroller) {
      this._scroller.addEventListener('scroll', bindScroller);
    }
    // #endif
    const page = getCurrentPage();
    if (!page) return;

    if (bindScroller) {
      this._pageScroller = bindScroller;
    }
    console.log('pageScroller', page.pageScroller);

    if (Array.isArray(page.pageScroller)) {
      page.pageScroller.push(bindScroller);
    } else {
      page.pageScroller = typeof page.onPageScroll === 'function' ? [page.onPageScroll.bind(page), bindScroller] : [bindScroller];
    }

    page.onPageScroll = onPageScroll;
  },

  beforeUnMount() {
    // #ifdef H5
    const bindScroller = this[funcName]?.bind(this);

    if (this._scroller) {
      this._scroller.removeEventListener('scroll', bindScroller);
    }
    // #endif

    const page = getCurrentPage();
    if (!page) return;

    page.pageScroller = page.pageScroller?.filter(item => item !== this._pageScroller) || [];
  },
});

const overflowScrollReg = /scroll|auto|overlay/i;
export function getScroller(el, root) {
  // #ifdef H5
  if (root === void 0) {
    root = window;
  }

  let node = el;

  while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== root) {
    const { overflowY } = window.getComputedStyle(node);

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
  // #endif
}
