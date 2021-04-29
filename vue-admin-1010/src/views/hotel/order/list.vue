<template>
  <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="订单号"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="gid"
      label="游客Id"
      width="100" 
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="游客姓名"
      width="100"
      align="center">

    </el-table-column>
    <el-table-column
      prop="phone"
      label="游客电话"
      width="150"
      align="center">
    </el-table-column>        
    <el-table-column
      prop="days"
      label="天数"
      width="100"
      align="center">
    </el-table-column>

   <el-table-column
      prop="total"
      label="总计"
      width="100"
      align="center">
    </el-table-column>  

    <el-table-column
      prop="createTime"
      label="下单时间"
      width="200"
      align="center">
    </el-table-column>
        <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
                <router-link :to="'/order/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">详情</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>

<script>
  import order from '@/api/order/order'
  export default {
    data() {
      return {
          list:null,
          page:1,
          limit:10,
          total:0,
          orderQuery:{}
      }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(page=1){
                this.page=page
                order.getOrderListPage(this.page,this.limit,this.orderQuery)
                .then(response=>{
                    this.list=response.data.rows
                    this.total=response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error=>{
                    console.log(error)
                })
            },
    }
  }
</script>