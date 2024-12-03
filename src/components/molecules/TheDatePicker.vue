<template>
  <VueDatePicker
    range
    multi-calendars
    auto-apply
    ref="dp"
    locale="pt-BR"
    class="date-picker"
    :format="format"
    :day-names="['S', 'T', 'Q', 'Q', 'S', 'S', 'D']"
    :show-time="false"
    :enable-time-picker="false"
    v-model="date"
  >
    <template #left-sidebar="props">
      <div class="wrapper-button">
        <button
          v-for="(label, index) in dateRanges"
          :key="index"
          :class="{'active': label.active}"
          class="date-button"
          @click="callDateRangeMethod($event, label)"
        >
          {{ label.text }}
        </button>
      </div>
    </template>
  </VueDatePicker>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  data() {
    return {
      date: [new Date(), new Date()],
      dateRanges: [
        { text: "Últimos 7 dias", value: 7, active: true },
        { text: "Últimos 14 dias", value: 14, active: false },
        { text: "Últimos mês", method: "handleClickMonthInterval", args: [1], active: false },
        { text: "Últimos 3 meses", method: "handleClickMonthInterval", args: [3], active: false },
        { text: "Últimos 6 meses", method: "handleClickMonthInterval", args: [6], active: false },
        { text: "Último 1 ano", method: "handleClickYear", active: false }
      ]
    };
  },

  methods: {
    format(date) {
      const months = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho", 
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
      ];

      const formatDate = (d) => {
        if (!d) return '';
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        return `${day} de ${month} de ${year}`;
      };

      return date.length === 1 
        ? formatDate(new Date(date[0])) 
        : `${formatDate(new Date(date[0]))} - ${formatDate(new Date(date[1]))}`;
    },

    callDateRangeMethod({ target }, label) {
      const dateButtons = document.querySelectorAll('.date-button')
      dateButtons.forEach(dateButton => dateButton.classList.remove('active'))
      target.classList.add('active')

      if (label.method) {
        this[label.method](...label.args || []);
      } else {
        this.handleClick(label.value);
      }
    },

    handleClick(value) {
      const dateCurrent = new Date();
      const startDate = new Date(dateCurrent);
      startDate.setDate(startDate.getDate() - value);
      this.date = [startDate.toString(), dateCurrent.toString()];
    },

    handleClickMonth() {
      const dateCurrent = new Date();
      this.date = [new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), 1).toString(), dateCurrent.toString()];
    },

    handleClickMonthInterval(months) {
      const dateCurrent = new Date();
      this.date = [new Date(dateCurrent.getFullYear(), dateCurrent.getMonth() - months, dateCurrent.getDate()).toString(), dateCurrent.toString()];
    },

    handleClickYear() {
      const dateCurrent = new Date();
      this.date = [new Date(dateCurrent.getFullYear() - 1, dateCurrent.getMonth(), dateCurrent.getDate()).toString(), dateCurrent.toString()];
    },
  },

  mounted() {
    this.$nextTick(() => {
      const buttonClearDate = document.getElementsByClassName('dp--clear-btn')
      buttonClearDate[0].remove()
      
      this.handleClick(7)
    })
  }
}
</script>

<style>
.dp__input {
  border: none;
  padding: 8px 16px 8px 38px;
  font-size: 14px;
  transition: all .3s;
}

.dp__input:hover {
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}

.wrapper-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.date-button {
  background: #fff;
  color: #000;
  padding: 12px;
  transition: all 0.3s;
  width: 150px;
  text-align: start;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.date-button + .date-button {
  margin-top: 6px;
}

.date-button.active, .date-button:hover {
  background: #cd68ec;
  color: #fff;
}

/* Adicione o restante do CSS conforme necessário */

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #09090b;
  --dp-hover-color: #cd68ec;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #cd68ec;
  --dp-primary-color: #b727e3;
  --dp-primary-disabled-color: #cd68ec;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: $gray;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #464e5f;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #cd68ec);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}

:root {
  /*General*/
  --dp-font-family: Arial, Helvetica, sans-serif;
  --dp-border-radius: 6px; /*Configurable border-radius*/
  --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
  --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/
}
</style>
