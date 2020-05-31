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
      content-class="bg-grey-3"
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
            <q-item-section>{{ link.label.value }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'SidebarNavigationMenu',
  props: {
    links: {
      type: Array,
      required: false,
    },
  },
  setup(props, context) {
    const miniState = ref(true)

    const setMiniState = (state: boolean | undefined) => {
      if (context.root.$q.screen.width > 1023) {
        miniState.value = false
      } else if (state !== void 0) {
        miniState.value = state === true
      } else {
        miniState.value = true
      }
    }

    watch(
      () => context.root.$q.screen.width,
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
