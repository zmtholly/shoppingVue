<template>
  <div class="floor">
    <div class="floor-title"> {{floorTitle}} </div>
    <div class="floor-normal">
      <div class="floor-one"><img :src="floorData0.image" width="100%" /></div>
      <div>
          <div class="floor-two"><img :src="floorData1.image" width="100%" /></div>
          <div><img :src="floorData2.image" width="100%" /></div>
      </div>
    </div>
    <div class="floor-rule">
      <div v-for="(item, index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    }
  },
  props: ['floorData', 'floorTitle'],
  created () {

  },
  watch: {
    floorData () {
      this.floorData0 = this.floorData[0]
      this.floorData1 = this.floorData[1]
      this.floorData2 = this.floorData[2]
    }
  }
}
</script>

<style scoped lang="stylus">
.floor
  .floor-title
    text-align center
    font-size 14px
    height 1.8rem
    line-height 1.8rem
  .floor-normal
    display flex
    flex-direction row
    background-color #ffffff
    border-bottom 1px solid #dddddd
    div
      width 10rem
      box-sizing border-box
      .floor-two
        border-bottom 1px solid #dddddd
    .floor-one
      border-right 1px solid #dddddd
  .floor-rule
    display flex
    flex-direction row
    flex-wrap wrap
    background-color #ffffff
    div
      box-sizing border-box
      width 50%
      border-bottom 1px solid #dddddd
      &:nth-child(odd)
        border-right 1px solid #dddddd
</style>
