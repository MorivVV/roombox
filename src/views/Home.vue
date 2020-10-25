<template>
  <div class="container">
    <div class="home">
      <div v-for="l in locationList" :key="l.i" class="locs" @click="toLoc(l.i)">
        {{l.c}}
      </div>
    </div>
      
      <div class="room">
        <div class="box" v-for="b in boxList" :key="b.id">
          <h4>{{b.num_box}}</h4>
          <p>{{b.dep}}</p>
          <h3>{{b.cnt}}</h3>
        </div>
      </div>
  </div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  components: {

  },
  computed: {
    ...mapGetters(['locationList','boxList'])
  },
  methods:{
    ...mapActions(['fetchData']),
    ...mapMutations(['setLoc']),
    toLoc(id){
      this.setLoc(id)
      this.fetchData()
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>

<style scoped>
  .room{
    display: flex;
    flex-flow: wrap;
  }
  .home{
    display: flex;
    align-content: flex-start;
  }
  .locs {
    display: flex;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid gray;
    background-color: honeydew;
  }
  .locs:hover {
    background-color: rgb(70, 69, 69);
    border: 2px solid black;
    color: white;
    font-weight: bold;
  }
  .box{
    border: 1px solid black;
    margin: 5px;
    padding: 5px;
  }

</style>