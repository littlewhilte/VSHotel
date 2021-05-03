<template>
<div class="app-contaioner">
  <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="管理员ID"
      width="200">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="200">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="200">
    </el-table-column>
    <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
                <router-link :to="'/admin/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
                <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button> -->
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
  import admin from '@/api/admin/admin'
  export default {
    data() {
      return {
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
        getList(page=1){
                this.page=page
                admin.getAdminListPage(this.page,this.limit,this.adminQuery)
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
    }
  }
</script>