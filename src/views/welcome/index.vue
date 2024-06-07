<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <h1>Pure-Admin-Thin（非国际化版本）</h1>
  <el-date-picker
    v-model="value2"
    type="date"
    placeholder="Pick a day"
    :disabled-date="disabledDate"
    :shortcuts="shortcuts"
    :size="size"
  />
</template>
