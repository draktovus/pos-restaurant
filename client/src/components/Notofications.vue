<script setup lang="ts">
import { ref } from 'vue';
import { useSession, deleteMessage } from '@/models/session';

const session = useSession();

const isActive = ref(false);
</script>

<template>
    <div class="notification-list">
        <div v-for="msg, i in session.messages" :class="'notification is-dark is-${msg.type}'">
            <button class="delete"></button>
             {{ msg.msg }}
        </div>
    </div>
</template>

<style scoped>
.notification-list {
        position: absolute;
        margin-top: 5px;
        width: 300px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        z-index: 100;
        min-height: 300px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
    }
    .notification-list .notification {
        margin: 5px;
    }
</style>