<script setup lang="ts">
import { useSession, deleteMessage } from '@/models/session'
import { simulatePayment, cancelPayment } from '@/models/stripe'
import Notification from './Notification.vue'

/**const props = defineProps<{
  isActive: boolean
}>()
*/
const session = useSession()

</script>

<template>
  <!-- v-show="props.isActive" -->
  <div class="notifications">
    <transition-group name="list">
        <template v-for="(msg, i) in session.messages" :key="msg">
          <Notification :title="msg.type" :message="msg.msg" :type="msg.type" :msg="msg" :index="i" @delete="(index) => deleteMessage(i)">
            <template #body>
              <template v-if="msg.state == 'cardPaymentProcessing'">
                <div class="container mt-5">
                  <div class="field is-grouped">
                    <div class="control is-expanded">
                      <div class="button is-fullwidth is-success is-rounded" @click="simulatePayment">
                        Simulate Payment
                      </div>
                    </div>
                    <div class="control is-expanded">
                      <div class="button is-fullwidth is-danger is-rounded" @click="cancelPayment">
                        Cancel Payment
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </Notification>
        </template>
    </transition-group>
  </div>
  
</template>

<style scoped>
.notifications {
  z-index: 20;
  position: absolute;
  top: 15vh;
  left: 25%;
  width: 50vw;
  background-color: transparent;
  overflow-y: scroll hidden;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  /*position: absolute; */
}
</style>
