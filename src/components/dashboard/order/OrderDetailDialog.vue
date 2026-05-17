<script setup lang="ts">
import { useDashboard } from 'src/composables/dashboard/useDashboard';
import { useOrderDetailDialog } from 'src/composables/dashboard/order/useOrderDetailDialog';

const { isOpenDetailDialog, order, displayIndex, images, priorityColor, statusColor, showGallery } =
  useOrderDetailDialog();

const { formatMoney } = useDashboard();
</script>

<template>
  <q-dialog v-model="isOpenDetailDialog" backdrop-filter="blur(8px) brightness(60%)">
    <q-card class="fk-detail-card fk-content-bg" style="width: 850px; max-width: 95vw">
      <div v-if="!order" class="text-center q-py-xl flex column flex-center">
        <q-icon name="error_outline" size="50px" color="negative" />
        <div class="text-subtitle2 text-negative q-mt-md text-weight-bold">Orden no encontrada</div>
        <q-btn flat color="primary" label="Cerrar" class="q-mt-md" v-close-popup />
      </div>

      <template v-else>
        <q-card-section class="row items-start q-pb-none q-pt-lg">
          <div class="col">
            <div class="row items-center q-gutter-x-sm">
              <span class="text-h6 text-weight-bolder fk-text-contrast">
                Orden #{{ displayIndex }}
              </span>
              <q-badge
                :style="{
                  color: `var(--q-${priorityColor?.color})`,
                  backgroundColor: priorityColor?.bg,
                }"
                :label="order.project?.priority"
                class="text-weight-bold q-px-sm"
              />
            </div>
            <div class="text-caption text-grey-6 q-mt-xs">
              Fecha de entrega:
              <span class="text-weight-bold">{{ order.finance?.deliveryDate || 'Sin fecha' }}</span>
            </div>
          </div>
          <q-btn flat round dense icon="close" v-close-popup class="fk-text-contrast opacity-7" />
        </q-card-section>

        <q-card-section class="q-pa-lg scroll" style="max-height: 80vh">
          <div class="row q-col-gutter-xl">
            <div class="col-12 col-md-7">
              <div class="q-gutter-y-lg">
                <div class="block">
                  <div class="row items-center q-gutter-x-xs q-mb-sm">
                    <q-icon name="assignment" color="primary" size="18px" />
                    <div class="text-overline text-grey-6 letter-spacing-1">Proyecto</div>
                  </div>
                  <div class="text-h5 text-weight-bold fk-text-contrast q-mb-sm">
                    {{ order.project?.title }}
                  </div>
                  <p class="text-body2 text-grey-7 q-mt-sm">
                    {{ order.project?.description || 'Sin descripción detallada registrada.' }}
                  </p>
                  <div class="row items-center q-mt-sm fk-status-pill q-pa-xs">
                    <q-icon name="lens" :color="statusColor" size="10px" class="q-mr-xs" />
                    <span class="text-caption text-weight-medium fk-text-contrast opacity-8">
                      Estado: {{ order.project?.status }}
                    </span>
                  </div>
                </div>

                <div v-if="images.length > 0" class="block">
                  <q-btn
                    flat
                    no-caps
                    class="fk-gallery-btn full-width q-pa-md"
                    @click="showGallery = !showGallery"
                  >
                    <div class="row items-center no-wrap full-width">
                      <q-icon name="collections" color="primary" size="28px" />
                      <div class="q-ml-md text-left col">
                        <div class="text-weight-bold fk-text-contrast">Galería de Archivos</div>
                        <div class="text-caption text-grey-6">
                          {{ images.length }} imágenes adjuntas
                        </div>
                      </div>
                      <q-icon :name="showGallery ? 'expand_less' : 'expand_more'" color="grey-6" />
                    </div>
                  </q-btn>

                  <q-slide-transition>
                    <div v-show="showGallery">
                      <div class="row q-col-gutter-sm q-pt-md">
                        <div v-for="(img, idx) in images" :key="idx" class="col-4">
                          <q-img
                            :src="img.url"
                            class="fk-gallery-img cursor-pointer shadow-1"
                            :ratio="1"
                          >
                            <template v-slot:error>
                              <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                                <q-icon name="broken_image" size="24px" />
                              </div>
                            </template>
                          </q-img>
                        </div>
                      </div>
                    </div>
                  </q-slide-transition>
                </div>

                <div class="fk-info-box q-pa-md">
                  <div class="text-overline text-grey-6 q-mb-sm">Datos del Cliente</div>
                  <div class="row items-center q-mb-md">
                    <q-avatar size="44px" color="primary" class="text-white text-weight-bold">
                      {{
                        order.customer?.firstName?.charAt(0).toUpperCase() ||
                        order.customer?.company?.charAt(0).toUpperCase()
                      }}
                    </q-avatar>
                    <div class="q-ml-md">
                      <div class="text-subtitle1 text-weight-bold fk-text-contrast">
                        {{
                          `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}` ||
                          order.customer?.company ||
                          'Cliente desconocido'
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md">
                    <div class="col-6">
                      <div class="text-caption text-grey-6">Teléfono</div>
                      <div class="text-weight-bold fk-text-contrast">
                        {{ order.customer?.phone || 'Sin número registrado' }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-6">Email</div>
                      <div class="text-weight-bold text-primary text-truncate">
                        {{ order.customer?.email || 'Sin email registrado' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-5">
              <div class="fk-info-box q-pa-lg full-height flex column justify-between">
                <div>
                  <div class="text-overline text-grey-6 q-mb-lg">Resumen Financiero</div>
                  <div class="row justify-between q-mb-md">
                    <span class="text-grey-7">Monto Total</span>
                    <span class="text-subtitle1 text-weight-bold fk-text-contrast">
                      {{ formatMoney(Number(order.finance?.totalAmount || 0)) }}
                    </span>
                  </div>
                  <div class="row justify-between q-mb-md">
                    <span class="text-grey-7">Abono Inicial</span>
                    <span class="text-subtitle1 text-weight-bold text-positive">
                      {{ formatMoney(Number(order.finance?.depositAmount || 0)) }}
                    </span>
                  </div>
                  <q-separator class="q-my-lg fk-separator" />
                </div>

                <div class="fk-pending-card q-pa-md text-center">
                  <div class="text-overline text-white opacity-8">Saldo Pendiente</div>
                  <div class="text-h4 text-weight-bolder text-white">
                    {{
                      formatMoney(
                        Number(order.finance?.totalAmount || 0) -
                          Number(order.finance?.depositAmount || 0),
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </template>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.fk-detail-card {
  border-radius: 20px !important;
  border: 1px solid rgba(128, 128, 128, 0.1);
  overflow: hidden;
}

.fk-info-box {
  background: rgba(128, 128, 128, 0.05);
  border: 1px solid rgba(128, 128, 128, 0.1);
  border-radius: 16px;
}

.fk-gallery-btn {
  background: rgba(var(--q-primary), 0.05);
  border: 1px dashed rgba(var(--q-primary), 0.3);
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--q-primary), 0.1);
    border-style: solid;
  }
}

.fk-status-pill {
  background: rgba(128, 128, 128, 0.08);
  border-radius: 8px;
  display: inline-flex;
}

.fk-gallery-img {
  border-radius: 12px;
  border: 2px solid rgba(128, 128, 128, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    transform: translateY(-4px);
    border-color: var(--q-primary);
    box-shadow: 0 4px 12px rgba(var(--q-primary), 0.2);
  }
}

.fk-pending-card {
  background: #e63946;
  border-radius: 14px;
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.3);
}

.fk-separator {
  background: rgba(128, 128, 128, 0.1);
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.text-left {
  text-align: left;
}

.body--light {
  .fk-info-box {
    background: #f8f9fa;
  }
  .fk-gallery-btn {
    background: #f0f4f8;
  }
}
</style>
