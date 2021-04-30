<template>
    <div class="app-container">
      <el-row type="flex" justify="end">
        <el-col :span="4">
            <el-button round @click="resetData()">所有房间</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">      
        <el-col :span="4">
            <el-button type="primary" round  @click="getSingleList()">单人间</el-button>
        </el-col>
        <el-col :span="4">
            <el-button type="success" round @click="getStandardList()">标准间</el-button>
        </el-col>   
        <el-col :span="4">
            <el-button type="info" round @click="getRichList()">豪华间</el-button>
        </el-col>     
        <el-col :span="4">
            <el-button type="warning" round @click="getBusyList()">商务间</el-button>
        </el-col>
        <el-col :span="4">
            <el-button type="danger" round @click="getPolicyList()">行政间</el-button>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" round @click="getMultList()">套间</el-button>
        </el-col>
      </el-row>
      <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="房间号" class="demo-input-size">
                <el-input v-model="roomQuery.rid" size="mini"/>
            </el-form-item>            
            <el-form-item label="房间状态">
                <el-input v-model="roomQuery.state" size="mini"/>
            </el-form-item>       
            <el-form-item label="起始时间">
            <el-date-picker
                v-model="roomQuery.begin"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                size="mini"
                />
            </el-form-item>
            <el-form-item label="截止时间">
                <el-date-picker
                v-model="roomQuery.end"
                type="datetime"
                placeholder="选择截止时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                size="mini"
                />
            </el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="getList()" size="mini"></el-button>
                <el-button type="warning" @click="resetData()" size="mini">清空</el-button>
        </el-form>


        <el-table
          :data="list"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="id"
            label="房间ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="rid"
            label="房间号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="type"
            width="100"
            label="房间类型">
          </el-table-column>
          <el-table-column
            prop="state"
            label="房间状态"
            width="50">
          </el-table-column>
          <el-table-column
            prop="price"
            label="房间价格（/天）"
            width="120">
          </el-table-column>
          <el-table-column
            prop="deposit"
            label="房间押金"
            width="120">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="入住日期"
            sortable
            width="180">
          </el-table-column> 
          <el-table-column
            prop="endTime"
            label="退房日期"
            sortable
            width="180">
          </el-table-column> 
          <el-table-column
            prop="avator"
            label="图片云链接地址"
            sortable
            width="400">
          </el-table-column>           
          <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                  <router-link :to="'/room/edit/'+scope.row.id">
                      <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                  </router-link>
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataByRid(scope.row.rid)">删除</el-button>
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

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  import room from '@/api/room/room'
  export default {
    created(){
        this.getList()
    },
    data() {
      return {
          list:null,
          page:1,
          limit:10,
          total:0,
          roomQuery:{},

      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
      },
      //正常分页
      getList(page=1){
          this.page=page
          room.getRoomListPage(this.page,this.limit,this.roomQuery)
          .then(response=>{
            this.list=response.data.rows
            this.total=response.data.total
            console.log(this.list)
            console.log(this.total)
         }).catch(error=>{
                console.log(error)
         })
      },
      //查找单间
      getSingleList(page=1){
          this.page=page
          room.getSingleRoom(this.page,this.limit,this.roomQuery)
          .then(response=>{
            this.list=response.data.rows
            this.total=response.data.total
            console.log(this.list)
            console.log(this.total)
         }).catch(error=>{
            console.log(error)
          })
      },
      //标准间
      getStandardList(page=1){
          this.page=page
          room.getStandardRoom(this.page,this.limit,this.roomQuery)
          .then(response=>{
            this.list=response.data.rows
            this.total=response.data.total
            console.log(this.list)
            console.log(this.total)
         }).catch(error=>{
            console.log(error)
          })
      },
      //豪华间
      getRichList(page=1){
          this.page=page
          room.getRichRoom(this.page,this.limit,this.roomQuery)
          .then(response=>{
            this.list=response.data.rows
            this.total=response.data.total
            console.log(this.list)
            console.log(this.total)
         }).catch(error=>{
            console.log(error)
          })
      },    
      //商务间
      getBusyList(page=1){
          this.page=page
          room.getBusyRoom(this.page,this.limit,this.roomQuery)
          .then(response=>{
            this.list=response.data.rows
            this.total=response.data.total
            console.log(this.list)
            console.log(this.total)
         }).catch(error=>{
            console.log(error)
          })
      },  
      //行政间
      getPolicyList(page=1){
          this.page=page
          room.getPolicyRoom(this.page,this.limit,this.roomQuery)
          .then(response=>{
            this.list=response.data.rows
            this.total=response.data.total
            console.log(this.list)
            console.log(this.total)
         }).catch(error=>{
            console.log(error)
          })
      },
      //套间
      getMultList(page=1){
          this.page=page
          room.getMultRoom(this.page,this.limit,this.roomQuery)
          .then(response=>{
            this.list=response.data.rows
            this.total=response.data.total
            console.log(this.list)
            console.log(this.total)
         }).catch(error=>{
            console.log(error)
          })
      },
      resetData() {
          this.roomQuery = {}//条件清空
          this.getList()//查询结果表单清空至初始状态
       },
      removeDataByRid(rid){
         //alert("delete"+id)
        this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    room.deleteRoomRid(rid)
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
    },

  }
</script>