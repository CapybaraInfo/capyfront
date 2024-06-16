<template>
  <el-card shadow="never">
    <template #header="">
      <div class="card-header">
        <span class="font-medium">Unidade / Cadastro dos tipos de Unidade</span>
        <el-button size="small" :icon="useRenderIcon('ep:plus')" type="primary" @click="onCreate"> Novo </el-button>
      </div>
    </template>
    <el-table v-loading="loading" border stripe :data="filterTableData">
      <el-table-column prop="description" label="Descrição" />
      <el-table-column prop="createdAt" :formatter="dateTimeToBrFormatter" label="Criação" />
      <el-table-column prop="updatedAt" :formatter="dateTimeToBrFormatter" label="Ultima Atualização" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Digite para procurar" />
        </template>
        <template #default="scope">
          <div class="flex flex-row justify-start">
            <el-button type="success" link @click="onEditClick(scope.$index, scope.row)"> Editar</el-button>
            <el-popconfirm title="Você tem certaza?" width="200" @confirm="onDelete(scope.$index, scope.row)">
              <template #reference>
                <el-button type="danger" link> Deletar</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <UnitDialogForm :visible="centerDialogVisible" :form="form" @update:visible="centerDialogVisible = $event" @refresh-table="fetchUnitData" />
  </el-card>
</template>

<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { deleteUnit, getAllUnit, UnitRequestDto, UnitResponseDto } from "@/api/medicines";
import { dateTimeToBrFormatter } from "@/utils/formatters";
import UnitDialogForm from "@/views/medicines/unit/components/UnitDialogForm.vue";
import { deleteMaterialType, getAllMaterialType, MaterialTypeRequestDto, MaterialTypeResponseDto } from "@/api/material";

const centerDialogVisible = ref(false);
const form = ref<UnitRequestDto>({ description: "" });

defineComponent({ name: "Unit" });
const search = ref("");
const tableData = ref<UnitResponseDto[]>([]);
const loading = ref(true);
const filterTableData = computed(() => tableData.value.filter(data => !search.value || data.description.toLowerCase().includes(search.value.toLowerCase())));
const fetchUnitData = async () => {
  loading.value = true;
  tableData.value = await getAllUnit(true);
  loading.value = false;
};
onMounted(async () => {
  await fetchUnitData();
});

const onCreate = () => {
  form.value = { id: null, description: "" };
  centerDialogVisible.value = true;
};

const onEditClick = (_: number, row: UnitRequestDto) => {
  form.value = row;
  centerDialogVisible.value = true;
};

const onDelete = async (_: number, row: UnitResponseDto) => {
  loading.value = true;
  await deleteUnit(row);
  tableData.value = await getAllUnit(true);
  loading.value = false;
};
</script>
