<template>
<div class="app-container">
  <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="orderNo"
      label="订单号"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="type"
      label="房间类型"
      width="100" 
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="用户昵称"
      width="100" 
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="用户手机"
      width="120" 
      align="center"
      >
    </el-table-column>    
    <el-table-column
      prop="days"
      label="入住天数"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="total"
      label="订单金额(元)"
      width="100"
      align="center">
    </el-table-column>        
    <el-table-column
      prop="payType"
      label="支付方式"
      width="90"
      align="center">
    </el-table-column>
   <el-table-column
      prop="status"
      label="支付状态"
      width="100"
      align="center">
      <template slot-scope="scope">
       {{scope.row.status===1?'支付完成':'未支付'}}
      </template>      
    </el-table-column>  

    <el-table-column
      prop="createTime"
      label="下单时间"
      width="160"
      align="center">
    </el-table-column>
    <el-table-column
      prop="modifyTime"
      label="上次修改时间"
      width="160"
      align="center">
    </el-table-column> 
    <el-table-column
      prop="isDeleted"
      label="逻辑删除"
      width="80"
      align="center">
      <template slot-scope="scope">
      {{scope.row.is_deleted===1?'已删除':'未删除'}}
      </template>
    </el-table-column>   
    <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
            <!-- <router-link :to="'/order/edit/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">详情</el-button>
            </router-link> -->
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
            removeDataById(id){
              //alert("delete"+id)
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                order.deleteOrderId(id)
                .then(response=>{
                  //提示信息
                  this.$message({
                    type:'success',
                    message:'删除成功!'
                });
                //刷新页面
                this.getList()
                })
                }).catch(error=>{
                    this.$message({
                            type: 'info',
                            message: '已取消删除'
                    });      
                });
          }
    }
  }
</script>