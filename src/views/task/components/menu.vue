<template>
  <MenuNav>
    <div slot="nav-left" class="nav-left-title">
      <a class="back" @click="handleHome"><i class="iconfont iconshouye"></i>首页</a>
      <a-select :options="projectList" class="proj-list" size="small" :value="projectId" @change="handleProjectChange"/>
    </div>
  </MenuNav>
</template>

<script>
  import {getMyProjectList} from "@/api/task";

  export default {
    name: "TaskMenu",
    data() {
      let projectId = parseInt(this.$router.currentRoute.query.id)
      return {
        projectId,
        projectList: [
          // {
          //   key: 25,
          //   label: 'test 25'
          // },
          // {
          //   key: 9393939,
          //   label: '秀梅苯肼基材'
          // },
        ],
      }
    },
    mounted() {
      this.loadMyProjectList();
    },
    methods: {
      handleProjectChange(projectId) {
        this.projectId = projectId;
        this.$router.push(this.$route.path + '?id=' + projectId);
        let proj = this.projectList.find(item => item.key === projectId);
        this.$emit('change', projectId, proj.label);
      },
      handleHome() {
        this.$router.push('/project/home');
      },
      loadMyProjectList() {
        getMyProjectList().then(res => {
          if (res.code === 0 && res.data) {
            this.projectList = res.data.records.map(item => {
              return {
                key: item.id,
                label: item.projectName,
              }
            });

            let proj = this.projectList.find(item => item.key === this.projectId);
            this.$emit('change', this.projectId, proj.label);
          }
        }).catch(err => {});
      },
    }
  }
</script>

<style lang="scss" scoped>
  .proj-list {
    width: 300px;
    height: 32px;
    background: #F4F7FC;
    border-radius: 8px;

    /deep/ .ant-select-selection--single {
      height: 32px;
      line-height: 32px;
      background: #F4F7FC;
      border: none;
      border-radius: 8px;
      box-shadow: none !important;

      .ant-select-selection__rendered {
        line-height: 32px;
      }
    }
  }

  .back {
    width: 68px;
    height: 32px;
    background: #F4F7FC;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;
    color: #242F57;
    line-height: 24px;
    padding: 4px;
    margin: 9px 12px 0 16px;

    .iconfont {
      margin-right: 4px;
    }
  }
</style>
