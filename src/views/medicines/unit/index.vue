<template>
  <el-card shadow="never">
    <template #header="">
      <div class="card-header">
        <span class="font-medium">Unidade / Cadastro dos tipos de Unidade</span>
        <el-button size="small" :icon="useRenderIcon('ep:plus')" type="primary"> Novo </el-button>
      </div>
    </template>
    <el-table v-loading="loading" border stripe :data="tableData">
      <el-table-column prop="description" label="Descrição" />
      <el-table-column prop="createdAt" :formatter="dateTimeToBrFormatter" label="Criação" />
      <el-table-column prop="updatedAt" :formatter="dateTimeToBrFormatter" label="Ultima Atualização" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getAllUnit, UnitResponseDto } from "@/api/medicines";
import { dateTimeToBrFormatter } from "@/utils/formatters";

defineComponent({ name: "Unit" });
const search = ref("");
const tableData = ref<UnitResponseDto[]>([]);
const loading = ref(true);
const fetchUnitData = async () => {
  loading.value = true;
  tableData.value = await getAllUnit(true);
  loading.value = false;
};
onMounted(async () => {
  await fetchUnitData();
});
</script>
