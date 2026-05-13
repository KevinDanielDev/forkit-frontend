<script setup lang="ts">
defineProps<{
  pageName: string;
}>();
</script>

<template>
  <q-page class="flex flex-center bg-page">
    <div class="text-center fk-wip-container q-pa-xl">
      <div class="fk-icon-box fk-glow-primary q-mx-auto q-mb-lg">
        <q-icon name="construction" size="42px" />
      </div>

      <div class="text-h4 text-weight-bolder fk-value-text q-mb-sm">
        {{ pageName }}
      </div>

      <div class="text-subtitle1 text-muted q-mb-xl">
        Esta sección está bajo desarrollo para la
        <span class="text-primary text-weight-bold">V1</span>.
      </div>

      <q-card flat bordered class="fk-info-card q-mx-auto">
        <q-card-section class="row items-center no-wrap">
          <q-icon name="info" color="primary" size="24px" class="q-mr-md" />
          <div class="text-left">
            <div class="text-weight-bold fk-value-text">Próximamente</div>
            <div class="text-caption text-muted">
              Estamos puliendo los detalles finales para tu flujo de trabajo.
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-btn
        to="/dashboard"
        label="Volver al Dashboard"
        icon="arrow_back"
        unelevated
        color="primary"
        class="q-mt-xl fk-btn-back"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.fk-wip-container {
  max-width: 500px;
}

.fk-info-card {
  border-radius: 16px;
  background: rgba(var(--q-primary), 0.03);
  border: 1px dashed rgba(var(--q-primary), 0.3);
  max-width: 400px;
}

.fk-glow-primary {
  color: var(--q-primary);
  background: rgba(var(--q-primary), 0.1);
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(var(--q-primary), 0.1);
}

.fk-btn-back {
  border-radius: 12px;
}

.body--dark {
  .fk-info-card {
    background: rgba(255, 255, 255, 0.02);
  }
}
</style>
