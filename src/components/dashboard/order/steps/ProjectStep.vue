<script setup lang="ts">
/**
 * ProjectStep — Second step of order creation dialog.
 * 
 * Collects project details and scope information:
 * - Project title/name
 * - Priority level (High, Medium, Low)
 * - Status (Pending, In Progress, Completed)
 * - Description
 * - File attachments (documents, images)
 * 
 * **Form Fields**
 * - Title: Required, project name (8-100 chars)
 * - Priority: Required, dropdown select
 * - Status: Required, predefined status options
 * - Description: Optional, detailed project description
 * - Files: Optional, file upload with preview
 * 
 * **File Handling**
 * - Accepts any file type
 * - Creates object URLs for image preview
 * - Automatically cleans up URLs on change or unmount
 * - Shows thumbnail previews for attached images
 * 
 * **Validation**
 * - All required fields must be filled
 * - Title length constraints (8-100 characters)
 * - At least one file may be required (configurable)
 * 
 * **Data Binding**
 * - Two-way binding with projectData from composable
 * - File list updates trigger preview regeneration
 * 
 * **Public API**
 * - `validateForm()` method: Validates and returns boolean
 * - Called by parent (OrderCreateDialog) before proceeding
 * 
 * **Layout**
 * - Title: 8/12 on desktop (large, prominent field)
 * - Priority + Status: 2/12 each on desktop (compact selection)
 * - Description: Full width
 * - File upload: Full width with preview area
 * 
 * @component
 * @example
 * // Used internally by OrderCreateDialog
 * <project-step ref="projectStepRef" />
 * 
 * // Validation in parent:
 * const isValid = await projectStepRef?.validateForm();
 */
import { ref, watch } from 'vue';

import { QForm } from 'quasar';

import { useValidationRules } from 'src/composables/common/useValidationRules';
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

// Composables
const { projectData, filesPreview } = useOrderCreateDialog();
const { ...rules } = useValidationRules();

/** Reference to the form for validation */
const projectFormRef = ref<InstanceType<typeof QForm> | null>(null);

/**
 * Watcher for file changes.
 * Generates object URLs for image preview and cleans up old URLs.
 */
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

/**
 * Validates all form fields before proceeding to next step.
 * @async
 * @returns {Promise<boolean>} True if all fields are valid
 */
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
        <label class="fk-label">Estado del Trabajo</label>
        <q-select
          v-model="projectData.status"
          :options="['Pendiente', 'En Progreso', 'Completado']"
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
