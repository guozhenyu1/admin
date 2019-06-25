<template>
  <el-container>
  <el-aside width="200px">
    <AppAside></AppAside>
  </el-aside>
  <el-container>
    <el-header>
      <AppHeader/>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from '@/views/layout/components/AppAside'
import AppHeader from '@/views/layout/components/AppHeader'
// console.log(AppAside)
export default {
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style>
  .el-container{
    width: 100%;
    height:100%
  }
  .el-aside{
    height:100%;
    background:slategrey
  }
  .el-header{
    width: 100%;
    background:skyblue;
  }

</style>
