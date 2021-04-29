<template>
    <div class="app-container">
    <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="studentQuery.name" placeholder="姓名"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="studentQuery.c_class" placeholder="班级"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="studentQuery.sno" placeholder="学号"/>
            </el-form-item>

            <el-radio-group v-model="radio">
                <el-radio :label="3">精准查询</el-radio>
                <el-radio :label="6">模糊查询</el-radio>
            </el-radio-group>   

            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>        
        <!-- 表格 -->
        <el-table
        :data="list"
        border
        fit
        highlight-current-row>
        <el-table-column
            label="序号"
            width="120"
            align="center">
            <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="70" />
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="state" label="状态" width="100" />
        <el-table-column prop="sno" label="学号" width="150" />
        <el-table-column prop="s_class" label="班级" width="50" />
        <el-table-column prop="card" label="身份证号" width="150" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="email" label="邮箱" width="250" />
        <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
                <router-link :to="'/student/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeStudentById(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>    
        <!-- 分页 -->
        <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"
        />
    </div>
</template>
<script>
    import student from '@/api/student/stu'
    export default{
        //
        data(){
            //变量的初始值
            return{
                list:null,
                page:1,
                limit:10,
                total:0,
                ratio:3,
                studentQuery:{}
            }
        },
        created(){
            this.getList()
        },
        methods:{
            //列表方法
            getList(page=1){
                this.page=page
                student.getStudentListPage(this.page,this.limit,this.studentQuery)
                .then(response=>{
                    //success
                    // console.log(response)
                    this.list=response.data.rows
                    this.total=response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error=>{
                    //error
                    console.log(error)
                })
            },
            //清空查询条件
            resetData() {
                this.studentQuery = {}//条件清空
                this.getList()//查询结果表单清空至初始状态
            },
            //删除by id
            removeStudentById(id){
                //alert("delete"+id)
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    student.deleteStudentById(id)
                    .then(response=>{
                        //提示信息
                        this.$message({
                            type:'success',
                            message:'删除成功!'
                    });
                     //刷新页面
                    this.getList()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            })
            }
        }
    }
</script>