function reducer(state, action) {
  if (state === undefined) {
    return {
      max_id: 2,
      mode: "welcome",
      selected_id: 1,
      contents: [
        { id: 1, title: "HTML", desc: "HTML is .." },
        { id: 2, title: "CSS", desc: "CSS is .." },
      ],
    };
  }
  var newState;
  if (action.type === "SELECT") {
    newState = Object.assign({}, state, {
      selected_id: action.id,
      mode: "read",
    });
  } else if (action.type === "CREATE") {
    var newMaxId = state.max_id + 1;
    var newContents = state.contents.concat();
    newContents.push({
      id: newMaxId,
      title: action.title,
      desc: action.desc,
    });
    newState = Object.assign({}, state, {
      max_id: newMaxId,
      contents: newContents,
      mode: "read",
    });
  } else if (action.type === "DELETE") {
    var newContents = [];
    var i = 0;
    while (i < state.contents.length) {
      if (state.selected_id !== state.contents[i].id) {
        newContents.push(state.contents[i]);
      }
      i = i + 1;
    }
    newState = Object.assign({}, state, {
      contents: newContents,
      mode: "welcome",
    });
  } else if (action.type === "CHANGE_MODE") {
    newState = Object.assign({}, state, {
      mode: action.mode,
    });
    console.log("CHANGE_MODE", action.mode);
  }
  return newState;
}

var store = Redux.createStore(reducer);
