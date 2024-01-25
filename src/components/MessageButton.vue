<template>
  <button class="button" :class="buttonClass" :disable="disabled">
    <slot />
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const buttonClass = computed(() => {
      return `${props.disabled ? "button--disbled" : ""} ${
        props.square ? "button--square" : ""
      }`;
    });
    return {
      buttonClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.button {
  color: #fff;
  background-color: $brand;
  padding: 6px 22px;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all ease 75ms;
  user-select: none;
  border: none;

  &--disabled {
    filter: brightness(80%);
    pointer-events: none;
  }

  &--square {
    border-radius: 5px;
  }

  &:hover {
    background-color: $brand;
    color: #fff;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  &:active {
    transform: scale(1.05);
  }
}
</style>
