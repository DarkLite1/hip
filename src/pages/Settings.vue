<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-list class="q-mb-md" bordered padding>
        <q-item-label header>{{ $t('Settings') }}</q-item-label>
        <!-- <q-item-label header>Settings</q-item-label> -->

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Some cool option</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="coolOptionActive" color="blue" />
          </q-item-section>
        </q-item>

        <q-item tag="label">
          <q-item-section>
            <q-item-label>Language</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-select
              rounded
              outlined
              dense
              v-model="language"
              :options="languageOptions"
              emit-value
              map-options
              options-dense
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-list bordered padding>
        <q-item-label header>More</q-item-label>

        <q-item to="/settings/help" tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Help</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>

        <q-item @click="selfHelp" tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Visit the self help</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>

        <q-item @click="emailUs" tag="label" v-ripple>
          <q-item-section>
            <q-item-label>E-mail us</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { openURL } from 'quasar'

export default defineComponent({
  setup(props, context) {
    const coolOptionActive = ref(true)

    const languageOptions = [
      { value: 'en-us', label: 'English' },
      { value: 'de-de', label: 'Deutsch' },
      { value: 'nl-be', label: 'Nederlands' },
      { value: 'fr-be', label: 'Français' },
    ]
    const language = ref(context.root.$i18n.locale)

    const selfHelp = () => {
      openURL(
        'http://unite.grouphc.net/benelux/staffdepartments/it_bene/selfhelp/Pages/BNL_SelfHelp.aspx'
      )
    }
    const emailUs = () => {
      window.location.href =
        'mailto:BNL.ServicDesk@heidelbergcement.com?subject=HIP - HC IT Portal'
    }
    watch(language, (language) => {
      context.root.$i18n.locale = language
    })

    return {
      coolOptionActive,
      language,
      languageOptions,
      selfHelp,
      emailUs,
    }
  },
})
</script>
