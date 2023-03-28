<template>
  <div>
    <!-- Button to trigger the modal -->
    <button class="button is-success" v-if="isCartPage() && IDRequired()" @click="showModal = true">Verify Age</button>
    <div class="modal" :class="{'is-active': showModal}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Enter Your Birthday</h1>
          <div class="field">
            <label class="label">Month</label>
            <div class="control">
              <div class="select">
                <select v-model="selectedMonth">
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Day</label>
            <div class="control">
              <input class="input" type="number" min="1" max="31" :class="{'is-danger': selectedDay < 1 || selectedDay > 31}" v-model.number="selectedDay">
            </div>
            <p class="help is-danger" v-if="selectedDay < 1 || selectedDay > 31">Please enter a valid day (1-31).</p>
          </div>
          <div class="field">
            <label class="label">Year</label>
            <div class="control">
              <input class="input" type="number" min="1900" max="2023" :class="{'is-danger': selectedYear < 1900 || selectedYear > 2023}" v-model.number="selectedYear">
            </div>
            <p class="help is-danger" v-if="selectedYear < 1900 || selectedYear > 2023">Please enter a valid year (1900-2023).</p>
          </div>
          <button class="button is-success" @click="saveBirthday" :disabled="selectedDay < 1 || selectedDay > 31 || selectedYear < 1900 || selectedYear > 2023">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getShowIDModal } from "@/models/cart";

export default defineComponent({
  setup() {
    const route = useRoute();
    const showModal = ref(false);

    const isCartPage = () => {
      return route.path === '/cart';
    };

    const IDRequired = () => {
      if(getShowIDModal()){
        return true;
      }
    }

    const selectedMonth = ref(1);
    const selectedDay = ref(1);
    const selectedYear = ref(1900);

    const saveBirthday = () => {
      const birthday = `${selectedMonth.value}/${selectedDay.value}/${selectedYear.value}`;
      console.log(`Saved birthday: ${birthday}`);
      showModal.value = false;
    };

    return {
      isCartPage,
      showModal,
      IDRequired,
      selectedDay,
      selectedMonth,
      selectedYear,
      saveBirthday,
    };
  },
});
</script>
