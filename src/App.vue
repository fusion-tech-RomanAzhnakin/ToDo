<script>
import HeaderItem from "./components/HeaderItem.vue";
import TodoItem from "./components/TodoItem.vue";
import filters from "./functions/filters.js";

// const filters = {
//   all: (todos) => todos,
//   active: (todos) => todos.filter((todo) => !todo.completed),
//   completed: (todos) => todos.filter((todo) => todo.completed),
// };

export default {
  components: { HeaderItem, TodoItem },
  data: () => ({
    todos: [],
    editedTodo: null,
    visibility: "all",
  }),

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
  },

  methods: {
    toggleAll(e) {
      this.todos = this.todos.map((todo) => {
        todo.completed = e.target.checked;
        return todo;
      });
    },

    addTodo(value) {
      if (!value) {
        return;
      }
      this.todos.push({
        id: Date.now(),
        title: value,
        completed: false,
      });
    },

    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted() {
      this.todos = filters.active(this.todos);
    },

    setAll() {
      this.visibility = "all";
    },

    setActive() {
      this.visibility = "active";
    },

    setCompleted() {
      this.visibility = "completed";
    },

    isEdited(todoLocal) {
      return todoLocal === this.editedTodo;
    },
  },
};
</script>

<template>
  <section class="todoapp">
    <HeaderItem textHeader="todos" @addTodo="addTodo($event)"></HeaderItem>
    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="remaining === 0"
        @change="toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          v-model="todo.title"
          :isEdit="isEdited(todo)"
          :completedItem="todo.completed"
          @doneItem="doneEdit(todo)"
          @cancelItem="cancelEdit(todo)"
          @removeItem="removeTodo(todo)"
          @editItem="editTodo(todo)"
          @clickCheck="todo.completed = !todo.completed"
          :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
        </TodoItem>
        <!--  <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
            <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            v-if="todo === editedTodo"
            class="edit"
            type="text"
            v-model="todo.title"
            @vnode-mounted="({ el }) => el.focus()"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
          /> 
        </li>-->
      </ul>
    </section>
    <footer class="footer" v-if="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        <span>{{ remaining === 1 ? "item" : "items" }} left</span>
      </span>
      <ul class="filters">
        <li>
          <button @click="setAll">All</button>
        </li>
        <li>
          <button @click="setActive">Active</button>
        </li>
        <li>
          <button @click="setCompleted">Completed</button>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style></style>
