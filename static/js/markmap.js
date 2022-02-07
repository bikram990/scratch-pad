((win, doc) => {
    async function getMarkdown (url) {
      const res = await fetch(url);
  
      return await res.text();
    }
  
    async function renderFromURL (el, url) {
      const t = new markmap.Transformer,
            md = await getMarkdown(url),
            { root } = t.transform(md);
      const elem = doc.getElementById(el);
      win.markmap.Markmap.create(el, null, root);
    }
    async function render (el, content) {
      const t = new markmap.Transformer,
            md = content,
            { root } = t.transform(md);
      const elem = doc.getElementById(el);
      win.markmap.Markmap.create(el, null, root);
    }
  
    win.markmapjs = { render, renderFromURL }
  })(window, document);