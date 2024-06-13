<script setup lang="ts">
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { reactive } from "vue";

defineOptions({
  name: "MaterialPage"
});
const formInline = reactive({
  user: "",
  region: "",
  date: ""
});

const onSubmit = () => {
  console.log("submit!");
};
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">Gerenciar usuários</span>
        <el-button size="small" :icon="useRenderIcon('ep:plus')" type="primary">
          Novo
        </el-button>
      </div>
    </template>
    <el-form
      :inline="true"
      :size="'small'"
      :label-position="'top'"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="Approved by">
        <el-input
          v-model="formInline.user"
          placeholder="Approved by"
          clearable
        />
      </el-form-item>
      <el-form-item label="Aprovado pelo cliente">
        <el-input
          v-model="formInline.user"
          placeholder="Approved by"
          clearable
        />
      </el-form-item>
      <el-form-item label="Cnpj">
        <el-input
          v-model="formInline.user"
          placeholder="Approved by"
          clearable
        />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input
          v-model="formInline.user"
          placeholder="Approved by"
          clearable
        />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input
          v-model="formInline.user"
          placeholder="Approved by"
          clearable
        />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input
          v-model="formInline.user"
          placeholder="Approved by"
          clearable
        />
      </el-form-item>
      <el-form-item label="Approved by">
        <el-input
          v-model="formInline.user"
          placeholder="Approved by"
          clearable
        />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select
          v-model="formInline.region"
          placeholder="Activity zone"
          clearable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-date-picker
          v-model="formInline.date"
          type="date"
          placeholder="Pick a date"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" :border="true" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </el-card>
</template>
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
