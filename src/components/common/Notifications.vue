<template>
  <div>
    <NotificationGroup group="toast">
      <div
        aria-live="assertive"
        class="
          flex
          py-6
          px-4
          right-0
          bottom-0
          left-0
          fixed
          items-end
          pointer-events-none
          sm:p-6 sm:items-start
        "
      >
        <div class="flex flex-col space-y-4 w-full items-center sm:items-end">
          <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="
                rounded-lg
                max-w-sm
                bg-gray-900
                shadow-lg
                ring-white
                w-full
                ring-1 ring-opacity-5
                pointer-events-auto
                overflow-hidden
              "
            >
              <div class="p-4">
                <div class="flex items-center">
                  <div class="flex flex-1 w-0 justify-between">
                    <p class="font-medium flex-1 text-sm text-white w-0">
                      {{ notification.text }}
                    </p>
                  </div>
                  <div class="flex flex-shrink-0 ml-4">
                    <button
                      class="
                        rounded-md
                        text-gray-500
                        inline-flex
                        hover:text-white
                        focus:outline-none focus:ring-gray-500 focus:ring-2
                        hover:focus:ring-white
                      "
                      @click="close(notification.id)"
                    >
                      <span class="sr-only">Close</span>
                      <heroicons-outline-x class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>

    <NotificationGroup group="standard">
      <div
        aria-live="assertive"
        class="
          flex
          py-6
          px-4
          inset-0
          fixed
          items-end
          pointer-events-none
          sm:p-6 sm:items-start
        "
      >
        <div class="flex flex-col space-y-4 w-full items-center sm:items-end">
          <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="
                bg-white
                rounded-lg
                max-w-sm
                shadow-lg
                ring-black
                w-full
                ring-1 ring-opacity-5
                pointer-events-auto
                overflow-hidden
              "
            >
              <div class="flex">
                <div
                  class="flex w-12 items-center justify-center"
                  :class="notificationBackgroundClass(notification.type)"
                >
                  <heroicons-solid-x-circle
                    v-if="notification.type === 'error'"
                    class="h-6 fill-current text-white w-6"
                    aria-hidden="true"
                  />
                  <heroicons-solid-check-circle
                    v-else-if="notification.type === 'success'"
                    class="h-6 fill-current text-white w-6"
                    aria-hidden="true"
                  />
                  <heroicons-solid-exclamation-circle
                    v-else-if="notification.type === 'warning'"
                    class="h-6 fill-current text-white w-6"
                    aria-hidden="true"
                  />
                  <heroicons-solid-information-circle
                    v-else
                    class="h-6 fill-current text-white w-6"
                    aria-hidden="true"
                  />
                </div>

                <div class="flex-grow p-4">
                  <div class="flex-1 ml-3 pt-0.5">
                    <p class="font-semibold text-sm text-gray-900">
                      {{ notification.title }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ notification.text }}
                    </p>
                  </div>
                </div>

                <div class="p-4">
                  <button
                    class="
                      bg-white
                      rounded-md
                      text-gray-400
                      inline-flex
                      hover:text-gray-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-indigo-500
                    "
                    @click="close(notification.id)"
                  >
                    <span class="sr-only">Close</span>
                    <heroicons-solid-x class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>

    <NotificationGroup group="simple">
      <div
        aria-live="assertive"
        class="
          flex
          py-6
          px-4
          inset-0
          fixed
          items-end
          pointer-events-none
          sm:p-6 sm:items-start
        "
      >
        <div class="flex flex-col space-y-4 w-full items-center sm:items-end">
          <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="
                bg-white
                rounded-lg
                max-w-sm
                shadow-lg
                ring-black
                w-full
                ring-1 ring-opacity-5
                pointer-events-auto
                overflow-hidden
              "
            >
              <div class="p-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <heroicons-outline-check-circle
                      v-if="notification.type === 'success'"
                      class="h-6 text-green-400 w-6"
                      aria-hidden="true"
                    />
                    <heroicons-outline-x-circle
                      v-else-if="notification.type === 'error'"
                      class="h-6 text-red-400 w-6"
                      aria-hidden="true"
                    />
                    <heroicons-outline-exclamation-circle
                      v-else-if="notification.type === 'warning'"
                      class="h-6 text-orange-400 w-6"
                      aria-hidden="true"
                    />
                    <heroicons-outline-information-circle
                      v-else
                      class="h-6 text-indigo-400 w-6"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="flex-1 ml-3 pt-0.5 w-0">
                    <p class="font-medium text-sm text-gray-900">
                      {{ notification.title }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ notification.text }}
                    </p>
                  </div>
                  <div class="flex flex-shrink-0 ml-4">
                    <button
                      class="
                        bg-white
                        rounded-md
                        text-gray-400
                        inline-flex
                        hover:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-indigo-500
                      "
                      @click="close"
                    >
                      <span class="sr-only">Close</span>
                      <heroicons-solid-x class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>

    <NotificationGroup group="chat">
      <div
        aria-live="assertive"
        class="
          flex
          py-6
          px-4
          inset-0
          fixed
          items-end
          pointer-events-none
          sm:p-6 sm:items-start
        "
      >
        <div class="flex flex-col space-y-4 w-full items-center sm:items-end">
          <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="
                bg-white
                rounded-lg
                flex
                max-w-md
                shadow-lg
                ring-black
                w-full
                ring-1 ring-opacity-5
                pointer-events-auto
              "
            >
              <div class="flex-1 p-4 w-0">
                <div class="flex items-start">
                  <div v-if="notification.avatar" class="flex-shrink-0 pt-0.5">
                    <img
                      class="rounded-full h-10 w-10"
                      :src="notification.avatar"
                      :alt="notification.title"
                    />
                  </div>
                  <div class="flex-1 ml-3 w-0">
                    <p class="font-medium text-sm text-gray-900">
                      {{ notification.title }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ notification.text }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="border-l flex border-gray-200">
                <button
                  class="
                    border border-transparent
                    rounded-none rounded-r-lg
                    flex
                    font-medium
                    text-sm
                    w-full
                    p-4
                    text-indigo-600
                    items-center
                    justify-center
                    hover:text-indigo-500
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                  "
                  @click="accept(notification.id, close)"
                >
                  Reply
                </button>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>

    <NotificationGroup group="splitButtons">
      <div
        aria-live="assertive"
        class="
          flex
          py-6
          px-4
          inset-0
          fixed
          items-end
          pointer-events-none
          sm:p-6 sm:items-start
        "
      >
        <div class="flex flex-col space-y-4 w-full items-center sm:items-end">
          <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="
                bg-white
                rounded-lg
                flex
                max-w-md
                shadow-lg
                ring-black
                w-full
                ring-1 ring-opacity-5
                pointer-events-auto
              "
            >
              <div class="flex flex-1 p-4 w-0 items-center">
                <div class="w-full">
                  <p class="font-medium text-sm text-gray-900">
                    {{ notification.title }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ notification.text }}
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="divide-y flex flex-col divide-gray-200">
                  <div class="flex flex-1 h-0">
                    <button
                      class="
                        border border-transparent
                        rounded-none rounded-tr-lg
                        flex
                        font-medium
                        text-sm
                        w-full
                        py-3
                        px-4
                        text-indigo-600
                        items-center
                        justify-center
                        hover:text-indigo-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                        focus:z-10
                      "
                      @click="accept(notification.id, close)"
                    >
                      Accept
                    </button>
                  </div>
                  <div class="flex flex-1 h-0">
                    <button
                      class="
                        border border-transparent
                        rounded-none rounded-br-lg
                        flex
                        font-medium
                        text-sm
                        w-full
                        py-3
                        px-4
                        text-gray-700
                        items-center
                        justify-center
                        hover:text-gray-500
                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                      "
                      @click="decline(notification.id, close)"
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>

    <NotificationGroup group="bottomButtons">
      <div
        aria-live="assertive"
        class="
          flex
          py-6
          px-4
          inset-0
          fixed
          items-end
          pointer-events-none
          sm:p-6 sm:items-start
        "
      >
        <div class="flex flex-col space-y-4 w-full items-center sm:items-end">
          <Notification
            v-slot="{ notifications, close }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="
                bg-white
                rounded-lg
                flex
                max-w-md
                shadow-lg
                ring-black
                w-full
                ring-1 ring-opacity-5
                pointer-events-auto
              "
            >
              <div class="p-4">
                <div class="flex items-start">
                  <div v-if="notification.avatar" class="flex-shrink-0 pt-0.5">
                    <img
                      class="rounded-full h-10 w-10"
                      :src="notification.avatar"
                      :alt="notification.title"
                    />
                  </div>
                  <div class="flex-1 ml-3 w-0">
                    <p class="font-medium text-sm text-gray-900">
                      {{ notification.title }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ notification.text }}
                    </p>
                    <div class="flex mt-4">
                      <button
                        type="button"
                        class="
                          border border-transparent
                          rounded-md
                          font-medium
                          bg-indigo-600
                          shadow-sm
                          text-sm text-white
                          py-2
                          px-3
                          leading-4
                          inline-flex
                          items-center
                          hover:bg-indigo-700
                          focus:outline-none
                          focus:ring-2
                          focus:ring-offset-2
                          focus:ring-indigo-500
                        "
                        @click="accept(notification.id, close)"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        class="
                          bg-white
                          border
                          rounded-md
                          font-medium
                          border-gray-300
                          shadow-sm
                          text-sm
                          ml-3
                          py-2
                          px-3
                          text-gray-700
                          leading-4
                          inline-flex
                          items-center
                          hover:bg-gray-50
                          focus:outline-none
                          focus:ring-2
                          focus:ring-offset-2
                          focus:ring-indigo-500
                        "
                        @click="decline(notification.id, close)"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                  <div class="flex flex-shrink-0 ml-4">
                    <button
                      class="
                        bg-white
                        rounded-md
                        text-gray-400
                        inline-flex
                        hover:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-indigo-500
                      "
                      @click="close(notification.id)"
                    >
                      <span class="sr-only">Close</span>
                      <heroicons-solid-x class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>
  </div>
</template>

<script setup lang="ts">
const notificationBackgroundClass = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-orange-500'
    case 'success':
      return 'bg-green-500'
    default:
      return 'bg-indigo-500'
  }
}

interface Emit {
  (e: 'accepted'): void
  (e: 'declined'): void
}

const emits = defineEmits<Emit>()

const accept = (
  notificationId: string,
  closeNotification: (notificationId: string) => void
) => {
  closeNotification(notificationId)
  emits('accepted')
}

const decline = (
  notificationId: string,
  closeNotification: (notificationId: string) => void
) => {
  closeNotification(notificationId)
  emits('declined')
}
</script>
