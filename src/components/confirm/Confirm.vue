<template>
  <transition name="bounce">
    <div class="modal" v-if="isShow">
      <div class="modal-dialog" :style="styleConfirm">
        <div class="modal-header">
          <h4 class="modal-title">{{title}}</h4>
          <a-button ghost type="link" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
            <span class="iconfont iconguanbi"></span>
          </a-button>
        </div>
        <div class="modal-body">
          <template v-if="!dangerouslyUseHTMLString">{{ message }}</template>
          <p v-else v-html="message"></p>
        </div>
        <div class="modal-footer">
          <a-button ghost type="link" class="btn-gray" @click="cancel()">{{ cancelText }}</a-button>
          <a-button type="danger" class="btn" @click="ok()">{{ okText }}</a-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Confirm',
    props: {
      styleConfirm: { // confirm 样式
        type: Object,
        required: false,
        default: () => ({
          width: '400px'
        })
      },
      hasMark: { // 是否有遮罩层
        type: Boolean,
        required: false,
        default: true
      },
      dangerouslyUseHTMLString: { // 是否支持v-html
        type: Boolean,
        required: false,
        default: false
      },
      title: { // confirm 标题
        type: String,
        required: false
      },
      message: {
        type: String,
        required: false
      },
      onOk: {
        type: Function,
        required: true
      },
      onCancel: {
        type: Function,
        required: true
      },
      okText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      }
    },
    data: () => {
      return {
        isShow: true
      }
    },
    beforeMount () {
      this.init();
    },
    methods: {
      init () {
        let parent = document.querySelector('.confirm');
        if (!parent) {
          parent = document.createElement('div')
          parent.classList.add('confirm')
          document.body.appendChild(parent);
          parent.appendChild(this.$el)
        }
      },
      close () {
        this.isShow = false
        this.$destroy()
        document.querySelector('.confirm').remove()
      },
      ok () {
        if (this.onOk) {
          this.onOk();
        }
        this.close()
      },
      cancel () {
        if (this.onCancel) {
          this.onCancel()
        }
        this.close()
      }
    }
  }
</script>

<style lang="scss" scope>
  .confirm {
    .modal {
      position: absolute;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1000;
      .modal-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #FFFFFF;
        box-shadow: 6px 4px 16px 0px rgba(55, 84, 170, 0.16);
        border-radius: 8px;
        border: 1px solid #EAEDF7;
        .modal-header {
          padding: 20px 24px;
          position: relative;
          border-bottom: 2px solid #EAEDF7;
          .modal-title {
            margin-right: 20px;
            line-height: 16px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #242F57;
          }
          .close {
            position: absolute;
            top: 18px;
            right: 16px;
            width: 20px;
            height: 20px;
            padding: 0;
            .iconfont {
              font-size: 16px;
              color: #636E95;
            }
          }
        }
        .modal-body {
          padding: 16px 24px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #242F57;
          line-height: 22px;
        }
        .modal-footer {
          padding: 16px 24px;
          text-align: end;
          .btn-gray {
            color: #636E95;
          }
        }
      }
    }
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-out .5s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
