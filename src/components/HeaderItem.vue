<script>
import HeaderInput from "./HeaderInput.vue";

export default {
  components: { HeaderInput },
  props: ["textHeader"],
  emits: ["addTodo"],
  data: () => ({
    textValue: "",
  }),

  methods: {
    addTodoForm() {
      this.$emit("addTodo", this.textValue);
      this.textValue = "";
    },
  },
};
</script>

<template>
  <header class="header">
    <h1>{{ textHeader }}</h1>
    <form @submit.prevent="addTodoForm">
      <HeaderInput v-model="textValue" />
    </form>
  </header>
</template>
