const subject = () => {
  document.querySelector("#subject").innerHTML = `
  <header>
    <h1>WEB</h1>
    Hello, WEB
  </header>
  `;
};

const TOC = () => {
  var state = store.getState();
  var i = 0;

  var liTags = "";
  while (i < state.contents.length) {
    liTags += `
      <li>
        <a 
          onclick = "
            event.preventDefault()
            var action = {type:'SELECT', id:${state.contents[i].id} }
            store.dispatch(action)
          "
          href="${state.contents[i].id}"
          value="${state.contents[i].id}"
        >
          ${state.contents[i].title}
        </a>
      </li>
      `;
    i = i + 1;
  }
  console.log(state);
  document.querySelector("#toc").innerHTML = `
  <nav>
    <ol>
      ${liTags}
    </ol>
  </nav> 
  `;
};

const control = () => {
  document.querySelector("#control").innerHTML = `
  <ul>
    <li>
      <a onclick = "
        event.preventDefault();
        store.dispatch({
          type:'CHANGE_MODE',
          mode: 'create'
        })
        "
        href="/create"
      >create</a>
    </li>
    <li>
      <input 
        onclick= "store.dispatch({type:'DELETE'})" 
        type="button" 
        value="delete" 
      />
    </li>
  </ul>
  `;
};

const article = () => {
  var state = store.getState();
  console.log("article stat mode ", state.mode);
  if (state.mode === "create") {
    document.querySelector("#content").innerHTML = `
    <article>
      <form onsubmit="
        event.preventDefault();
        var _title = this.title.value;
        var _desc = this.desc.value;
        store.dispatch({type:'CREATE', title: _title, desc:_desc})
      ">
        <p>
          <input type="text" name="title" placeholder="title">
        </p>
        <p>
          <textarea name="desc" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    </article>
    `;
  } else if (state.mode === "read") {
    var i = 0;
    var aTitle, aDesc;
    while (i < state.contents.length) {
      if (state.contents[i].id === state.selected_id) {
        aTitle = state.contents[i].title;
        aDesc = state.contents[i].desc;
        console.log(aTitle, aDesc);
        break;
      }
      i += 1;
    }
    document.querySelector("#content").innerHTML = `
    <article>
      <h2>${aTitle}</h2>
      ${aDesc}
    </article> 
    `;
  } else if (state.mode === "welcome") {
    document.querySelector("#content").innerHTML = `
    <article>
      <h2>Welcome</h2>
      Hello redux
    </article> 
    `;
  }
};
