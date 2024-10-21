<template>
    <div>
        <div id="header">
            <div>
                <h1> Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div id="day-bar">
            <div>MON</div>
            <div>TUE</div>
            <div>WEB</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
        </div>
        <div id="calendar">
            <div v-for="(week, index) in weeks()" :key="index" class="calendar-week">
                <calendar-day v-for="(day, index) in week" :key="index" :day="day">
                </calendar-day>
            </div>
        </div>
        <nuevo-form></nuevo-form>

    </div>
</template>

<script>
import CalendarDay from './CalendarDay.vue';
import CurrentMonth from './CurrentMonth.vue';
import nuevoForm from './nuevoForm.vue';

export default {
    name: 'App',
    components: {
        CalendarDay,
        CurrentMonth,
        nuevoForm
    },
    methods: {
        month () {
            return this.$store.state.currentMonth
        },
        year () {
            return this.$store.state.currentYear
        },
        days () {
            let days = [];
            // GENERAT ALL DAYS CURRENT MONTH
            let currentDay = this.$moment(`${this.year()}-${this.month()}-1`, 'YYYY-M-D')

            do {
                days.push(currentDay);
                currentDay = this.$moment(currentDay).add(1, 'days')
            } while ((currentDay.month() + 1) === this.month());
            // add previous days to start
            currentDay = this.$moment(days[0])
            const sunday = 0;
            const monday = 1;
            if (currentDay.day() !== monday) {
                do {
                    currentDay = this.$moment(currentDay).subtract(1, 'days');
                    days.unshift(currentDay);
                } while (currentDay.day() !== monday);
            }

            currentDay = this.$moment(days[days.length - 1]);
            if (currentDay.day() !== sunday) {
                do {
                    currentDay = this.$moment(currentDay).add(1, 'days');
                    days.push(currentDay)
                } while (currentDay.day() !== sunday);
            }

            return days;
        },
        weeks () {
            let weeks = [];
            let week = [];
            for (let day of this.days()) {
                week.push(day);
                if (week.length === 7) {
                    weeks.push(week);
                    week = [];
                }
            }
            return weeks; // Asegúrate de devolver el array `weeks`
        }
    },
}
</script>