<script setup>
  // const switchLocalePath = useSwitchLocalePath(); // switchLocalePath doesnt work very well with lazy locales
  const { /* locale, */ locales, setLocale } = useI18n();
  const availableLocales = computed(() => (locales.value)/* .filter(i => i.code !== locale.value) */);
</script>

<template>
  <div>
    <!--
      switchLocalePath doesnt work very well with lazy locales
    <NuxtLink :to="switchLocalePath('en')">
      English
    </NuxtLink>
    <NuxtLink :to="switchLocalePath('fr')">
      Français
    </NuxtLink>
    <NuxtLink :to="switchLocalePath('sv')">
      Svenska
    </NuxtLink> -->
    <!--
      v-model on locale doesnt work very well with lazy locales
    <form>
      <select v-model="locale">
        <option value="en">
          en
        </option>
        <option value="fr">
          fr
        </option>
        <option value="sv">
          sv
        </option>
      </select>
      <p>{{ $t('welcome') }}</p>
    </form> -->
    <button
      v-for="availableLocale in availableLocales"
      :key="availableLocale.code"
      href="#"
      @click="setLocale(availableLocale.code)"
    >
      {{ availableLocale.code }}
      {{ availableLocale.name }}
    </button>
  </div>
</template>
