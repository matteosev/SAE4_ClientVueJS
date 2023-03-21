<script setup>
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';

    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';
</script>

<template>
   <swiper
   :modules="[Navigation, Pagination, Scrollbar, A11y]"
    :slides-per-view="1"
    :space-between="1"
    navigation
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
  <swiper-slide>  <!--YA PLUS QU'A FAIRE UN V FOR AVEC LES BEST SELLER -->
        <h1>Slide 1</h1>
        <p>Ceci est une slide</p>
    </swiper-slide>
    <swiper-slide>
        <h1>Slide 2</h1>
        <p>Ceci est une slide</p>
    </swiper-slide>
    <swiper-slide>
        <h1>Slide 3</h1>
        <p>Ceci est une slide</p>
    </swiper-slide>
    <swiper-slide>
        <h1>Slide 4</h1>
        <p>Ceci est une slide</p>
    </swiper-slide>
    
    <swiper-pagination />
    
  </swiper>
</template>

<script>
   
</script>



<style scoped>
.swiper {
  width: 800px;
  height: 300px;
}
</style>
