<template>
  <div class="app-container">
    <el-form label-width="500px">
      <el-form-item label="管理员姓名">
        <el-input 
          v-model="admin.username"
          clearable
          size="medium" 
          class="inputWidth"
        />
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input 
          v-model="admin.password"
          show-password 
          clearable
          size="medium" 
          class="inputWidth"
        />
      </el-form-item>
      <el-form-item label="管理员手机号">
        <el-input 
        v-model="admin.phone"
        clearable
        size="medium"
        class="inputWidth"
        />
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button 
          :disabled="saveBtnDisabled" 
          type="primary" 
          @click="saveOrUpdate"
          size="medium"
          class="buttonWidth"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
  .inputWidth{
    width:200px;
  }
  .buttonWidth{
    width:200px;
  }
</style>
<script>
    import admin from '@/api/admin/admin'
    export default {
        data() {
            return {
            admin: {
                name: '',
                password:'',
            },
            saveBtnDisabled: false // 保存按钮是否禁用,
            }
        },

        created(){//在页面渲染前执行
          // if(this.$route.params && this.$route.params.id){
          //   //从路径中获取id值
          //   const id = this.$route.params.id
          //   //调用查询byid方法
          //   this.getInfo(id)
          // }else{
          //   this.student={}
          // }
          this.init()
        },
        watch:{//监听
          $route(to,from){//路由方式变化，就会执行
            this.init()
          }
        },
        methods: {
          init() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getInfo(id)
            } else {
                // 使用对象拓展运算符，拷贝对象，而不是引用，
                // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
                this.admin = {}
              }
            },
            saveOrUpdate() {
                this.saveBtnDisabled = true
                if(!this.admin.id){
                  this.saveAdmin()
                }else{
                  this.updateAdmin()
                }
            },
            // 保存
            saveAdmin() {
                admin.addAdmin(this.admin).then(response=>{
                    //添加成功
                    //提示信息
                    this.$message({
                        type:'success',
                        message:'添加成功!'
                    });
                    //路由跳转 redirect
                    this.$router.push({ path: '/admin/table' })
                })
            },
            //显示对应数据
            getInfo(id){
              admin.getAdminInfo(id)
                .then(response=>{
                this.admin = response.data.admin
              }).catch((response)=>{
                this.$message({
                  type:'error',
                  message:'获取数据失败'
                })
              })
            },
            // 根据id更新记录
            updateAdmin() {
              this.saveBtnDisabled = true
              admin.updateAdminInfo(this.admin).then(response => {
                  return this.$message({
                      type: 'success',
                      message: '修改成功!'
                  });
              }).then(resposne => {
                  this.$router.push({ path: '/admin/table' })
              }).catch((response) => {
                  // console.log(response)
                  this.$message({
                      type: 'error',
                      message: '修改失败'
                  })
              })
          }
    }
}
</script>