<template>
  <div class="row justify-left q-col-gutter-md">
    <div class="col-12 col-sm-3 col-md-2 col-lg-2">
      <q-btn
        outline
        color="primary"
        :label="t('button.back')"
        icon="arrow_back_ios"
        @click="$emit('navigate-back')"
      />
    </div>
    <div class="col-12 col-sm-8 col-md-6 col-lg-5">
      <table>
        <tr v-if="fromDate">
          <q-tooltip>{{
            t('application.sapTruckRoster.label.time')
          }}</q-tooltip>
          <th><q-icon name="schedule" size="xs" /></th>
          <td>{{ convertToDate(fromDate, locale) }}</td>
        </tr>
        <template v-if="drivers">
          <tr v-for="(driver, index) in drivers" :key="index">
            <q-tooltip>{{
              t('application.sapTruckRoster.label.driverId')
            }}</q-tooltip>
            <th><q-icon name="person" size="xs" /></th>
            <td>
              {{
                convertToDriverFullName({
                  id: driver.id,
                  firstName: driver.firstName,
                  lastName: driver.lastName,
                })
              }}
            </td>
          </tr>
        </template>
        <tr v-if="truckId">
          <q-tooltip>{{
            t('application.sapTruckRoster.label.truckId')
          }}</q-tooltip>
          <th><q-icon name="local_shipping" size="xs" /></th>
          <td>{{ truckId }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent, PropType } from 'vue'
import { convertToDate } from 'src/services/utils/utilsService'
import { Driver } from 'src/graphql/generated/operations'

export default defineComponent({
  props: {
    fromDate: {
      type: Date,
      required: false,
    },
    truckId: {
      type: String,
      required: false,
    },
    drivers: {
      type: Object as PropType<Driver[]>,
      required: false,
    },
  },
  setup() {
    const convertToDriverFullName = ({
      id,
      firstName,
      lastName,
    }: {
      id?: string
      firstName?: string
      lastName?: string
    }) => {
      const fullName = [firstName, lastName].join(' ').trim()
      if (id && fullName) return [id, fullName].join(' - ')
      if (id) return id
      if (fullName) return fullName
    }

    return {
      ...useI18n(),
      convertToDriverFullName,
      convertToDate,
    }
  },
})
</script>

<style lang="scss" scoped>
table {
  th {
    text-align: center;
    width: 30px;
  }
}
</style>
