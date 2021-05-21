<template>
  <div class="div">
    <q-drawer
      class="gt-xs"
      @mouseover="setMiniState(false)"
      @mouseout="setMiniState(true)"
      :mini="miniState"
      :width="200"
      :breakpoint="600"
      show-if-above
      bordered
      content-class="no-scroll"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="link in links"
            :key="link.name"
            :to="link.to"
            clickable
            v-ripple
            exact
            active-class="my-active-link"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>{{ link.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import { IMainNavigationLinks } from 'src/typings/navigation'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SidebarNavigationMenu',
  props: {
    links: {
      type: Object as PropType<IMainNavigationLinks[]>,
      required: true,
    },
  },
  setup() {
    const quasar = useQuasar()
    const miniState = ref(true)
    const setMiniState = (state: boolean | undefined) => {
      if (quasar.screen.width > 1023) {
        miniState.value = false
      } else if (state !== void 0) {
        miniState.value = state === true
      } else {
        miniState.value = true
      }
    }

    watch(
      () => quasar.screen.width,
      () => setMiniState(undefined)
    )

    return {
      miniState,
      setMiniState,
    }
  },
})
</script>

<style lang="scss" scoped>
.my-active-link {
  color: white;
  border-radius: 0 32px 32px 0;
  background: $blue-grey-5;
}
</style>
