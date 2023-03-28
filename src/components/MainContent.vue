<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import * as dto from '../dto';

let data: Ref<dto.jobDto[]> = ref([])

// fetch data
axios.get('http://localhost:3003/jobs').then((response) => {
  data.value = response.data
  console.log(data.value[0].id)
})
</script>

<template lang="pug">
.main-content-component
  ul.job-list(v-if="data[0]")
    li.job-item(v-for="item in data")
      router-link.job-link(:to="'/detail/' + item.id")
        img.job-image(:src="item.img", :alt="item.name")
        .job-info
          .job-name.has-icon
            i.fa-solid.fa-briefcase
            span.name {{ item.name }}
            span.count &nbsp;({{ item.review_counter }})
          .job-location.has-icon
            i.fa-solid.fa-location-dot
            span {{ item.location }}
          .job-field.has-icon
            i.fa-regular.fa-map
            span {{ item.category }}

</template>

<style lang="sass">
@import "/src/sass/main-content"
</style>
