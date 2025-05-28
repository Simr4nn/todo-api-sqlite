document.getElementById('displayTodos').addEventListener('click', () => {
  fetch('/todos')
    .then(res => res.json())
    .then(data => {
      const display = document.getElementById('todoDisplay');
      display.textContent = JSON.stringify(data, null, 2);
    });
});

document.getElementById('submitTodo').addEventListener('click', () => {
  const name = document.getElementById('todoName').value;
  const priority = document.getElementById('todoPriority').value || 'low';
const isFun = document.getElementById('todoIsFun').value !== 'false';
  const todo = {
    name,
    priority,
    isComplete: false,
    isFun
  };

  fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Added:', data);
      alert(`Todo added with ID: ${data.id}`);
    });
});

document.getElementById('deleteTodo').addEventListener('click', () => {
  const id = document.getElementById('todoIdToDelete').value;
  fetch(`/todos/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      console.log('Deleted:', data);
      alert(`Deleted ${data.deleted} item(s)`);
    });
});
