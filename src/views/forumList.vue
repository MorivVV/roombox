<template>
  <div id="forumList" class="forum_list">
    <div v-if="forumList.length > 0" class="theme_head">
      <div class="topic_theme"><div class="theme">Тема</div></div>
      <div class="theme_info">
        <div class="count_post">сообщений {{ 0 > 0 ? "/прочитано" : "" }}</div>
        <div class="last_autor">последнее</div>
      </div>
      <div class="created">
        <div class="time">Создано</div>
        <div class="autor_theme">автор</div>
      </div>
    </div>
    <div v-else class="theme_head">ТЕма</div>
    <div class="topic_view" v-for="tr in forumList" :key="tr.ID">
      <div class="topic">
        <div class="topic_theme">
          <div
            class="theme"
            @click="getData"
            :class="{ private: tr.private === 1 }"
          >
            <router-link
              :class="{
                novisit: tr.readTopic === 0,
                readall: tr.readTopic === tr.cnt,
                visit: tr.readTopic > 0 && tr.readTopic < tr.cnt,
              }"
              :to="'/forum/' + tr.id"
              >{{ tr.theme }}</router-link>
            <span v-if="tr.child > 0">вложеные форумы: {{ tr.child }}</span>
          </div>
        </div>
        <div class="theme_info">
          <div class="count_post">
            {{ tr.cnt }}{{ 0 > 0 ? "/" + tr.readTopic : "" }}
            <a
              title="легкая текстовая версия"
              :href="'/topic/' + tr.id + '----print'"
            >
              <img
                style="margin-left: 5px; height: 20px"
                src="/image/system/txt.png"
            /></a>
          </div>
          <div class="last_autor">
            <a :href="'/post' + tr.id + '---' + tr.pun" :title="tr.pst">{{
              tr.pun
            }}</a>
          </div>
        </div>
        <div class="created">
          <div class="time">{{ tr.tcreate }}</div>
          <div class="autor_theme">
            <a :href="'/profile/' + tr.USER_NAME">{{ tr.USER_NAME }}</a>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  computed: mapGetters(["forumList"]),
  mounted() {
    this.getData();
  },
  methods: {
    ...mapActions(["forumData"]),
    ...mapMutations(["setForum"]),
    getData() {
      let forum = 0;
      console.log(typeof this.$route.params.id);
      if (typeof this.$route.params.id == "undefined") {
        forum = 0;
      } else {
        forum = this.$route.params.id;
      }
      this.setForum(forum);
      this.forumData();
    },
  },
};
</script>

<style scoped>
.forum_list {
  margin: 15px 0;
  border: 1px solid #80c0ff;
  background: cornflowerblue;
}

.theme_head {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  background: aliceblue;
  border: 1px solid #e2d6be;
  font-size: 1.4rem;
  margin-top: 2px;
  margin-bottom: 2px;
}

.topic_view {
  background: azure;
  border-radius: 5px;
  border: 1px solid cornflowerblue;
  padding: 3px;
  margin: 1px;
}

.topic {
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin: auto;
  width: 99.8%;
  border: 1px solid cornflowerblue;
}

.topic:hover {
  box-shadow: 5px 5px 20px cornflowerblue, -4px 0 20px cornflowerblue;
  position: relative;
}

.topic_view:nth-child(2n) {
  background: #fffff0;
}

.theme {
  display: flex;
  flex-wrap: wrap;
  flex-basis: 250px;
  flex-grow: 1;
}

.private {
  font-style: italic;
}

.theme a {
  word-break: break-word;
  font-family: "Comic sans", "Times New Roman";
  font-size: 1.4rem;
  text-decoration: none;
  width: 100%;
}

a.visit {
  color: blueviolet;
}

a.novisit {
  color: blue;
}

a.readall {
  color: gray;
}

.topic_theme {
  display: flex;
  flex-basis: 300px;
  flex-grow: 5;
  padding: 0 5px;
  margin: 0 5px;
}

.theme_info,
.created {
  justify-content: center;
  max-width: 160px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
}

.count_post {
  justify-content: center;
  display: flex;
  flex-grow: 1;
  font-size: 0.8rem;
}

.last_autor {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  flex-grow: 1;
}

.time {
  justify-content: center;
  flex-grow: 1;
  font-size: 0.7rem;
}

.autor_theme {
  justify-content: center;
  flex-grow: 1;
  font-size: 0.9rem;
}

.autor_theme,
.time,
.last_autor,
.count_post {
  padding-left: 5px;
  flex-basis: 60px;
}

.preview {
  display: none;
  width: 100%;
}
</style>