<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <div class="grid-content bg-purple">江苏传智播客教育科技有限股份有限公司</div>
    </el-col>
    <el-col :span="8">
        <img src="" alt="">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{user.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人地址</el-dropdown-item>
            <el-dropdown-item disabled>Git账号</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

    </el-col>
  </el-row>
</template>
<script>
import { getItem } from '@/utils/auth'
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    // this.user = JSON.parse(window.localStorage.getItem('user_info'))
    this.user = getItem()
    console.log(this.user)
  }
}
</script>

<style>
  .el-header{
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .el-row{
    flex:1
  }
  .el-dropdown{
    display: float;
    float:right;
  }
</style>
