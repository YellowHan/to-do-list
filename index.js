const $ = (selector) => document.querySelector(selector);

const App = () => {
  let count = 1;
  const addList = () => {
    if ($("#todo-name").value === "") return;
    $(".list").insertAdjacentHTML(
      "beforeend",
      `<li id="list-item${count}">
      <canvas id="checkBox${count++}" class="empty"></canvas>${
        $("#todo-name").value
      }</li>`,
      localStorage.setItem("todolist", $("#todo-name").value)
    );
    $("#todo-name").value = "";
  };

  const checkRender = (id) => {
    const canvas = $(`#${id}`);
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 30;
    ctx.strokeStyle = "rgb(89, 181, 200)";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    let x = 20;
    let y = 50;

    const render = () => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      const animate = requestAnimationFrame(() => {
        if (x < 90) {
          ctx.lineTo((x += 5), (y += 5));
          ctx.stroke();
          return render();
        }
        if (x > 260) {
          cancelAnimationFrame(animate);
          return;
        }
        ctx.lineTo((x += 10), (y -= 5));
        ctx.stroke();
        render();
      });
    };
    render();
  };

  const clearRender = (id) => {
    const canvas = $(`#${id}`);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.width);
    x = 20;
    y = 50;
  };

  $("button").addEventListener("click", addList);
  $(".list").addEventListener("click", (e) => {
    if (e.target.classList.contains("empty")) {
      checkRender(e.target.id);
      e.target.className = "checked";
      e.target.closest("li").className = "line-through";
      return;
    }

    if (e.target.classList.contains("checked")) {
      clearRender(e.target.id);
      e.target.className = "empty";
      e.target.closest("li").className = "";
      return;
    }
  });
};

App();
