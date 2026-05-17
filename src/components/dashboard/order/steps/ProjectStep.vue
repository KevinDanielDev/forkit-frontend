<script setup lang="ts">
/**
 * ProjectStep — Second step in multi-step order creation dialog.
 *
 * Collects project details and manages file uploads:
 * - **Project Information** — Title, priority, status, description
 * - **File Upload** — Support for multiple file uploads with image preview
 * - **Image Gallery** — Real-time preview of uploaded images
 * - **Form Validation** — Required fields and file type validation
 * - **Memory Management** — Automatic cleanup of object URLs on unmount
 * - **Data Binding** — Updates useOrderCreateDialog().projectData reactively
 *
 * The component exposes validateForm() method for parent multi-step dialog integration.
 * Automatically generates object URLs for image files and cleans them up on component
 * unmount to prevent memory leaks.
 *
 * **Included Fields**:
 * - Project Title (required)
 * - Priority Level (Low, Medium, High, Urgent)
 * - Project Status (Pending, In Progress, Completed)
 * - Description (text area)
 * - File Uploads (multiple)
 *
 * @component
 * @exposes {Function} validateForm - Validates form and returns Promise<boolean>
 * @example
 * // Used in OrderCreateDialog as second step
 * const projectStepRef = ref<InstanceType<typeof ProjectStep> | null>(null);
 * // Form validation ensures title and priority are set
 *
 * @see OrderCreateDialog - Parent multi-step dialog component
 * @see useOrderCreateDialog - Manages project data and file state
 * @see useValidationRules - Provides validation rules
 */
import { ref, watch, onUnmounted } from 'vue';
import { QForm } from 'quasar';
import { useValidationRules } from 'src/composables/common/useValidationRules';
import { useOrderCreateDialog } from 'src/composables/dashboard/order/useOrderCreateDialog';

// Composables
const { projectData, filesPreview } = useOrderCreateDialog();
const { ...rules } = useValidationRules();

const projectFormRef = ref<InstanceType<typeof QForm> | null>(null);

/**
 * Cleanup object URLs for file previews to prevent memory leaks.
 */
function cleanPreviews() {
  filesPreview.value.forEach((url) => URL.revokeObjectURL(url));
  filesPreview.value = [];
}

/**
 * Watch for file changes and generate image previews from blob URLs.
 */
watch(
  () => projectData.value.files,
  (newFiles) => {
    cleanPreviews();

    if (!newFiles || newFiles.length === 0) return;

    // Generate object URLs only for image files
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

// Cleanup object URLs on component unmount
onUnmounted(() => cleanPreviews());

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
        <label class="fk-label">Estado Inicial</label>
        <q-select
          v-model="projectData.status"
          :options="['Pendiente', 'En Progreso', 'Completado']"
          outlined
          dense
          class="fk-field q-mt-xs"
          :rules="[rules.required()]"
        >
          <template v-slot:prepend
            ><q-icon name="loop" color="primary" class="opacity-50"
          /></template>
        </q-select>
      </div>

      <div class="col-12">
        <label class="fk-label">Descripción</label>
        <q-input
          v-model="projectData.description"
          placeholder="Detalles del trabajo a realizar..."
          outlined
          dense
          type="textarea"
          rows="3"
          class="fk-field q-mt-xs"
        />
      </div>

      <div class="col-12">
        <label class="fk-label q-mb-xs block">Evidencias / Fotos del Proyecto</label>

        <q-file
          v-model="projectData.files"
          accept=".jpg,.jpeg,.png"
          outlined
          dense
          multiple
          append
          use-chips
          class="fk-dropzone"
          label="Haz clic para seleccionar o arrastra fotos aquí"
        >
          <template #prepend>
            <q-icon name="cloud_upload" color="primary" size="sm" />
          </template>
        </q-file>

        <div v-if="filesPreview.length > 0" class="row q-col-gutter-sm q-mt-sm">
          <div v-for="(src, index) in filesPreview" :key="index" class="col-4 col-sm-3 col-md-2">
            <q-img :src="src" class="fk-preview-card shadow-2" :ratio="1"> </q-img>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.fk-dropzone {
  :deep(.q-field__control) {
    min-height: 80px;
    cursor: pointer;
    border: 2px dashed rgba(var(--q-primary), 0.3);
    border-radius: 12px;
    background: rgba(var(--q-primary), 0.02);
    &:hover {
      background: rgba(var(--q-primary), 0.05);
      border-color: var(--q-primary);
    }
  }
}

.fk-preview-card {
  border-radius: 8px;
  border: 1px solid rgba(var(--q-primary), 0.1);
  overflow: hidden;
}

.fk-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--q-text-color);
  opacity: 0.8;
}
</style>
