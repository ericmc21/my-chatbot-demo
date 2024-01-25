<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <img
        width="355"
        height="544"
        src="@/assets/images/find-doc-3.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["TogglePopup"],
};
</script>

<style lang="scss" scoped>
.popup {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: left;
  justify-content: left;

  .popup-inner {
    background: #fff;
    padding: 0px;
  }
}
</style>
