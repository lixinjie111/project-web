<template>
  <div class="operation-container">
    <ContentHeader type="breadcrumb" :breadcrumbList="breadcrumbList">
      <a-button slot="operation" type="primary" @click="handleSave">保存</a-button>
    </ContentHeader>
    <div class="operation-content">
      <a-checkbox-group v-model="checkedList">
        <!-- 一级树全展示 竖形列表 -->
        <div class="level-1" v-for="(item, index1) in treeList" :key="item.id">
          <div class="checkbox-item">
            <span :class="['expand', 'iconfont', item.isExpand ? 'iconxia1' : 'iconyou1']" v-if="item.hasChildren" @click="handleExpand(index1)"></span>
            <a-checkbox :value="item.id">{{item.name}}</a-checkbox>
          </div>
          <!-- 二级树全展示 一行展示 不存在单选 -->
          <div class="level-2" v-if="item.isExpand">
            <div class="level-2-parent">
              <div class="checkbox-item" v-for="(level2, index2) in item.children" :key="level2.id">
                <span :class="['expand', 'iconfont', level2.isExpand ? 'iconxia1' : 'iconyou1']" v-if="level2.hasChildren" @click="handleExpand(index1, index2)"></span>
                <a-checkbox :value="level2.id">{{level2.name}}</a-checkbox>
              </div>
            </div>
            <template v-for="(level2, index2) in item.children" >
              <!-- 下拉展开显示 三级菜单 -->
              <div class="level-3" v-if="level2.children && level2.isExpand"  :key="`level-3${level2.id}`">
                <div class="level-3-parent">
                  <div class="checkbox-item" v-for="(level3, index3) in level2.children" :key="level3.id">
                    <span :class="['expand', 'iconfont', level3.isExpand ? 'iconxia1' : 'iconyou1']" v-if="level3.hasChildren" @click="handleExpand(index1, index2, index3)"></span>
                    <a-checkbox :value="level3.id">{{level3.name}}</a-checkbox>
                  </div>
                </div>
                <template v-for="(level3) in level2.children">
                  <!-- 下拉展开显示 四级菜单 -->
                  <div class="level-4" v-if="level3.children && level3.isExpand" :key="`level-4${level3.id}`">
                    <div class="checkbox-item" v-for="(level4) in level3.children" :key="level4.id">
                      <span class="expand iconfont iconyou1" v-if="level4.hasChildren"></span>
                      <a-checkbox :value="level4.id">{{level4.name}}</a-checkbox>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </a-checkbox-group>
    </div>
  </div>
