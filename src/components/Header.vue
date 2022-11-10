<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  //   computed: {
  //     value: {
  //       get() {
  //         return this.modelValue;
  //       },
  //       set(value) {
  //         this.$emit("update:modelValue", value);
  //       },
  //     },
  //   },
};
</script>

<template>
  <input
    class="new-todo"
    autofocus
    placeholder="What needs to be done?"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
