<template>
  <div>
    content page;
    {{ $t("welcome") }}
    <PartsLanguageSwitcher />
    <slot />
  </div>
</template>
