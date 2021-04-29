<template>
    <div class="app-container">
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="adminQuery.name" placeholder="姓名"/>
            </el-form-item>
            <el-form-item label="起始时间">
            <el-date-picker
                v-model="adminQuery.createTime"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
            </el-form-item>
            <el-form-item label="截止时间">
                <el-date-picker
                v-model="adminQuery.modefiedTime"
                type="datetime"
                placeholder="选择截止时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
            </el-form-item>
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
        <el-table-column prop="name" label="名称" width="150" />
        <el-table-column prop="password" label="密码" width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="250"></el-table-column>
        <el-table-column prop="modefiedTime" label="修改时间" width="250"></el-table-column>
        <el-table-column prop="is_deleted" label="逻辑删除" width="100">
            <template slot-scope="scope">
                {{scope.row.is_deleted===1?'已删除':'未删除'}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
                <router-link :to="'/admin/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
    import student from '@/api/student/student'
    export default{
        //
        data(){
            //变量的初始值
            return{
                list:null,
                page:1,
                limit:10,
                total:0,
                adminQuery:{}
            }
        },
        created(){
            this.getList()
        },
        methods:{
            //列表方法
            getList(page=1){
                this.page=page
                student.getAdminListPage(this.page,this.limit,this.adminQuery)
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
                this.adminQuery = {}//条件清空
                this.getList()//查询结果表单清空至初始状态
            },
            //删除by id
            removeDataById(id){
                //alert("delete"+id)
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    student.deleteAdminId(id)
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