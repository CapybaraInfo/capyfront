<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { createMaterialType, MaterialTypeRequestDto, updateMaterialType } from "@/api/material";
import { ref, toRefs, watch } from "vue";
import { AxiosError } from "axios";

defineOptions({
  name: "MaterialTypeFormDialog"
});

const props = defineProps<{
  visible: boolean;
  form: MaterialTypeRequestDto;
}>();

const { form } = toRefs(props);
const localVisible = ref(props.visible);
const formRef = ref<FormInstance>();
const errors = ref<{ [key: string]: string }>({});

const emits = defineEmits(["update:visible", "refreshTable"]);

const closeDialog = () => {
  emits("update:visible", false);
};

const submitEdit = async () => {
  try {
    await updateMaterialType(form.value);
    ElMessage.success("Tipo de material atualizado com sucesso");
    closeDialog();
    emits("refreshTable");
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const validationErrors = error.response.data.validationMessages;
      validationErrors.forEach(v => {
        errors.value[v.field] = v.message;
      });
    }
    ElMessage.error("Erro ao atualizar tipo de material");
  }
};

const submitCreate = async () => {
  try {
    await createMaterialType(form.value);
    ElMessage.success("Tipo de material criado com sucesso");
    closeDialog();
    emits("refreshTable");
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const validationErrors = error.response.data.validationMessages;
      validationErrors.forEach(v => {
        errors.value[v.field] = v.message;
      });
    }
    ElMessage.error("Erro ao criar tipo de material");
  }
};

watch(
  () => props.visible,
  newVal => {
    localVisible.value = newVal;
  }
);
</script>
<template>
  <el-dialog v-model="localVisible" :title="form.id ? 'Editar' : 'Cadastrar'" width="400" :before-close="closeDialog">
    <el-form ref="formRef" :model="form" label-width="auto" style="max-width: 400px" label-position="left">
      <el-form-item label="Código" prop="id">
        <el-input v-model="form.id" placeholder="Código gerado automaticamente" readonly disabled />
      </el-form-item>
      <el-form-item label="Descrição" prop="description" :error="errors.description">
        <el-input v-model="form.description" placeholder="Informe a descrição" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">Cancelar</el-button>
        <el-button v-if="form.id" type="primary" @click="submitEdit">Atualizar</el-button>
        <el-button v-if="!form.id" type="primary" @click="submitCreate">Cadastrar</el-button>
      </div>
    </template>
  </el-dialog>
</template>
