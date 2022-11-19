<template>
  <div>
    content page;
    {{ $t("welcome") }}
    <PartsLanguageSwitcher />
    <PartsMenu />
    <slot />
  </div>
</template>
