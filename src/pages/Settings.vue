<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-list class="q-mb-md" bordered padding>
        <q-item-label header>{{ $t('navigationMenu.settings') }}</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Dark mode</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="darkMode" color="blue" />
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
import { useSetLanguageMutation } from 'src/graphql/generated/operations'

export default defineComponent({
  setup(_, context) {
    const darkMode = ref(true)

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

    const { mutate, loading, error, onDone } = useSetLanguageMutation({
      variables: {
        language: 'ee-ee',
      },
    })

    watch(language, (newLanguage) => {
      context.root.$i18n.locale = newLanguage
      console.log('language changed to: ', newLanguage)

      void mutate({ language: newLanguage })
    })

    return {
      darkMode,
      language,
      languageOptions,
      selfHelp,
      emailUs,
    }
  },
})
</script>
