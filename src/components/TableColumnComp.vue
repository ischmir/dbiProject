<template>
  <td>
    <slot />
  </td>
</template>

<style lang="scss" scoped>
td {
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  vertical-align: middle;
  padding: 12px 24px;

  &:last-child {
    float: right;
  }
}
</style>
