<template>
  <div class="newContents" @click="cancel">
    <div class="newContent-container" @click.stop>
      <button @click="sendComment()" :class="['grey',{'yellow':textValue}]">发送</button>
      <textarea name="" id="" cols="30" rows="10" autofocus="autofocus" v-model="textValue"></textarea>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ajax,eventHub } from "../../common/ajax";
import { TOKEN } from "../../common/index";
import { getCookie } from "../../common/cookie";
export default {
  data() {
    return {
      textValue: "",
      params: this.$route.params
    };
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    sendComment(message) {
      const _self=this;
      if (!getCookie(TOKEN)) {
        this.$route.push("/login");
        Toast({
          message: "发布话题要先登录哦!",
          position: "middle",
          duration: 2000
        });
        return;
      }
      const headersParams = {
        authorId: this.params.authoerId,
        title: this.params.title
      };
      const params = {
         userId:this.params.userId,
          productCode: "sealfinance",
          projectName: "sealfinance",
          id:this.params.commitId,
          objectId: this.params.id, //当前详情id
          objectType: "topic",
          commentDetail: escape(this.textValue), //判断其不为空
          userName: this.params.nickName,
          imageUrls: []
      };
      ajax(
        "post",
        "/sealfinance-api/comment/insertComment",
        params,
        headersParams
      ).then(response => {
          let res = response.data;
          if (res.code === "100000") {
            eventHub.$emit('refresh',_self.params.id)
            _self.cancel()
          } else {
            console.log("失败");
          }
        })
        .catch(error => {
          console.log("出错啦");
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./writeComment.less";
</style>

