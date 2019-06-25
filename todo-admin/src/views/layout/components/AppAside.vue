<template>
   <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <!-- <i class="el-icon-location"></i>   //字体图标 -->
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="2-2">内容列表</el-menu-item>
          <el-menu-item index="2-2">评论列表</el-menu-item>
          <el-menu-item index="2-2">素材管理</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">账号信息</span>
      </el-menu-item>
    </el-menu>
</template>
<script>
export default {

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }

  }
}
</script>

<style>
  .el-menu {
    background: rgb(53, 59, 78);
    width:100%;
  }
</style>
