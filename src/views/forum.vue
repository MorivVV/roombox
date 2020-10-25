<template>
  <div v-if="postList.length > 0" id="messageList" class="messageBlock">
    <div class="trep_message" v-for="tr in postList" :key="tr.ID">
      <div class="message_head">
        <div class="message_time">{{ tr.TIME_ADD }}</div>
        <div class="message_number">
          <a
            :href="
              '/post/' + tr.id_theme + '--' + tr.UID + '-' + tr.ID
            "
            >{{ tr.ID }}</a
          >
        </div>
      </div>
      <div class="user info">
        <div class="user name">
          <a style="text-decoration: none" :href="'/profile/' + tr.USER_NAME"
            ><font :color="tr.color" face="Arial">{{ tr.USER_NAME }}</font></a
          >
        </div>
        <div class="user rank">Сообщений:</div>
        <div class="user rank">
          <a :href="'/usermessage/--' + tr.UID">{{ tr.allPost }} всего</a>
        </div>
        <div class="user rank">
          <a :href="'/usermessage/' + tr.TID + '--' + tr.UID"
            >{{ tr.currentPost }} в ветке</a
          >
        </div>
        <div class="user avatar">
          <a :href="'/profile/' + tr.USER_NAME"
            ><img class="topic_caver" :src="'/img.php?tumbs=' + tr.image"
          /></a>
        </div>
        <div class="user rank">
          <font :color="tr.color" face="Arial">{{ tr.RANK }}</font>
        </div>
        <div class="user rank">
          <input
            type="button"
            onclick="quotedPost(this)"
            :id="tr.ID"
            value="Ответить"
          />
        </div>
      </div>
      <div class="trep_text" v-html="bbCode(tr.POST, tr.ID)">
        <div
          v-if="tr.KOD_QUOTED_POST > 0"
          onclick="viewPost(this)"
          :id="tr.KOD_QUOTED_POST"
          class="message-quoted"
        >
          <a>{{ tr.KOD_QUOTED_POST }} от {{ tr.quser }}</a>
        </div>
        <div v-if="tr.quoted > 0" class="answer">{{ tr.quoted }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["postList"]),
  },
  mounted() {
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
  methods: {
    ...mapActions(["forumData"]),
    ...mapMutations(["setForum"]),
    bbCode(text, mid) {
      text = text.replace(/[\r\n]+/gm, "<BR />");
      text = text.replace(
        /\*([a-zA-Z]+)(\d+)([a-zA-Z]+)\*/gm,
        "<img style='max-height: 64px;' src='/image/$1/$2.$3'>"
      );
      text = text.replace(
        /\[IMG\]([\d\w]{32}\.[\w]{3,4})\[\/IMG\]/gm,
        '<div onclick="viewPicture(this)" class="picture"><img src="/image/tumbs/$1"></div>'
      );
      text = text.replace(
        /\[B\]([\s\S]+?)\[\/B\]/gm,
        '<span style="font-weight: bold;">$1</span>'
      );
      text = text.replace(
        /\[I\]([\s\S]+?)\[\/I\]/gm,
        '<span style="font-style: italic;">$1</span>'
      );
      text = text.replace(
        /\[S\]([\s\S]+?)\[\/S\]/gm,
        '<span style="text-decoration: line-through;">$1</span>'
      );
      text = text.replace(
        /\[U\]([\s\S]+?)\[\/U\]/gm,
        '<span style="text-decoration: underline;">$1</span>'
      );
      text = text.replace(
        /\[SUP\]([\s\S]+?)\[\/SUP\]/gm,
        '<span style="vertical-align: super; font-size: smaller;">$1</span>'
      );
      text = text.replace(
        /\[SUB\]([\s\S]+?)\[\/SUB\]/gm,
        '<span style="vertical-align: sub; font-size: smaller;: smaller;">$1</span>'
      );
      text = text.replace(
        /\[URL=(.+?)\]([\s\S]+?)\[\/URL\]/gm,
        '<a target="_blank" title="$1" href="$1">$2</a>'
      );
      text = text.replace(
        /\[color=([a-z]+?)\]([\s\S]+?)\[\/color\]/gm,
        '<span style="color:$1;">$2</span>'
      );
      text = text.replace(
        /\[SIZE=(\d+?)\]([\s\S]+?)\[\/SIZE\]/gm,
        '<span style="font-size:$1;">$2</span>'
      );
      text = text.replace(
        /\[SPOILER=(.+?)\]([\s\S]+?)\[\/SPOILER\]/gm,
        (match, head, body, ofset) =>
          `<span onclick="openSpoiler(` +
          mid +
          `${ofset})" class="spoiler_head spoiler_head_close" tabindex="1">${head}</span><span id="spoiler` +
          mid +
          `${ofset}" class="spoiler_content"><div>${body}</div></span>`
      );
      return text;
    },
  },
};
</script>

<style scoped>
.trep_message {
  margin: 5px;
  background: azure;
  display: flex;
  border-radius: 8px;
  flex-flow: row wrap;
  justify-content: center;
  border: 1px solid gainsboro;
}
.user {
  flex-basis: 100px;
  font-family: Arial, sans-serif; /* Ð“Ð°Ñ€Ð½Ð¸Ñ‚ÑƒÑ€Ð° ÑˆÑ€Ð¸Ñ„Ñ‚Ð° */
}
.name {
  font-size: 1rem;
  justify-content: center;
  display: flex;
  flex-basis: 25%;
}
.info {
  margin: 0px 5px 5px 10px;
  padding: 2px 0px 2px 2px;
  align-self: flex-start;
}
.avatar {
  padding: 2px 0px 2px 2px;
}
.rank {
  font-size: 0.7rem;
  justify-content: center;
  display: flex;
  flex-basis: 100%;
}
.topic_caver {
  height: 90px;
  width: 90px;
  object-fit: cover;
  border-radius: 25%;
}
.trep_text {
  position: relative;
  background: white;
  background-position: 100% 0;
  background-repeat: no-repeat;
  margin: 0px 2px 2px 2px;
  padding: 15px 15px 5px 5px;
  border-radius: 8px;
  flex-grow: 1;
  flex-basis: 50%;
  width: 250px;
  word-wrap: break-word;
}
.trep_text::first-line {
  width: 80%;
}
.message_head {
  font-family: Tahoma, sans-serif; /* Ð“Ð°Ñ€Ð½Ð¸Ñ‚ÑƒÑ€Ð° ÑˆÑ€Ð¸Ñ„Ñ‚Ð° */
  font-size: 0.8rem;
  flex-basis: 100%;
  color: ivory;
  text-shadow: none;
  max-width: 1280;
  min-height: 20px;
  margin: 5px 5px 2px 5px;
  padding: 0 5px;
  border-radius: 6px;
  display: flex;
  background: linear-gradient(to bottom, azure, #6495ed);
  /* background: ivory; */
  align-items: center;
  justify-content: center;
  border: 1px solid #1e90ff;
}
.message_head a {
  color: ivory;
}
.message_time {
  display: flex;
  justify-content: flex-start;
  flex-basis: 100%;
  flex-grow: 1;
}
.message_number {
  display: flex;
  justify-content: flex-end;
  flex-basis: 100%;
  font-size: 0.7rem;
}
.message_number:before {
  content: "Сообщение № ";
}
.message-quoted:before {
  content: " fgfg";
}
.message-quoted {
  color: gray;
  margin-left: 10px;
}
.answer {
  position: absolute;
  right: 0;
  bottom: 0;
}
.answer:before {
  content: "grgd";
}
</style>