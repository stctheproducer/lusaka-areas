<template>
  <div :class="$style.defaultLayout">
    <nav-bar></nav-bar>
    <div :class="$style.contentContainer">
      <!-- <main :class="$style.mainContent"> -->
      <main>
        <router-view v-slot="{ Component }">
          <transition
            enter-from-class="opacity-0"
            enter-active-class="ease-out duration-500"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="ease-out duration-500"
            leave-to-class="opacity-0"
            mode="out-in"
            appear
          >
            <component :is="Component"></component>
          </transition>
        </router-view>
        <foo-ter></foo-ter>
      </main>
    </div>
    <notifications />
  </div>
</template>

<style module>
.defaultLayout {
  @apply mx-auto min-h-screen w-full antialiased;
}

.contentContainer {
  @apply mx-auto w-full;
}

/* .mainContent {
} */
</style>
