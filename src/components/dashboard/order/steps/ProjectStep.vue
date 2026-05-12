<script setup lang="ts">
import { ref, watch } from 'vue';

import { QForm } from 'quasar';

import { useValidationRules } from 'src/composables/common/useValidationRules';
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

// Composables
const { projectData, filesPreview } = useOrderCreateDialog();
const { ...rules } = useValidationRules();

// Refs
const projectFormRef = ref<InstanceType<typeof QForm> | null>(null);

// Watchers
watch(
  () => projectData.value.files,
  (newFiles) => {
    filesPreview.value.forEach((url) => URL.revokeObjectURL(url));

    if (!newFiles) {
      filesPreview.value = [];
      return;
    }

    filesPreview.value = newFiles
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => URL.createObjectURL(file));
  },
  { deep: true },
);

async function validateForm() {
  if (projectFormRef.value) {
    return await projectFormRef.value.validate();
  }
  return false;
}

defineExpose({ validateForm });
</script>

<template>
  <q-form ref="projectFormRef" class="q-gutter-y-md animate-slide-up">
    <div class="fk-section-header">Detalles del Trabajo</div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <label class="fk-label">Título</label>
        <q-input
          v-model="projectData.title"
          placeholder="Ej. Diseño de Logo"
          outlined
          dense
          class="fk-field q-mt-xs"
          :rules="[rules.required()]"
        >
          <template v-slot:prepend
            ><q-icon name="title" color="primary" class="opacity-50"
          /></template>
        </q-input>
      </div>

      <div class="col-12 col-md-4">
        <label class="fk-label">Prioridad</label>
        <q-select
          v-model="projectData.priority"
          :options="['Baja', 'Media', 'Alta', 'Urgente']"
          outlined
          dense
          class="fk-field q-mt-xs"
          :rules="[rules.required()]"
        >
          <template v-slot:prepend
            ><q-icon name="priority_high" color="primary" class="opacity-50"
          /></template>
        </q-select>
      </div>

      <div class="col-12">
        <label class="fk-label">Descripción</label>
        <q-input
          v-model="projectData.description"
          placeholder="Ej. Diseño de página web, desarrollo de aplicación, etc..."
          outlined
          dense
          type="textarea"
          rows="3"
          class="fk-field q-mt-xs"
        >
          <template v-slot:prepend
            ><q-icon name="description" color="primary" class="opacity-50"
          /></template>
        </q-input>
      </div>

      <div class="col-12">
        <label class="fk-label q-mb-xs block">Archivos</label>

        <q-file
          v-model="projectData.files"
          accept=".jpg,.jpeg,.png"
          outlined
          dense
          multiple
          append
          class="fk-dropzone"
        >
          <template #prepend>
            <div class="column items-center">
              <q-icon name="cloud_upload" color="primary" size="md" />
            </div>
          </template>
          <template #append>
            <div class="column items-center">
              <q-icon
                v-if="projectData.files && projectData.files.length > 0"
                name="close"
                @click.stop.prevent="projectData.files = []"
                color="negative"
                size="sm"
              />
            </div>
          </template>
        </q-file>

        <div v-if="filesPreview.length > 0" class="row q-col-gutter-sm q-mt-sm">
          <div v-for="(src, index) in filesPreview" :key="index" class="col-4 col-sm-3 col-md-2">
            <q-img :src="src" class="fk-preview-card shadow-1" :ratio="1"> </q-img>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.fk-dropzone {
  :deep(.q-field__control) {
    min-height: 100px;
    cursor: pointer;
    border: 2px dashed rgba(var(--q-primary), 0.2);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease;
    &:hover {
      background: rgba(var(--q-primary), 0.02);
      border-color: var(--q-primary);
    }
  }
}

.fk-dialog-body {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
}

.fk-preview-card {
  border-radius: 12px;
  border: 1px solid rgba(var(--q-primary), 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
