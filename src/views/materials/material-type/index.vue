<script setup lang="ts">
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { deleteMaterialType, getAllMaterialType, MaterialTypeRequestDto, MaterialTypeResponseDto } from "@/api/material";
import { dateTimeToBrFormatter } from "@/utils/formatters";
import MaterialTypeFormDialog from "@/views/materials/material-type/components/MaterialTypeFormDialog.vue";

defineOptions({
  name: "MaterialTypePage"
});
const search = ref("");
const tableData = ref<MaterialTypeResponseDto[]>([]);
const loading = ref(true);
const centerDialogVisible = ref(false);
const filterTableData = computed(() => tableData.value.filter(data => !search.value || data.description.toLowerCase().includes(search.value.toLowerCase())));

const form = ref<MaterialTypeRequestDto>({ description: "" });
const windowHeigth = ref<number>(500);

const onEditClick = (_: number, row: MaterialTypeRequestDto) => {
  form.value = row;
  centerDialogVisible.value = true;
};
const onCreateClick = () => {
  form.value = { id: null, description: "" };
  centerDialogVisible.value = true;
};

const fetchApiData = async () => {
  loading.value = true;
  tableData.value = await getAllMaterialType(true);
  loading.value = false;
};

const updateParentSize = () => {
  windowHeigth.value = document.getElementsByClassName("grow")[0].scrollHeight - 128;
};

const onDelete = async (_: number, row: MaterialTypeResponseDto) => {
  loading.value = true;
  await deleteMaterialType(row);
  tableData.value = await getAllMaterialType(true);
  loading.value = false;
};

onMounted(async () => {
  await fetchApiData();
  updateParentSize();
  window.addEventListener("resize", updateParentSize, false);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateParentSize, false);
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">Cadastro / Alteração de Tipo de Material</span>
        <el-button size="small" :icon="useRenderIcon('ep:plus')" type="primary" @click="onCreateClick"> Novo </el-button>
      </div>
    </template>
    <el-table v-loading="loading" :data="filterTableData" border stripe :height="windowHeigth">
      <el-table-column label="Descrição" prop="description" />
      <el-table-column label="Criação" prop="createdAt" :formatter="dateTimeToBrFormatter" />
      <el-table-column label="Atualizado" prop="updatedAt" :formatter="dateTimeToBrFormatter" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Digite para procurar" />
        </template>
        <template #default="scope">
          <div class="flex flex-row justify-start">
            <el-button type="success" link @click="onEditClick(scope.$index, scope.row)"> Editar</el-button>
            <el-popconfirm title="Você tem certaza?" @confirm="onDelete(scope.$index, scope.row)" width="200">
              <template #reference>
                <el-button type="danger" link> Deletar</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <MaterialTypeFormDialog :visible="centerDialogVisible" :form="form" @update:visible="centerDialogVisible = $event" @refresh-table="fetchApiData" />
  </el-card>
</template>

<style>
.el-card__body {
  padding: 5px;
}
</style>
