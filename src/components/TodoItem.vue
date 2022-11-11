<script>
export default {
  props: ["modelValue", "isEdit", "completedItem"],
  emits: [
    "editItem",
    "removeItem",
    "doneItem",
    "cancelItem",
    "update:modelValue",
    "clickCheck",
  ],
};
</script>

<template>
  <li class="todo">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        v-model="completedItem"
        @click="$emit('clickCheck')"
      />
      <label @dblclick="$emit('editItem')">{{ modelValue }}</label>
      <button class="destroy" @click="$emit('removeItem')"></button>
    </div>
    <input
      v-if="isEdit"
      class="edit"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @vnode-mounted="({ el }) => el.focus()"
      @blur="$emit('doneItem')"
      @keyup.enter="$emit('doneItem')"
      @keyup.escape="$emit('cancelItem')"
    />
  </li>
</template>
