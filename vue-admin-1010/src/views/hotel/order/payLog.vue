<template>
<div class="app-container">
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="PayLogQuery.order_no" placeholder="订单号"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="PayLogQuery.serial_no" placeholder="流水号"/>
            </el-form-item>      

            <el-form-item label="支付时间">
            <el-date-picker
                v-model="PayLogQuery.createTime"
                type="datetime"
                placeholder="选择支付时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
            </el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="getList()" class="buttonClass">查询</el-button>
                <el-button type="default" @click="resetData()" class="buttonClass">清空</el-button>
        </el-form>
  <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="40"
      align="center">
    </el-table-column>
    <el-table-column
      prop="orderNo"
      label="订单号"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="totalFee"
      label="订单总计"
      width="100" 
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="serialNo"
      label="订单流水"
      width="100" 
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="payType"
      label="支付方式"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="tradeStatus"
      label="支付状态"
      width="120" 
      align="center"
      >
        <template slot-scope="scope">
        {{scope.row.tradeStatus===1?'已支付':'未支付'}}
        </template>
    </el-table-column>  
        <el-table-column
      prop="payTime"
      label="支付时间"
      width="150"
      align="center">
    </el-table-column>       
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="modifyTime"
      label="修改时间"
      width="150"
      align="center">
    </el-table-column> 
    <el-table-column
      prop="isDeleted"
      label="是否删除"
      width="100"
      align="center">
      <template slot-scope="scope">
      {{scope.row.is_deleted===1?'已删除':'未删除'}}
      </template>
    </el-table-column>   
    <el-table-column label="操作" width="200" align="center">
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
  import paylog from '@/api/pay/payLog'
  export default {
    data() {
      return {
          list:null,
          page:1,
          limit:10,
          total:0,
          PayLogQuery:{}
      }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(page=1){
                this.page=page
                paylog.getPayLogListPage(this.page,this.limit,this.PayLogQuery)
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
            //清空查询条件
            resetData(){
                this.PayLogQuery = {}//条件清空
                this.getList()//查询结果表单清空至初始状态
            },
            removeDataById(id){
              //alert("delete"+id)
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                paylog.removeDataById(id)
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