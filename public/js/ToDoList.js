var todo = {
  data: [],
  load: function() {

    if (localStorage.list == undefined) {
      localStorage.list = "[]";
    }

    todo.data = JSON.parse(localStorage.list);
    todo.list();
  },


  save: function() {

    localStorage.list = JSON.stringify(todo.data);
    todo.list();
  },


  list: function() {

    var container = document.getElementById("todo-list");
    container.innerHTML = "";


    if (todo.data.length > 0) {
      var row = "",
        el = "";
      for (var key in todo.data) {

        row = document.createElement("div");
        row.classList.add("todo-row");
        row.dataset.id = key;

        el = document.createElement("div");
        el.classList.add("todo-item");
        if (todo.data[key][1] == 1) {
          el.classList.add("done");
        }
        if (todo.data[key][1] == 2) {
          el.classList.add("cx");
        }
        el.innerHTML = todo.data[key][0];
        row.appendChild(el);


        el = document.createElement("input");
        el.setAttribute("type", "button");
        el.value = "\u2716";
        el.classList.add("todo-cx");
        el.addEventListener("click", function() {
          todo.status(this, 2);
        });
        row.appendChild(el);


        el = document.createElement("input");
        el.setAttribute("type", "button");
        el.value = "\u2714";
        el.classList.add("todo-ok");
        el.addEventListener("click", function() {
          todo.status(this, 1);
        });
        row.appendChild(el);


        container.appendChild(row);
      }
    }
  },

  add: function() {

    let item = document.getElementById("todo-item");
    todo.data.push([item.value, 0]);
    item.value = "";
    todo.save();
  },

  status: function(el, stat) {

    todo.data[el.parentElement.dataset.id][1] = stat;
    todo.save();
  },

  del: function(type) {
    if (confirm("Delete tasks?")) {

      if (type == 0) {
        todo.data = [];
        todo.save();
      } else {
        todo.data = todo.data.filter(row => row[1] == 0);
        todo.save();
      }
    }
  }
};


window.addEventListener("load", function() {
  document.getElementById("todo-delall").addEventListener("click", function() {
    todo.del(0);
  });
  document.getElementById("todo-delcom").addEventListener("click", function() {
    todo.del(1);
  });
  document.getElementById("todo-add").addEventListener("submit", function(evt) {
    evt.preventDefault();
    todo.add();
  });
  todo.load();
});