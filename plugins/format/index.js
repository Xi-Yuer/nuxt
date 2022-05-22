import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date',(str, format = 'YYYY-MM-DD') => {
    return dayjs(str).format(format)
})