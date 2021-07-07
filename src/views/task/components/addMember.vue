<template>
  <ModalNoFooter width="708" :isShow="true" :bodyStyle="{padding: 0}" title="添加项目成员" @modal-cancel="handleCancel">
    <div class="members-cont" slot="content">
      <UserTree @change="handleUserChange" />
      <section class="right">
        <div class="user-list">
          <div class="has-data" v-if="users.length">
            <div class="title">已选择了 {{users.length}} 个员工</div>
            <ul class="list">
              <li class="item" v-for="user in users" :key="user.id">
                <div class="dept">
                  <span class="iconfont icona-renyuan-tianchong"></span>
                  <span>{{user.userName}}({{user.userId}})</span>
                </div>
                <span class="iconfont iconjianshao" @click="handleDel(item)"></span>
              </li>
            </ul>
          </div>
          <div class="no-data" v-else>请选择需要添加的员工</div>
        </div>
        <div class="footer">
          <a-button class="cancel" type="link" @click="$emit('modal-cancel')">取消</a-button>
          <a-button type="primary" @click="handleSave">保存</a-button>
        </div>
      </section>
    </div>
  </ModalNoFooter>
</template>

<script>
  import ModalNoFooter from '@/components/Modal/ModalNoFooter.vue'
  import UserTree from "@/components/business/UserTree";

  export default {
    name: "AddMember",
    components: { ModalNoFooter, UserTree },
    props: {
      // isShow: {
      //   type: Boolean,
      //   default: false
      // },
      projectId: {
        type: Number
      },
      status: {
        type: Number
      },
    },
    data() {
      return {
        users: [],
      }
    },
    methods: {
      handleUserChange(users) {
        this.users = users;
      },
      // 校验新增 编辑用户信息
      handleSubmit() {
        this.$refs.userForm.validate((valid, data) => {
          if (valid) {
            // console.log(data)
            // console.log('submit!', this.form);
            // 接口提交成功 isShow
            this.form.projectId = this.projectId;
            if (this.form.incharge) {
              this.form.masterList = [
                this.form.incharge
              ]
            }
            if (this.form.planBeginTime) {
              this.form.planBeginTime = moment(this.form.planBeginTime).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.form.planEndTime) {
              this.form.planEndTime = moment(this.form.planEndTime).format('YYYY-MM-DD HH:mm:ss')
            }
            let data = this.form;
            if (this.status)
              data = {...this.form, status: this.status};
            createTask(data).then(res => {
              this.$emit('ok', data);
              this.form = {
                taskName: '',
                taskType: 0,
                incharge: null,
                participates:[],
                priority: 2,
              };
              // this.$refs.userForm.resetFields();
            }).catch(err => {});
          } else {
            return false;
          }
        });
      },

      // 取消新增、编辑用户信息
      handleCancel() {
        this.$emit('cancel');
      },
    },
    computed: {
      memberList() {
        return this.$store.state.task.memberList;
      },
    }
  }
</script>

<style lang="scss" scoped>
.members-cont {
  display: flex;
}
.tree-list {
  padding: 0 24px;
  overflow: hidden auto;
  height: 500px;
  width: 340px;
  border-right: 1px solid #EAEDF7;
}

  .right {
    flex: 1;
    .user-list {
      padding: 18px 24px;
      height: calc(100% - 64px);
      overflow: auto;
      .no-data, .title {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #7C88B1;
        line-height: 20px;
      }
      .list {
        margin-top: 10px;
        .item {
          height: 40px;
          line-height: 40px;
          font-size: 0;
          font-weight: 400;
          color: #242F57;
          .dept {
            display: inline-block;
            width: calc(100% - 30px);
            line-height: 40px;
            font-size: 14px;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
          }
          .iconjianshao {
            display: inline-block;
            width: 20px;
            margin-left: 10px;
            vertical-align: top;
            font-size: 14px;
            text-align: end;
            color: #333;
            cursor: pointer;
          }
          .icona-renyuan-tianchong {
            color: #7c88b1;
            font-size: 16px;
            width: 24px;
            height: 24px;
            margin-right: 8px;
            line-height: 24px;
            text-align: center;
          }
        }
      }
    }

    .footer{
      padding: 16px 24px;
      flex-shrink: 0;
      text-align: end;
      border-top: 1px solid #EAEDF7;
      .cancel {
        margin-right: 10px;
        color: #636E95;
      }
    }
  }
</style>
