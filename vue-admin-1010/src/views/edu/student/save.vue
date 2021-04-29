<template>
  <div class="app-container">
    <el-form label-width="80px">
      <el-form-item label="学生名称">
        <el-input v-model="student.name"/>
      </el-form-item>
      <el-form-item label="学生密码">
        <el-input v-model="student.password"/>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="student.createTime"/>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="student.modefiedTime"/>
      </el-form-item>
      <el-form-item label="是否删除()">
        <el-input v-model="student.is_deleted"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    import student from '@/api/student/student'
    export default {
        data() {
            return {
            student: {
                name: '',
                password:'',
                // createTime:new Date(),
                // modefiedTime:new Date(),
                //is_deleted:'0'
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
                this.student = { ...defaultForm }
              }
            },
            saveOrUpdate() {
                this.saveBtnDisabled = true
                if(!this.student.id){
                  this.saveStudent()
                }else{
                  this.updateData()
                }
            },
            // 保存
            saveStudent() {
                student.addStudent(this.student).then(response=>{
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
              student.getStudentInfo(id)
                .then(response=>{
                this.student = response.data.student
              }).catch((response)=>{
                this.$message({
                  type:'error',
                  message:'获取数据失败'
                })
              })
            },
            // 根据id更新记录
            updateStudent() {
              this.saveBtnDisabled = true
              student.updateStudentInfo(this.student).then(response => {
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