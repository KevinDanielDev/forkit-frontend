<script setup lang="ts">
const props = defineProps<{
  kpiCards: Array<{
    value: number;
    label: string;
    icon: string;
    color: string;
  }>;
}>();
</script>

<template>
  <div class="row q-col-gutter-lg q-mb-xl">
    <div v-for="(card, index) in props.kpiCards" :key="index" class="col-12 col-sm-6 col-md-4">
      <q-card flat bordered class="fk-container fk-container--hover">
        <q-card-section class="row items-center no-wrap">
          <div :class="`fk-icon-box-base text-${card.color}`">
            <q-icon :name="card.icon" size="28px" class="relative-position" />
          </div>
          <div class="q-ml-md">
            <div class="text-h5 fk-text-weight-bold fk-text-contrast">{{ card.value }}</div>
            <div class="text-overline text-muted letter-spacing-1 q-mt-xs">{{ card.label }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