</template>
<script>
import * as api from '@/api/index'
export default {
  name: 'operation',
  components: {},
  data() {
    return {
      roleId: '', // 角色id
      breadcrumbList: [
        {name: '角色分组', icon: 'iconjiantouzuo', iconposition: 'before', path: '/org/role'},
        {name: '项目经理', icon: 'iconsuoding', iconposition: 'after'},
      ],
      list: [
        {name: '测试1', id: '1', isExpand: false, children: []},
        {name: '测试2', id: '2', isExpand: false, children: []},
        {name: '测试3', id: '3', isExpand: false, children: []},
        {name: '测试4', id: '4', isExpand: false, children: []}
      ],
      treeList:  [
        {
          "children": [
            {
              "children": [
                {
                  "id": 4,
                  "parentId": 1,
                  "hasChildren": true,
                  "icon": "icon-quanxian",
                  "label": "重点项目1",
                  "name": "重点项目1",
                  "children": [
                    {
                      "id": 18,
                      "parentId": 4,
                      "hasChildren": false,
                      "icon": "icon-quanxian",
                      "label": "重点项目1",
                      "name": "重点项目1",
                    },
                    {
                      "id": 19,
                      "parentId": 4,
                      "hasChildren": false,
                      "icon": "icon-quanxian",
                      "label": "重点项目1",
                      "name": "重点项目1",
                    },
                    {
                      "id": 20,
                      "parentId": 4,
                      "hasChildren": false,
                      "icon": "icon-quanxian",
                      "label": "重点项目1",
                      "name": "重点项目1",
                    },
                    {
                      "id": 21,
                      "parentId": 4,
                      "hasChildren": false,
                      "icon": "icon-quanxian",
                      "label": "重点项目1",
                      "name": "重点项目1",
                    },
                    {
                      "id": 22,
                      "parentId": 4,
                      "hasChildren": false,
                      "icon": "icon-quanxian",
                      "label": "重点项目1",
                      "name": "重点项目1",
                    },
                    {
                      "id": 23,
                      "parentId": 4,
                      "hasChildren": false,
                      "icon": "icon-quanxian",
                      "label": "重点项目1",
                      "name": "重点项目1",
                    },
                    {
                      "id": 24,
                      "parentId": 4,
                      "hasChildren": false,
                      "icon": "icon-quanxian",
                      "label": "重点项目1",
                      "name": "重点项目1",
                    },
                  ]
                },
                {
                  "id": 5,
                  "parentId": 1,
                  "hasChildren": true,
                  "icon": "icon-quanxian",
                  "label": "重点项目2",
                  "name": "重点项目2",
                  children: [
                    {
                      "id": 24,
                      "parentId": 4,
                      "hasChildren": false,
                      "icon": "icon-quanxian",
                      "label": "重点项目2",
                      "name": "重点项目2",
                    },
                  ]
                },
                {
                  "id": 6,
                  "parentId": 1,
                  "hasChildren": false,
                  "icon": "icon-quanxian",
                  "label": "重点项目3",
                  "name": "重点项目3"
                },
                {
                  "id": 7,
                  "parentId": 1,
                  "hasChildren": false,
                  "icon": "icon-quanxian",
                  "label": "重点项目4",
                  "name": "重点项目4"
                }
              ],
              "id": 8,
              "parentId": 1,
              "hasChildren": true,
              "icon": "icon-quanxian",
              "label": "首页",
              "name": "首页",
            },
            {
              "id": 9,
              "parentId": 1,
              "hasChildren": true,
              "icon": "icon-quanxian",
              "label": "项目",
              "name": "项目",
            },
            {
              "id": 10,
              "parentId": 1,
              "hasChildren": false,
              "icon": "icon-quanxian",
              "label": "任务",
              "name": "动态",
            }
          ],
          "hasChildren": true,
          "icon": "icon-quanxian",
          "id": 1,
          "keepAlive": 0,
          "label": "我的",
          "name": "我的",
          "parentId": 0,
          "path": "/admin/user/save",
          "permission": "sys_user_save",
          "sort": 1,
          "spread": true,
          "type": 0
        },
        {
          "children": [
            {
              "id": 11,
              "parentId": 1,
              "hasChildren": false,
              "icon": "icon-quanxian",
              "label": "添加产品",
              "name": "添加产品",
            },
            {
              "id": 12,
              "parentId": 1,
              "hasChildren": false,
              "icon": "icon-quanxian",
              "label": "添加产品",
              "name": "添加产品",
            },
            {
              "id": 13,
              "parentId": 1,
              "hasChildren": false,
              "icon": "icon-quanxian",
              "label": "关闭产品",
              "name": "关闭产品",
            }
          ],
          "hasChildren": true,
          "icon": "icon-quanxian",
          "id": 2,
          "keepAlive": 0,
          "label": "产品",
          "name": "产品",
          "parentId": 0,
          "path": "/admin/user/save",
          "permission": "sys_user_save",
          "sort": 1,
          "spread": true,
          "type": 0
        },
        {
          "children": [
            {
              "id": 14,
              "parentId": 1,
              "hasChildren": true,
              "icon": "icon-quanxian",
              "label": "首页",
              "name": "首页",
              "children": [
                {
                  "id": 15,
                  "parentId": 1,
                  "hasChildren": false,
                  "icon": "icon-quanxian",
                  "label": "导出",
                  "name": "导出",
                },
                {
                  "id": 16,
                  "parentId": 1,
                  "hasChildren": false,
                  "icon": "icon-quanxian",
                  "label": "添加项目",
                  "name": "添加项目",
                },
                {
                  "id": 17,
                  "parentId": 1,
                  "hasChildren": false,
                  "icon": "icon-quanxian",
                  "label": "编辑项目",
                  "name": "编辑项目",
                }
              ]
            }
          ],
          "hasChildren": true,
          "icon": "icon-quanxian",
          "id": 3,
          "keepAlive": 0,
          "label": "项目",
          "name": "项目",
          "parentId": 0,
          "path": "/admin/user/save",
          "permission": "sys_user_save",
          "sort": 1,
          "spread": true,
          "type": 0
        }
      ],
      checkedList: [1, 2, 12]
    }
  },
  created(){
    let {roleName} = this.$route.query;
    this.breadcrumbList[1].name = roleName;
    // 预处理树形结构
    let data = this.handlePreData(this.treeList);
    this.$set(this, 'treeList', data)
  },
  methods: {
    // 预处理树形结构
    handlePreData(data){
      Array.isArray(data) && data.map(item=>{
        item.isExpand = false; // 树形是否展开
        if(item.children){
          this.handlePreData(item.children);
        }
      });
      return data;
    },
    // 点击展开
    handleExpand(level1, level2, level3){
      if(arguments.length === 1){
        this.treeList.splice(level1, 1, {...this.treeList[level1], ...{isExpand: !this.treeList[level1].isExpand}});
      }else if(arguments.length === 2) {
        let data = this.treeList[level1].children;
        let bool = !data[level2].isExpand;
        this.handlePreData(data);
        data.splice(level2, 1, {...data[level2], ...{isExpand: bool}});
      }else if(arguments.length === 3) {
        let data = this.treeList[level1].children[level2].children;
        console.log(data)
        let bool = !data[level3].isExpand;
        this.handlePreData(data);
        data.splice(level3, 1, {...data[level3], ...{isExpand: bool}});
      }
      
    },
    // 请求菜单及页面操作handleGetMenuTree列表
    async handleGetMenuList() {
      try{
        let {code, data, msg} = api.org.handleGetMenuTree();
        // this.
      }catch(err){
        console.log(err)
      }
    },
    // 请求用户已勾选
    async handleGetRoleMenuTree(){
      try {
        let {code, data, msg} = await api.org.handleGetRoleMenuTree(this.roleId);
        if(code === 0){
          this.checkedList = data;
        }else{
          this.$message.error(msg);
        }
      }catch(err) {
        console.log(err)
      }
    },
    // 保存
    async handleSave(){
      try {
        let {code, data, msg} = await api.org.handlePutRoleMenu(this.roleId, this.checkedList);
        if(code === 0){
          this.$message.success(msg);
        }else{
          this.$message.error(msg);
        }
      }catch(error){
        console.log(error);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.operation-container {
  margin: 16px 24px 24px 24px;
  .operation-content {
    padding: 0 20px;
    width: 100%;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    /deep/ .ant-checkbox-group {
      width: 100%;
      .ant-checkbox-wrapper {
        line-height: 54px;
      }
    }
    .level-1 {
      width: 100%;
      border-bottom: 1px solid #EAEDF7;
      .level-2 {
        margin-left: 20px;
        border-top: 1px solid #EAEDF7;
        .level-2-parent {
          display: flex;
          // .checkbox-item {
          //   width: 224px;
          //   &:nth-child(n+2){
          //     margin-left: 20px;
          //   }
          // }
        }
        .level-3 {
          margin-left: 20px;
          border-top: 1px solid #EAEDF7;
          .level-3-parent {
            display: flex;
          }
          .level-4 {
            display: flex;
            flex-wrap: wrap;
            border-top: 1px solid #EAEDF7;
            // .checkbox-item:first-child {
            //   width: 224px;
            //   margin-left: 20px;
            // }
          }
        }
      }
    }
    .checkbox-item {
      width: 244px;
      height: 54px;
      flex-shrink: 0;
      .expand {
        display: inline-block;
        margin: 18px 0 16px 0;
        width: 20px;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>