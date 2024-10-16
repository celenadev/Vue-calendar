<template>
    <!-- <div>{{ msg }}</div> -->
    <div>
        <div v-for="(week, index) in weeks" :key="index">
            WEEK
            <div v-for="(day, index) in week" :key="index">
                {{ day }}
            </div>

        </div>

    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            // msg: 'Hello World'
            month: 3,
            year: 2017
        };
    },
    // created () {
    //     console.log(this.$moment);

    // },
    computed: {
        days () {

            let days = [];
            // GENERAT ALL DAYS CURRENT MONTH
            let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')

            do {
                days.push(currentDay);
                currentDay = this.$moment(currentDay).add(1, 'days')
            } while ((currentDay.month() + 1) === this.month);
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
            for (let day of this.days) {
                week.push(day);
                if (week.length === 7) {
                    weeks.push(week);
                    week = [];
                }
            }
            return weeks; // Asegúrate de devolver el array `weeks`
        }
    }
}
</script>